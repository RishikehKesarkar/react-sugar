export interface IHeadCell {
    disablePadding?: boolean;
    id: any;
    label: string;
    numeric: boolean;
    filter?: boolean;
    hidden?:boolean;
    renderCell?:any
}