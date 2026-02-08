import { Box, Paper, Stack, Typography } from '@mui/material';
import type { Message } from '@/types/chat';
import { formatTime } from '@/utils/message';
import { CHAT_CONSTANTS, UI_CONSTANTS } from '@/constants/chat';

interface MessageListProps {
  messages: Message[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  scrollRef,
}) => {
  const hasMessages = messages.length > 0;

  return (
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
      {!hasMessages && <EmptyState />}

      {hasMessages &&
        messages.map((message) => (
          <MessageBubble key={message._id} message={message} />
        ))}

      <div ref={scrollRef} />
    </Box>
  );
};

const EmptyState: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    }}
  >
    <Typography variant="h6" color="textSecondary">
      {CHAT_CONSTANTS.EMPTY_STATE_MESSAGE}
    </Typography>
  </Box>
);

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => (
  <Paper
    sx={{
      p: 2,
      bgcolor: 'primary.main',
      color: 'white',
      maxWidth: UI_CONSTANTS.MAX_MESSAGE_WIDTH,
      alignSelf: 'flex-start',
      borderRadius: UI_CONSTANTS.BORDER_RADIUS_SM,
    }}
  >
    <Typography variant="body1">{message.message}</Typography>
    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
      <Typography variant="caption" sx={{ opacity: 0.7 }}>
        {formatTime(message.createdAt)}
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.7 }}>
        {message.author}
      </Typography>
    </Stack>
  </Paper>
);
