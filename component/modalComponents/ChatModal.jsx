import React, { useState, useRef, useEffect, useContext } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Image
} from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
import { chatServerAddress } from '../../api/ServerAddress';
import { AuthContext } from '../../context/AuthContext';
import { txtSizeMini, txtSizeNormal } from '../../utility/Scalling';

const ChatModal = ({ visible, onClose, userId, chatType, recipientId, recipientName, recipientDesignation, recipientOffice, recipientPhoto }) => {
    const { userInfo, photo, name, pmisId } = useContext(AuthContext);

    const senderPmisId = pmisId;
    const senderName = name;
    const senderPhoto = photo;

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(true);
    const [ws, setWs] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [typingUsers, setTypingUsers] = useState(new Set());
    const flatListRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    // WebSocket connection using PMIS ID
    useEffect(() => {
        if (visible && pmisId) {
            const websocket = new WebSocket(`${chatServerAddress}?pmisId=${pmisId}&username=${encodeURIComponent(senderName)}`);

            websocket.onopen = () => {
                console.log('WebSocket connected');
                setWs(websocket);
            };

            websocket.onmessage = (e) => {
                try {
                    const message = JSON.parse(e.data);
                    console.log('Received WebSocket message:', JSON.stringify(message, null, 2));
                    handleIncomingMessage(message);
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };

            websocket.onerror = (error) => {
                console.error('WebSocket error:', error);
                alert('Failed to connect to chat server. Please try again.');
            };

            websocket.onclose = () => {
                console.log('WebSocket disconnected');
                setWs(null);
                setTypingUsers(new Set());
            };

            return () => {
                websocket.close();
            };
        }
    }, [visible, pmisId]);

    // Load message history when chat changes
    useEffect(() => {
        if (visible && recipientId) {
            loadMessageHistory();
        }
    }, [visible, recipientId, chatType]);

    // Handle typing input
    useEffect(() => {
        if (ws && ws.readyState === WebSocket.OPEN && inputText.trim() !== '') {
            if (!isTyping) {
                setIsTyping(true);
                ws.send(JSON.stringify({
                    type: chatType === 'private' ? 'private_typing' : 'room_typing',
                    [chatType === 'private' ? 'recipientId' : 'roomId']: recipientId,
                    isTyping: true
                }));
            }

            // Reset typing timeout
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            typingTimeoutRef.current = setTimeout(() => {
                setIsTyping(false);
                if (ws && ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({
                        type: chatType === 'private' ? 'private_typing' : 'room_typing',
                        [chatType === 'private' ? 'recipientId' : 'roomId']: recipientId,
                        isTyping: false
                    }));
                }
            }, 3000);
        } else if (isTyping && inputText.trim() === '') {
            setIsTyping(false);
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                    type: chatType === 'private' ? 'private_typing' : 'room_typing',
                    [chatType === 'private' ? 'recipientId' : 'roomId']: recipientId,
                    isTyping: false
                }));
            }
        }

        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, [inputText, ws, isTyping, chatType, recipientId]);

    const loadMessageHistory = async () => {
        setLoading(true);
        const TIMEOUT_DURATION = 10000;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

        try {
            let url;
            if (chatType === 'private') {
                url = `http://192.168.16.41:6900/api/messages/private/${pmisId}/${recipientId}`;
            } else {
                url = `http://192.168.16.41:6900/api/messages/room/${recipientId}`;
            }

            const response = await fetch(url, {
                signal: controller.signal
            });

            const data = await response.json();
            console.log('Raw API response for message history:', JSON.stringify(data, null, 2));

            // Process messages
            const processedMessages = data.map(message => {
                let content = message.content;
                console.log(`Processing message ID ${message.id} (raw):`, content);
                if (typeof content === 'string' && content.trim() !== '') {
                    if (content === '[object Object]') {
                        console.warn(`Invalid content for message ${message.id}: [object Object]`);
                        content = 'Message content unavailable';
                    } else if (content.startsWith('{"')) {
                        try {
                            const parsed = JSON.parse(content);
                            content = parsed.text || parsed.content || parsed.message || content;
                        } catch (e) {
                            console.warn(`Failed to parse JSON content for message ${message.id}:`, content);
                        }
                    }
                } else {
                    console.warn(`Invalid content for message ${message.id}:`, content);
                    content = 'Message content unavailable';
                }
                console.log(`Processing message ID ${message.id} (processed):`, content);
                return { ...message, content };
            });

            setMessages(processedMessages.reverse());
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('Request timed out after', TIMEOUT_DURATION, 'ms');
            } else {
                console.error('Error loading message history:', error);
            }
        } finally {
            clearTimeout(timeoutId);
            setLoading(false);
        }
    };

    const handleIncomingMessage = (message) => {
        if (message.type === 'private_typing' || message.type === 'room_typing') {
            const newTypingUsers = new Set(typingUsers);
            if (message.isTyping && message.senderId !== pmisId) {
                newTypingUsers.add(message.senderId);
            } else {
                newTypingUsers.delete(message.senderId);
            }
            setTypingUsers(newTypingUsers);
            return;
        }

        let content = message.content;
        console.log(`Processing incoming message ID ${message.id} (raw):`, content);
        if (typeof content === 'string' && content.trim() !== '') {
            if (content === '[object Object]') {
                console.warn(`Invalid content for incoming message ${message.id}: [object Object]`);
                content = 'Message content unavailable';
            } else if (content.startsWith('{"')) {
                try {
                    const parsed = JSON.parse(content);
                    content = parsed.text || parsed.content || parsed.message || content;
                } catch (e) {
                    console.warn(`Failed to parse JSON content for incoming message ${message.id}:`, content);
                }
            }
        } else {
            console.warn(`Invalid content for incoming message ${message.id}:`, content);
            content = 'Message content unavailable';
        }
        console.log(`Processing incoming message ID ${message.id} (processed):`, content);

        setMessages(prev => [...prev, { ...message, content }]);
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const sendMessage = () => {
        if (!inputText.trim() || inputText.length > 500) {
            alert('Message must be between 1 and 500 characters.');
            return;
        }
        if (ws && ws.readyState === WebSocket.OPEN) {
            const message = {
                type: chatType === 'private' ? 'private_message' : 'room_message',
                content: inputText.trim(),
                [chatType === 'private' ? 'recipientId' : 'roomId']: recipientId,
                messageType: 'text',
            };
            console.log('Sending message:', JSON.stringify(message, null, 2));
            ws.send(JSON.stringify(message));
            setInputText('');
        } else {
            alert('Chat server is disconnected. Please try again.');
        }
    };

    const inviteToPrivate = async (invitePmisId) => {
        try {
            const response = await fetch('http://192.168.16.41:6900/api/invite/private', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fromPmisId: pmisId,
                    toPmisId: invitePmisId
                })
            });

            const result = await response.json();
            if (result.success) {
                alert('Invitation sent successfully');
            }
        } catch (error) {
            console.error('Error sending invitation:', error);
            alert('Failed to send invitation');
        }
    };

    const renderMessage = ({ item }) => {
        let messageText = item.content;
        console.log(`Rendering message ID ${item.id} (raw):`, messageText);
        if (typeof messageText === 'string' && messageText.trim() !== '') {
            if (messageText === '[object Object]') {
                console.warn(`Invalid content for message ${item.id}: [object Object]`);
                messageText = 'Message content unavailable';
            } else if (messageText.startsWith('{"')) {
                try {
                    const parsed = JSON.parse(messageText);
                    messageText = parsed.text || parsed.content || parsed.message || messageText;
                } catch (e) {
                    console.warn(`Failed to parse JSON content for message ${item.id}:`, messageText);
                }
            }
        } else {
            console.warn(`Invalid content for message ${item.id}:`, messageText);
            messageText = 'Message content unavailable';
        }
        console.log(`Rendering message ID ${item.id} (processed):`, messageText);

        return (
            <View key={item.id} style={[
                styles.messageContainer,
                item.senderId === pmisId ? styles.userMessage : styles.otherMessage
            ]}>
                <View style={[
                    styles.messageBubble,
                    item.senderId === pmisId ? styles.userBubble : styles.otherBubble
                ]}>
                    <Text style={[
                        styles.messageText,
                        item.senderId === pmisId ? styles.userMessageText : styles.otherMessageText
                    ]}>
                        {messageText}
                    </Text>
                    <Text style={item.senderId === pmisId ? styles.timestamp : styles.timestampOther}>
                        {`${new Date(item.timestamp).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })} ${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    </Text>
                </View>
            </View>
        );
    };

    const renderTypingIndicator = () => {
        if (typingUsers.size === 0) return null;
        const typingText = chatType === 'private'
            ? 'Typing...'
            : `${typingUsers.size} user${typingUsers.size > 1 ? 's' : ''} typing...`;
        return (
            <View style={styles.typingIndicator}>
                <Text style={styles.typingText}>{typingText}</Text>
            </View>
        );
    };

    if (loading) {
        return (
            <Modal visible={visible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#007AFF" />
                        <Text style={styles.loadingText}>Loading messages...</Text>
                    </View>
                </View>
            </Modal>
        );
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            {loading ? (
                <View style={styles.modalOverlay}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#007AFF" />
                        <Text style={styles.loadingText}>Loading messages...</Text>
                    </View>
                </View>
            ) : (
                <View style={styles.modalOverlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.keyboardAvoidingView}
                    >
                        <View style={styles.modalContent}>
                            <View style={styles.header}>
                                {chatType === 'private' ? (
                                    <View style={{ flexDirection: 'row', flex: 1, height: height * .075 }}>
                                        <View style={{ marginRight: 5, paddingTop: 5 }}>
                                            <Image
                                                style={{ height: width * .1, width: width * .1, borderRadius: 100 }}
                                                source={{ uri: "data:image/jpeg;base64," + recipientPhoto }}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View>
                                                <Text style={{ fontSize: txtSizeNormal, fontWeight: 600 }}>
                                                    {recipientName}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: txtSizeMini * 1.3, flexWrap: "wrap" }}>
                                                    {recipientDesignation}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: txtSizeMini * 1.2 }}>
                                                    {recipientOffice}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                ) : (
                                    <Text style={styles.headerTitle}>Room: {recipientName}</Text>
                                )}
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <Text style={styles.closeText}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                ref={flatListRef}
                                data={messages}
                                renderItem={renderMessage}
                                keyExtractor={item => item.id}
                                style={styles.messagesList}
                                contentContainerStyle={styles.messagesContainer}
                                onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                                ListFooterComponent={renderTypingIndicator}
                            />

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    value={inputText}
                                    onChangeText={setInputText}
                                    placeholder="Type your message..."
                                    placeholderTextColor="#999"
                                    multiline
                                    maxLength={500}
                                />
                                <TouchableOpacity
                                    style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                                    onPress={sendMessage}
                                    disabled={!inputText.trim()}
                                >
                                    <Text style={styles.sendText}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            )}
        </Modal>
    );
};

// Styles
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        height: height * 0.9,
        width: width,
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: height * 0.85,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: txtSizeNormal,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 4,
    },
    closeText: {
        fontSize: txtSizeNormal,
        fontWeight: 'bold',
        color: '#666',
    },
    messagesList: {
        flex: 1,
    },
    messagesContainer: {
        padding: 16,
        paddingBottom: 8,
    },
    messageContainer: {
        marginBottom: 12,
    },
    userMessage: {
        alignItems: 'flex-end',
    },
    otherMessage: {
        alignItems: 'flex-start',
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 18,
        marginBottom: 4,
    },
    userBubble: {
        backgroundColor: '#007AFF',
        borderBottomRightRadius: 4,
    },
    otherBubble: {
        backgroundColor: '#f0f0f0',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: txtSizeNormal,
        marginBottom: 4,
    },
    userMessageText: {
        color: 'white',
    },
    otherMessageText: {
        color: '#000',
    },
    timestamp: {
        fontSize: txtSizeNormal,
        color: '#fff',
        alignSelf: 'flex-end',
    },
    timestampOther: {
        fontSize: txtSizeNormal,
        color: '#000',
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        maxHeight: 100,
        fontSize: txtSizeNormal,
    },
    sendButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    sendButtonDisabled: {
        backgroundColor: '#ccc',
    },
    sendText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: txtSizeNormal,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    loadingText: {
        marginTop: 10,
        fontSize: txtSizeNormal,
        color: '#666',
    },
    typingIndicator: {
        padding: 8,
        alignItems: 'flex-start',
    },
    typingText: {
        fontSize: txtSizeNormal,
        color: '#666',
        fontStyle: 'italic',
    },
});

export default ChatModal;