import { Alert } from '@mui/material';

export const MessageType = {
  Error: 'error',
  Warning: 'warning',
  Info: 'info',
  Success: 'success',
};

const Message = ({ message, onClose, messageType = MessageType.Error }) => {
  return (
    <div style={{ display: 'inline-block', minWidth: '35%' }}>
      <Alert
        severity={messageType}
        onClose={onClose}
        style={{ margin: '0.5rem 0' }}
      >
        {message}
      </Alert>
    </div>
  );
};

export default Message;