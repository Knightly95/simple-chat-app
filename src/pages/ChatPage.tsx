import { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import type { Message } from '@/types/chat';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) {
      return;
    }

    const newMessage: Message = {
      _id: `${Date.now()}`,
      message: inputValue,
      author: 'User',
      createdAt: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography variant="h6" color="textSecondary">
              No messages yet
            </Typography>
          </Box>
        ) : (
          messages.map((message) => (
            <Paper
              key={message._id}
              sx={{
                p: 2,
                bgcolor: 'primary.main',
                color: 'white',
                maxWidth: '70%',
                alignSelf: 'flex-start',
                borderRadius: 2,
              }}
            >
              <Typography variant="body1">{message.message}</Typography>
            </Paper>
          ))
        )}
      </Box>

      <Paper
        sx={{
          p: 2,
          borderRadius: 0,
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            multiline
            maxRows={4}
            variant="outlined"
            size="small"
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </Paper>
    </Box>
  );
}
