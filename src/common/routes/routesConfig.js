import SignIn from "../../pages/auth/login";
import Home from "../../pages/home/Home";
import AccountHead from "../../pages/master/accountHead";
import SignUp from "../../pages/auth/SignUp";
import CompanyMaster from "../../pages/master/companyMaster";
import RoleMaster from "../../pages/master/roleMaster";
import Unauthorized from "../../pages/Unauthorized";

 const routeConfig=[
    {
        path:'/',
        title:'login',
        icon:"columns",
        component:<SignIn/>
    },
    {
        path:'unauthorized',
        title:'unauthorized',
        icon:"columns",
        component:<Unauthorized/>
    },
    {
        Id:1,
        path:'/Home',
        title:'Home',
        icon:"columns",
        component:<Home/>
    },
    {
        Id:2,
        path:'/Account',
        title:'Account',
        icon:"columns",
        component:<AccountHead/>
    },
    {
        Id:3,
        path:'/SignUp',
        title:'user Registration',
        icon:"columns",
        component:<SignUp/>
    },
    {
        Id:4,
        path:'/Company',
        title:'Company',
        icon:"columns",
        component:<CompanyMaster/>
    },
    {
        Id:5,
        path:'/Role',
        title:'Role',
        icon:"columns",
        component:<RoleMaster/>
    },

]

export default routeConfig;