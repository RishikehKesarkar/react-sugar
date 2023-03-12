import './assets/css/App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestFile from './pages/TestFile';
import { RouteSection } from './common/sidebar';
const mdTheme = createTheme();

function App() {
  return (
    <>
      <Router>
        <RouteSection />
      </Router>
      <ToastContainer theme='colored'/>
    </>
  );
}

export default App;
