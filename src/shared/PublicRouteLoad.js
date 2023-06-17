import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refresh as sliceRefresh } from "../service/authService";
import { getAllRoles } from "../service/roleMaster-Service";
import { getAllMenu } from "../service/menuMaster-Service";
import Loader from "./loader";
import { sliceEnum } from "../common/enum/Enum";
import { getSessionUser } from "../common/commonMethod";

const PublicRouteLoad = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { data, httpStatus } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (httpStatus == 403)
            navigate('/', { state: { from: location }, replace: true });
    }, [httpStatus])

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                dispatch(sliceRefresh());
                dispatch(getAllRoles());
                dispatch(getAllMenu(getSessionUser()?.userId));
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        !data?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    return (
        <>
            {
                isLoading
                    ? <Loader isLoading={sliceEnum.loading} />
                    : <Outlet />
            }
        </>
    )
}

export default PublicRouteLoad