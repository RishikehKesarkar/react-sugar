 import Login from "../../pages/auth/login";
import CenterForm from "../../pages/centers/centerForm";
import Factory from "../../pages/factory/factory";
import FactoryForm from "../../pages/factory/factoryForm";
import TestFile from "../../pages/TestFile";
import TestFile1 from "../../pages/TestFile1";

 const routeConfig=[
    {
        path:'/',
        title:'login',
        icon:"columns",
        component:<Login/>
    },
    {
        path:'/test',
        title:'test1',
        icon:"columns",
        component:<TestFile1/>
    },
    {
        path:'/factory',
        title:'factory',
        icon:"columns",
        component:<Factory/>
    },
    {
        path:'/factory/form/:id',
        // title:'factoryForm',
        // icon:"columns",
        component:<FactoryForm/>
    },
    {
        path:'/center/form',
        title:'center',
        icon:"columns",
        component:<CenterForm/>
    }
]

export default routeConfig;