import CreateManagedWallet from './CreateManagedWallet';
import { Paper } from '@mui/material';

const ManagedWallets = () => {
  return (
    <div
      style={{
        marginTop: '5rem',
        marginLeft: '1rem',
        display: 'flex',
        flexDirection: 'column',
        marginRight: '1rem',
        width: '100%',
      }}
    >
      <Paper>
        <CreateManagedWallet />
      </Paper>
    </div>
  );
};

export default ManagedWallets;
