import './assets/css/App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouteSection } from './common/sidebar';
import SignIn from './pages/auth/login';
const mdTheme = createTheme();

function App() {
  return (
    <>
        <RouteSection />
      <ToastContainer theme='colored'/>
    </>
  );
}

export default App;
