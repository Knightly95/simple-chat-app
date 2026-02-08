import { Box, Paper, Typography } from '@mui/material';
import type { Message } from '@/types/chat';
import { formatTime } from '@/utils/message';
import { CHAT_CONSTANTS } from '@/constants/chat';
import { LAYOUT_STYLES, MESSAGE_STYLES } from '@/constants/styles';

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
    <Box sx={LAYOUT_STYLES.messageListContainer}>
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

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUserMessage = message.author === CHAT_CONSTANTS.AUTHOR_DEFAULT;
  const bubbleStyle = isUserMessage
    ? MESSAGE_STYLES.userBubble
    : MESSAGE_STYLES.otherUserBubble;

  return (
    <Paper sx={bubbleStyle}>
      {!isUserMessage && (
        <Typography sx={MESSAGE_STYLES.author}>{message.author}</Typography>
      )}
      <Typography variant="body2">{message.message}</Typography>
      <Typography variant="caption" sx={MESSAGE_STYLES.timestamp}>
        {formatTime(message.createdAt)}
      </Typography>
    </Paper>
  );
};
