import { createTheme, ThemeProvider } from '@mui/material/styles';
import './assets/css/App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routers from './Routes/routes';
const mdTheme = createTheme();

function App() {
  return (
    <>
      <Routers />
      <ToastContainer theme='colored' />
    </>
  );
}

export default App;
