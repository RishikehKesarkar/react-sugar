import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { sliceEnum } from "../common/enum/Enum";
import Loader from "./loader";

const RequireAuth = ({ allowedRoles }: any) => {
    const { status, data } = useSelector((state: RootState) => state.auth);
    const location = useLocation();
    return (
        status == sliceEnum.loading ? <Loader isLoading={sliceEnum.loading} /> :
            data?.roleAccess?.includes(allowedRoles)
                ? <Outlet />
                : data?.accessToken //changed from user to accessToken to persist login after refresh
                    ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                    : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;