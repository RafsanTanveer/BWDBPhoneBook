import React, { useState, useRef } from 'react';
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
    Image,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ChatModal = ({ visible, onClose }) => {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello! How can I help you?', sender: 'bot', timestamp: new Date() },
    ]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef(null);

    const sendMessage = () => {
        if (inputText.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                text: inputText.trim(),
                sender: 'user',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, newMessage]);
            setInputText('');

            // Simulate bot response after a short delay
            setTimeout(() => {
                const botResponse = {
                    id: Date.now().toString(),
                    text: 'Thanks for your message! I\'ll get back to you soon.',
                    sender: 'bot',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botResponse]);
            }, 1000);
        }
    };

    const renderMessage = ({ item }) => (
        <View style={[
            styles.messageContainer,
            item.sender === 'user' ? styles.userMessage : styles.botMessage
        ]}>
            <View style={[
                styles.messageBubble,
                item.sender === 'user' ? styles.userBubble : styles.botBubble
            ]}>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.timestamp}>
                    {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </View>
        </View>
    );

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
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Chat Support</Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Text style={styles.closeText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Messages List */}
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            renderItem={renderMessage}
                            keyExtractor={item => item.id}
                            style={styles.messagesList}
                            contentContainerStyle={styles.messagesContainer}
                            onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                        />

                        {/* Input Area */}
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
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: height * 0.8,
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
    botMessage: {
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
    botBubble: {
        backgroundColor: '#f0f0f0',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    userMessageText: {
        color: 'white',
    },
    timestamp: {
        fontSize: 10,
        color: '#999',
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
});

export default ChatModal;