import { createTheme, ThemeProvider } from '@mui/material/styles';
import './assets/css/App.css'
import Box from '@mui/material/Box';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routers from './Routes/routes';
const mdTheme = createTheme();

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  return (
    <>
      <Routers />
      <ToastContainer theme='colored' />
    </>
  );
}

export default App;
