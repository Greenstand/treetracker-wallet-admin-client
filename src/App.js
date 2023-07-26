import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ClientRoutes from './components/Routes/ClientRoutes';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/UI/theme';
import AuthProvider from './store/AuthProvider';
import WalletProvider from './store/WalletProvider';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <WalletProvider>
            <ClientRoutes>
              <Layout></Layout>
            </ClientRoutes>
          </WalletProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
