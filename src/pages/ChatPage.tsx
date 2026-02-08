import { useState, useRef, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import type { CreateMessageRequest } from '@/types/chat';
import { MessageList } from '@/components/MessageList';
import { MessageInput } from '@/components/MessageInput';
import { CHAT_CONSTANTS, KEYBOARD_KEYS } from '@/constants/chat';
import { LAYOUT_STYLES } from '@/constants/styles';
import { useMessageStore } from '@/stores/messageStore';

export default function ChatPage() {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = useMessageStore((state) => state.messages);
  const fetchMessages = useMessageStore((state) => state.fetchMessages);
  const sendMessage = useMessageStore((state) => state.sendMessage);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) {
      return;
    }

    const messageData: CreateMessageRequest = {
      message: inputValue,
      author: CHAT_CONSTANTS.AUTHOR_DEFAULT,
    };

    await sendMessage(messageData);
    setInputValue('');
  }, [inputValue, sendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === KEYBOARD_KEYS.ENTER && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  return (
    <Box sx={LAYOUT_STYLES.container}>
      <MessageList messages={messages} scrollRef={messagesEndRef} />
      <MessageInput
        value={inputValue}
        onChange={setInputValue}
        onSendMessage={handleSendMessage}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
}
