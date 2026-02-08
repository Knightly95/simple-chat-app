import { Paper, Stack, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CHAT_CONSTANTS } from '@/constants/chat';
import { isValidMessage } from '@/utils/message';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSendMessage,
  onKeyDown,
  disabled = false,
}) => {
  const isDisabled = disabled || !isValidMessage(value);

  return (
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
          placeholder={CHAT_CONSTANTS.INPUT_PLACEHOLDER}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          multiline
          maxRows={CHAT_CONSTANTS.MAX_INPUT_ROWS}
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              'aria-label': 'Message input field',
            },
          }}
        />
        <IconButton
          color="primary"
          onClick={onSendMessage}
          disabled={isDisabled}
          aria-label="Send message"
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};
