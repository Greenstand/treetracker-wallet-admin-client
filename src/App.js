import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ClientRoutes from './components/Routes/ClientRoutes';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/UI/theme';
import AuthProvider from './store/AuthProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <AuthProvider>
            <ClientRoutes>
              <Layout></Layout>
            </ClientRoutes>
          </AuthProvider>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
