import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { sliceEnum } from "../common/enum/Enum";
import Loader from "./loader";

const RequireAuth = ({ allowedRoles }: any) => {
    const { status, data } = useSelector((state: RootState) => state.auth);
    const { auth }: any = useAuth();
    const location = useLocation();
    return (
        status == sliceEnum.loading ? <Loader isLoading={sliceEnum.loading} /> :
            data?.roles?.includes(allowedRoles)
                ? <Outlet />
                : data?.accessToken //changed from user to accessToken to persist login after refresh
                    ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                    : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;