import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { useDispatch, useSelector } from "react-redux";
import { refresh as sliceRefresh } from "../service/authService";

const PersistLogin = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                //await refresh();
                dispatch(sliceRefresh());
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        !data?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    return (
        <>
            {/* {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            } */}
            {
                isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin