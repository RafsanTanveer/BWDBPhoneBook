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
    Image,
    Animated,
    Easing,
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
    const [showReactionPicker, setShowReactionPicker] = useState(null); // Track which message shows reaction picker

    // For bouncing dots animation
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    // Animate the dots when typing indicator is shown
    useEffect(() => {
        let isMounted = true;
        if (typingUsers.size > 0) {
            const bounce = (dot, delay) => {
                return Animated.loop(
                    Animated.sequence([
                        Animated.timing(dot, {
                            toValue: -6,
                            duration: 250,
                            delay,
                            useNativeDriver: true,
                            easing: Easing.inOut(Easing.ease),
                        }),
                        Animated.timing(dot, {
                            toValue: 0,
                            duration: 250,
                            useNativeDriver: true,
                            easing: Easing.inOut(Easing.ease),
                        }),
                    ])
                );
            };
            const anim1 = bounce(dot1, 0);
            const anim2 = bounce(dot2, 5);
            const anim3 = bounce(dot3, 10);

            anim1.start();
            anim2.start();
            anim3.start();

            return () => {
                anim1.stop();
                anim2.stop();
                anim3.stop();
            };
        } else {
            dot1.setValue(0);
            dot2.setValue(0);
            dot3.setValue(0);
        }
        return () => { isMounted = false; };
    }, [typingUsers.size]);

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

            const processedMessages = data.map(message => {
                let content = message.content;
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
                return { ...message, content, reactions: message.reactions || [] };
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

        if (message.type === 'private_reaction' || message.type === 'room_reaction') {
            setMessages(prevMessages => {
                const updatedMessages = prevMessages.map(msg => {
                    if (msg.id === message.messageId) {
                        const existingReaction = msg.reactions.find(r => r.pmisId === message.pmisId && r.reactionType === message.reactionType);
                        let updatedReactions;
                        if (existingReaction) {
                            // Remove reaction
                            updatedReactions = msg.reactions.filter(r => r.reactionId !== existingReaction.reactionId);
                        } else {
                            // Add reaction
                            updatedReactions = [...msg.reactions, {
                                reactionId: generateId(),
                                pmisId: message.pmisId,
                                reactionType: message.reactionType,
                                timestamp: message.timestamp
                            }];
                        }
                        return { ...msg, reactions: updatedReactions };
                    }
                    return msg;
                });
                return updatedMessages;
            });
            return;
        }

        let content = message.content;
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

        setMessages(prev => [...prev, { ...message, content, reactions: [] }]);
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

    const sendReaction = (messageId, reactionType) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const reaction = {
                type: chatType === 'private' ? 'private_reaction' : 'room_reaction',
                messageId,
                reactionType,
                [chatType === 'private' ? 'recipientId' : 'roomId']: recipientId,
            };
            console.log('Sending reaction:', JSON.stringify(reaction, null, 2));
            ws.send(JSON.stringify(reaction));
            setShowReactionPicker(null); // Close reaction picker
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

    // Helper function to generate unique IDs
    const generateId = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };

    const renderMessage = ({ item }) => {
        let messageText = item.content;
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

        const reactionEmojiMap = {
            like: '👍',
            love: '❤️',
            angry: '😣',
            haha: '😂',
            sad: '😢',
            wow: '😮',
            celebrate: '🎉',
            cool: '😎',
            thinking: '🤔',
            clap: '👏',
            fire: '🔥',
            star: '⭐',
            party: '🥳',
            ok: '👌',
            cry: '😭',
            kiss: '😘',
            surprised: '😲',
            sick: '🤢',
            sleepy: '😴',
            nerd: '🤓',
        };

        const toggleReactionPicker = () => {
            setShowReactionPicker(showReactionPicker === item.id ? null : item.id);
        };

        return (
            <View key={item.id} style={[
                styles.messageContainer,
                item.senderId === pmisId ? styles.userMessage : styles.otherMessage
            ]}>
                <TouchableOpacity onLongPress={toggleReactionPicker}>
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
                </TouchableOpacity>
                {item.reactions && item.reactions.length > 0 && (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: -14,
                        marginLeft: 2,
                        // Overlap by negative margin
                        height: 36,
                        backgroundColor: 'transparent',
                    }}>
                        {item.reactions.slice(0, 5).map((reaction, idx) => {
                            // If you have user avatars, use them here. Otherwise, use emoji or a placeholder.
                            // For demonstration, we'll use emoji or a white circle with emoji inside.
                            const emoji = reactionEmojiMap[reaction.reactionType] || '❓';
                            return (
                                <TouchableOpacity
                                    onPress={() => sendReaction(item.id, reaction.reactionType)}
                                    key={idx}
                                    style={{
                                        zIndex: item.reactions.length - idx,
                                        marginLeft: idx === 0 ? 0 : -8, // overlap
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 999,
                                        backgroundColor: '#fff',
                                        width: 20,
                                        height: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.08,
                                        shadowRadius: 2,
                                        elevation: 1,
                                    }}
                                >
                                    {/* If you have a user avatar, use <Image source={{uri: reaction.userAvatar}} ... /> */}
                                    <Text style={{
                                        fontSize: txtSizeNormal,
                                        textAlign: 'center',
                                    }}>
                                        {emoji}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                        {item.reactions.length > 5 && (
                            <View
                                style={{
                                    marginLeft: -14,
                                    borderWidth: 2,
                                    borderColor: '#fff',
                                    borderRadius: 999,
                                    backgroundColor: '#fff',
                                    width: 36,
                                    height: 36,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 0,
                                }}
                            >
                                <Text style={{ fontSize: 14, color: '#333' }}>
                                    +{item.reactions.length - 5}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
                {showReactionPicker === item.id && (
                    <View style={styles.reactionPicker}>
                        {Object.keys(reactionEmojiMap).map((reactionType) => (
                            <TouchableOpacity
                                key={reactionType}
                                style={styles.reactionButton}
                                onPress={() => sendReaction(item.id, reactionType)}
                            >
                                <Text style={styles.reactionEmoji}>{reactionEmojiMap[reactionType]}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    const renderTypingIndicatorDiv = () => {
        if (typingUsers.size === 0) return null;
        const typingText = chatType === 'private'
            ? ''
            : `${typingUsers.size} user${typingUsers.size > 1 ? 's' : ''} typing`;

        return (
            <View style={styles.typingIndicator}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.typingText}>{typingText}</Text>
                    <View style={{ width: 24, flexDirection: 'row', marginLeft: 4 }}>
                        <Animated.Text
                            style={[styles.typingDot, { transform: [{ translateY: dot1 }] }]}
                        >.</Animated.Text>
                        <Animated.Text
                            style={[styles.typingDot, { transform: [{ translateY: dot2 }] }]}
                        >.</Animated.Text>
                        <Animated.Text
                            style={[styles.typingDot, { transform: [{ translateY: dot3 }] }]}
                        >.</Animated.Text>
                    </View>
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
                            <View style={[styles.header, { backgroundColor: '#f7f8fa', paddingHorizontal: 16, paddingVertical: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }]}>
                                {chatType === 'private' ? (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                        <Image
                                            style={{
                                                height: width * 0.12,
                                                width: width * 0.12,
                                                borderRadius: width * 0.06,
                                                marginRight: 12,
                                                backgroundColor: '#fffffe'
                                            }}
                                            source={{ uri: "data:image/jpeg;base64," + recipientPhoto }}
                                        />
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: txtSizeNormal, fontWeight: '700', color: '#222' }} numberOfLines={1}>
                                                {recipientName}
                                            </Text>
                                            <Text style={{ fontSize: txtSizeMini * 1.3, color: '#555', marginTop: 2 }} numberOfLines={1}>
                                                {recipientDesignation}
                                            </Text>
                                            <Text style={{ fontSize: txtSizeMini * 1.1, color: '#555', marginTop: 1 }} numberOfLines={1}>
                                                {recipientOffice}
                                            </Text>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ backgroundColor: '#007AFF', borderRadius: 16, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8 }}>
                                            <Text style={{ color: '#fff', fontWeight: '700', fontSize: txtSizeMini * 1.3 }}>Room</Text>
                                        </View>
                                        <Text style={[styles.headerTitle, { color: '#222', fontWeight: '700', fontSize: txtSizeNormal + 2 }]} numberOfLines={1}>
                                            {recipientName}
                                        </Text>
                                    </View>
                                )}
                                <TouchableOpacity
                                    onPress={onClose}
                                    style={{
                                        marginLeft: 12,
                                        borderRadius: 100,
                                        padding: 6,
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>✕</Text>
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
                            {renderTypingIndicatorDiv()}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    value={inputText}
                                    onChangeText={setInputText}
                                    placeholder="Type your message..."
                                    placeholderTextColor="#999"
                                    multiline
                                    maxLength={500}
                                    blurOnSubmit={false}
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
    messagesList: {
        flex: 1,
    },
    messagesContainer: {
        padding: 16,
        paddingBottom: 8,
        marginBottom: 5
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
        paddingHorizontal: 14,
        paddingVertical: 2,
        alignItems: 'flex-start',
        minWidth: 80,
    },
    typingText: {
        fontSize: txtSizeNormal,
        color: '#666',
        fontStyle: 'italic',
    },
    typingDot: {
        fontSize: txtSizeNormal + 4,
        color: '#666',
        fontWeight: 'bold',
        marginHorizontal: 1,
        lineHeight: txtSizeNormal + 4,
    },
    reactionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
    },
    reactionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 100,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 6,
        marginBottom: 4,
    },
    reactionEmoji: {
        fontSize: txtSizeNormal,
        marginRight: 4,
    },
    reactionCount: {
        fontSize: txtSizeMini,
        color: '#333',
    },
    reactionPicker: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 8,
        marginTop: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    reactionButton: {
        padding: 8,
    },
});

export default ChatModal;