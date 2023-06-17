import SignIn from "../pages/auth/SignIn";
import Home from "../pages/home/Home";
import Company from "../pages/master/company";
import Role from "../pages/master/role";
import Unauthorized from "../pages/Unauthorized";
import Demo from "../pages/testsPage/demo";
import Companies from "../pages/master/companies";
import Roles from "../pages/master/roles";
import DataGridDemo from "../pages/testsPage/DemoTableWithAction";
import Cities from '../pages/master/cities';
import City from "../pages/master/city";
import Account from "../pages/master/account";
import PageMaster from "../pages/master/pageMaster";
import { IpageMaster } from "../interface/Ipage/IpageMaster";

const jsxElement={
    company:Company,
    company_list:Companies,
    city:City,
    city_list:Cities,
    role:Role,
    role_list:Roles,
    pages:PageMaster,
    signin:SignIn,
    home:Home,
    unauthorized:Unauthorized,
    account:Account,
    demogrid:DataGridDemo

}
export default jsxElement;

const Oldpages: IpageMaster[] = [
    {
        Id: 1,
        path: '/', title: 'SignIn',
        icon: "columns", component: <SignIn />,
        hidden: true, routeType: 1
    },
    {
        Id: 2,
        path: 'Home', title: 'Home',
        icon: "columns", component: <Home />,
        hidden: true, routeType: 1
    },
    {
        Id: 3,
        path: '/unauthorized', title: 'unauthorized',
        icon: "columns", component: <Unauthorized />,
        hidden: true, routeType: 1
    },
    {
        Id: 4,
        path: '/company/:id', title: 'CompanyForm',
        icon: "columns", component: <Company />,
        hidden: true, routeType: 1
    },
    {
        Id: 5,
        path: '/company', title: 'company',
        icon: "columns", component: <Companies />, routeType: 2
    },
    {
        Id: 6,
        path: '/role/:id', title: 'roles Form',
        icon: "columns", component: <Role/>, hidden: true, routeType: 2
    },
    {
        Id: 7,
        path: '/role', title: 'roles',
        icon: "columns", component: <Roles />, routeType: 2
    },
    {
        Id: 8,
        path: '/city', title: 'city',
        icon: "columns", component: <Cities />, routeType: 2
    },
    {
        Id: 9,
        path: '/city/:id', title: 'city Master',
        icon: "columns", component: <City />, hidden: true, routeType: 2
    },
    {
        Id: 10,
        path: '/account', title: 'account Master',
        icon: "columns", component: <Account />, hidden: false, routeType: 2
    },
    {
        Id: 11,
        path: '/DemoGrid', title: 'DemoGrid',
        icon: "columns", component: <DataGridDemo />, routeType: 1
    },
    {
        Id: 12,
        path: '/pageMaster', title: 'Page Master',
        icon: "columns", component: <PageMaster />, routeType: 1
    }
]
