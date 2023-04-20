import { Route, Routes } from "react-router-dom";
import Layout from "../shared/Layout";
import PersistLogin from "../shared/PersistLogin";
import RequireAuth from "../shared/RequireAuth";
import pages from "./pages";

const Routers = () => (
    <Routes>
        <Route path='/' element={<Layout />}>
            {PublicRoutes()}
            {PrivateRoutes()}
        </Route>
    </Routes>

) 


const PublicRoutes = () => (
    pages.map((val, index) => (
        val.routeType.toLowerCase() === 'public' ? <Route key={index} path={val.path} element={val.component} /> : null)
    )
)

const PrivateRoutes = () => (

    <Route element={<PersistLogin />}>
        {
            pages.map((val, index) => (
                val.routeType.toLocaleLowerCase() === 'private' ?
                    <Route key={index} element={<RequireAuth allowedRoles={val.Id} />} >
                        <Route path={val.path} element={val.component} />
                    </Route> : null
            ))
        }
    </Route>
)


export default Routers;