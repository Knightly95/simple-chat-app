import { IconButton, Tooltip } from '@mui/material';
import { memo } from 'react';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';

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
          top: 16,
          right: 16,
          bgcolor: enabled ? 'success.main' : 'action.disabled',
          color: 'white',
          '&:hover': {
            bgcolor: enabled ? 'success.dark' : 'action.hover',
          },
          zIndex: 1000,
        }}
        size="small"
      >
        {enabled ? <WifiIcon /> : <WifiOffIcon />}
      </IconButton>
    </Tooltip>
  );
}

export const WebSocketToggle = memo(WebSocketToggleComponent);
