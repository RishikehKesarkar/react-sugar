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
import accounts from "../pages/master/accounts";
import purchase from "../pages/inword/purchase";

const jsxElement = {
    company: Company,
    company_list: Companies,
    city: City,
    city_list: Cities,
    role: Role,
    role_list: Roles,
    pages: PageMaster,
    signin: SignIn,
    home: Home,
    unauthorized: Unauthorized,
    account: Account,
    account_list: accounts,
    demogrid: DataGridDemo,
    purchase: purchase

}
export default jsxElement;