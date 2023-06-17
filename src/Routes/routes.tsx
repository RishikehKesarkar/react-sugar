import { Route, Routes } from "react-router-dom";
import Layout from "../shared/Layout";
import PersistLogin from "../shared/PersistLogin";
import RequireAuth from "../shared/RequireAuth";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getAllpages } from "../service/pageService";
import PublicRouteLoad from "../shared/PublicRouteLoad";
import { IpageMaster } from "../interface/Ipage/IpageMaster";
import { ERouteType } from "../common/enum/Enum";
import Components from "./Components.js";

const Routers = () => {
    const { pages } = useSelector((state: RootState) => state.pages);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllpages());
    }, [dispatch])
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {PublicRoutes(pages)}
                {PrivateRoutes(pages)}
            </Route>
        </Routes>
    )

}


const PublicRoutes = (dbPages: IpageMaster[]) => {
    if (dbPages.length > 0)
        return (
            <Route element={<PublicRouteLoad />}>
                {
                    dbPages.map((val, index) => (
                        val.routeType == ERouteType.public ?
                            <Route key={index} path={val.path} element={Components(val.pageName)} />
                            : null)
                    )
                }
            </Route>
        )
    else {
        return (
            <Route key={0} path='/' element={Components("signin")} />
        )
    }


}

const PrivateRoutes = (dbPages: IpageMaster[]) => {
    if (dbPages.length > 0)
        return (<Route element={<PersistLogin />}>
            {
                dbPages.map((val, index) => (
                    val.routeType == ERouteType.private ?
                        <Route key={index} element={<RequireAuth allowedRoles={val.Id} />} >
                            <Route path={val.path} element={Components(val.pageName)} />
                        </Route> : null
                ))
            }
        </Route>
        )
    else
        return null;
}

export default Routers;