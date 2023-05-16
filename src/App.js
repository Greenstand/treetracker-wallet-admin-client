import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ClientRoutes from "./components/Routes/ClientRoutes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/UI/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <ClientRoutes />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
