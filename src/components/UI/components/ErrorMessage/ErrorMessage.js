import { Alert } from '@mui/material';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div style={{ display: 'inline-block', minWidth: '35%' }}>
      <Alert severity="error" onClose={onClose} role="alert">
        {message}
      </Alert>
    </div>
  );
};

export default ErrorMessage;
