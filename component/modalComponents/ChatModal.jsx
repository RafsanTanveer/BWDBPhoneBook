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
    ActivityIndicator
} from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
import { chatServerAddress } from '../../api/ServerAddress';
import { AuthContext } from '../../context/AuthContext';

const ChatModal = ({ visible, onClose, userId, chatType, chatId, chatName }) => {
    const { userInfo, photo, name, pmisId } = useContext(AuthContext);

    const senderPmisId = pmisId;
    const senderName = name;
    const senderPhoto = photo;

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(true);
    const [ws, setWs] = useState(null);
    const flatListRef = useRef(null);

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
            };

            return () => {
                websocket.close();
            };
        }
    }, [visible, pmisId]);

    // Load message history when chat changes
    useEffect(() => {
        if (visible && chatId) {
            loadMessageHistory();
        }
    }, [visible, chatId, chatType]);

    const loadMessageHistory = async () => {
        setLoading(true);
        const TIMEOUT_DURATION = 10000;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

        try {
            let url;
            if (chatType === 'private') {
                url = `http://192.168.16.41:6900/api/messages/private/${pmisId}/${chatId}`;
            } else {
                url = `http://192.168.16.41:6900/api/messages/room/${chatId}`;
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
                [chatType === 'private' ? 'recipientId' : 'roomId']: chatId,
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
                    {/* <Text style={styles.senderName}>
                        {item.senderName || 'Unknown User'}
                    </Text> */}
                    <Text style={[
                        styles.messageText,
                        item.senderId === pmisId ? styles.userMessageText : styles.otherMessageText
                    ]}>
                        {messageText}
                    </Text>
                    <Text style={styles.timestamp}>
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </View>
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
            <View style={styles.modalOverlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoidingView}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>
                                {chatType === 'private' ? `Chat with ${chatName}` : `Room: ${chatName}`}
                            </Text>
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

                        {chatType === 'private' && (
                            <TouchableOpacity
                                style={styles.inviteButton}
                                onPress={() => {
                                    alert('User selection would appear here');
                                }}
                            >
                                <Text style={styles.inviteText}>Invite Others</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </KeyboardAvoidingView>
            </View>
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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 4,
    },
    closeText: {
        fontSize: 20,
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
    senderName: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    messageText: {
        fontSize: 16,
        marginBottom: 4,
    },
    userMessageText: {
        color: 'white',
    },
    otherMessageText: {
        color: '#333',
    },
    timestamp: {
        fontSize: 10,
        color: '#fff',
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
        fontSize: 16,
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
        fontSize: 14,
    },
    inviteButton: {
        backgroundColor: '#34C759',
        padding: 12,
        alignItems: 'center',
    },
    inviteText: {
        color: 'white',
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
});

export default ChatModal;