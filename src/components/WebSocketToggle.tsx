import { IconButton, Tooltip } from '@mui/material';
import { memo } from 'react';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { POSITION_CONSTANTS } from '@/constants/chat';

interface WebSocketToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

function WebSocketToggleComponent({ enabled, onToggle }: WebSocketToggleProps) {
  return (
    <Tooltip
      title={
        enabled
          ? 'Disable auto-refresh'
          : 'Enable auto-refresh (simulates WebSocket)'
      }
    >
      <IconButton
        onClick={onToggle}
        sx={{
          position: 'absolute',
          top: POSITION_CONSTANTS.TOGGLE_TOP,
          right: POSITION_CONSTANTS.TOGGLE_RIGHT,
          bgcolor: enabled ? 'success.main' : 'action.disabled',
          color: 'white',
          '&:hover': {
            bgcolor: enabled ? 'success.dark' : 'action.hover',
          },
          zIndex: POSITION_CONSTANTS.Z_INDEX_TOGGLE,
        }}
        size="small"
      >
        {enabled ? <WifiIcon /> : <WifiOffIcon />}
      </IconButton>
    </Tooltip>
  );
}

export const WebSocketToggle = memo(WebSocketToggleComponent);
