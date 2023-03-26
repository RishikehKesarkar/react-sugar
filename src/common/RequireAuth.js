import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getCookies } from "./util/cookies";
import crypto from "./util/crypto";

const RequireAuth = ({ allowedRoles }) => {
    const user = JSON.parse(crypto.decrypted(getCookies('user')));
    console.log(user);
    console.log(user.roleAccess);
    const { auth } = useAuth();
    const location = useLocation();
    return (
        user?.roleAccess?.includes(allowedRoles)
            ? <Outlet />
            : user?.userName
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;