export const LAYOUT_STYLES = {
  container: {
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100vh',
    width: '100%',
    maxWidth: {
      xs: '100%', // Mobile: full width
      md: '700px', // Desktop: 700px from design images
    },
    backgroundColor: '#f5f5f5',
    backgroundImage:
      'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23cccccc" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    margin: '0 auto',
  },
  messageListContainer: {
    flex: 1,
    overflowY: 'auto' as const,
    p: 3, // 24px from design images
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2, // 16px gap
  },
  inputContainer: {
    p: 2, // 16px from design images
    borderRadius: 0,
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
  },
} as const;

export const MESSAGE_STYLES = {
  otherUserBubble: {
    p: 2, // 16px from design images
    bgcolor: '#e8f4f8',
    color: '#333',
    maxWidth: '70%', // Simplified - works across all screen sizes
    alignSelf: 'flex-start' as const,
    borderRadius: 1,
    wordBreak: 'break-word' as const,
    overflowWrap: 'break-word' as const,
  },
  userBubble: {
    p: 2, // 16px from design images
    bgcolor: '#fffacd',
    color: '#333',
    maxWidth: '70%', // Simplified - works across all screen sizes
    alignSelf: 'flex-end' as const,
    borderRadius: 1,
    wordBreak: 'break-word' as const,
    overflowWrap: 'break-word' as const,
  },
  timestamp: {
    mt: 1,
    opacity: 0.6,
    fontSize: '0.75rem',
  },
  author: {
    fontWeight: 600,
    mb: 0.5,
    fontSize: '0.875rem',
    color: '#666',
  },
} as const;
