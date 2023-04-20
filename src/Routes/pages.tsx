import SignIn from "../pages/auth/SignIn";
import Home from "../pages/home/Home";
import CompanyMaster from "../pages/master/companyMaster";
import RoleMaster from "../pages/master/roleMaster";
import Unauthorized from "../pages/Unauthorized";
import Demo from "../pages/testsPage/demo";
import CompanyMasterList from "../pages/master/companyMasterList";
import RoleMasterList from "../pages/master/roleMasterList";
import DataGridDemo from "../pages/testsPage/DemoTableWithAction";

export interface pageInterface {
    Id: number,
    path: string,
    title: string,
    component: JSX.Element,
    routeType: string,
    icon?: string,
    hidden?: boolean,
    selected?:boolean
}

const pages: readonly pageInterface[] = [
    {
        Id:1,
        path: '/', title: 'SignIn',
        icon: "columns", component: <SignIn />,
        hidden: true, routeType: 'public'
    },
    {
        Id:2,
        path: 'Home', title: 'Home',
        icon: "columns", component: <Home />,
        hidden: true, routeType: 'public'
    },
    {
        Id:3,
        path: '/unauthorized', title: 'unauthorized',
        icon: "columns", component: <Unauthorized />,
        hidden: true, routeType: 'public'
    },
    {
        Id:4,
        path: '/Company/:id', title: 'Company',
        icon: "columns", component: <CompanyMaster />,
        hidden: true, routeType: 'private'
    },
    {
        Id:5,
        path: '/company', title: 'companyList',
        icon: "columns", component: <CompanyMasterList />, routeType: 'private'
    },
    {
        Id:6,
        path: '/role/:id', title: 'roles',
        icon: "columns", component: <RoleMaster />, hidden: true, routeType: 'private'
    },
    {
        Id:7,
        path: '/role', title: 'roles',
        icon: "columns", component: <RoleMasterList />, routeType: 'private'
    },
    {
        Id:8,
        path: '/DemoGrid', title: 'DemoGrid',
        icon: "columns", component: <DataGridDemo />, routeType: 'public'
    }
]

export default pages;