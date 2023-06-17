import { ERouteType } from "../../common/enum/Enum";
import IcommonField from "../IcommonField";

export interface IpageMaster extends IcommonField {
    Id: number,
    path: string,
    title: string,
    component?: JSX.Element,
    routeType: ERouteType,
    icon?: string,
    hidden?: boolean | number,
    selected?: boolean,
    pageName?:string
    menuId?:number,
    subMenuId?:number
}