import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const TestAuth = () => {
    return useContext(AuthContext);
}

export default TestAuth;