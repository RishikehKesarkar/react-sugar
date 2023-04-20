import adminLayout from "../../masterLayout/adminLayout";
import CustomTable from "../../common/CustomTable";
import { useState, useEffect } from "react";
import Control from "../../components";
import { IHeadCell } from "../../interface/tableHead/IHeadCell";
import { getAllRoles } from "../../service/roleMaster-Service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { sliceEnum } from "../../common/enum/Enum";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import crypto from "../../common/crypto";


const headCells: IHeadCell[] = [
    {
        id: 'Id',
        numeric: true,
        disablePadding: true,
        hidden: true,
        label: 'id'
    },
    {
        id: 'roleName',
        numeric: false,
        disablePadding: false,
        label: 'role Name',
        filter: true
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'description',
        filter: true
    },
    {
        id: 'Action',
        numeric: true,
        disablePadding: false,
        label: 'Action',
        renderCell: (params: any) => {
            const { param, navigate } = params;
            const onClick = (e: any) => {
                e.stopPropagation(); // don't select this row after clicking
                navigate(`/role/${crypto.encrypted(param.Id)}`, { replace: true });

            };

            return <TableCell key="tcaction" align='right'>
                <Tooltip title="delete">
                    <IconButton color='error'>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="edit">
                    <IconButton color='primary' onClick={onClick} >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
        },
    }

];

const RoleMasterList = () => {
    const [filterText, setFilterText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { dataArr, status, httpStatus, message } = useSelector((state: RootState) => state.roleMaster);

    useEffect(() => {
        dispatch(getAllRoles())
    }, [dispatch])

    useEffect(() => {
        if (httpStatus == '403')
            navigate('/', { state: { from: location }, replace: true });
        else if (status == sliceEnum.error)
            toast.error(message);
    }, [status, message])

    const handleEditClick = (e: any) => {
        console.log("e", e.target);
    }

    return (
        <Control.Paper>
            <Control.GridContainer>
                <Control.GridItem>
                    <Control.Input onChange={(e: any) => { setFilterText(e.target.value) }} />
                </Control.GridItem>
                <CustomTable tableName="Role List" rows={dataArr} headCells={headCells}
                    filterText={filterText} actions={true} />
            </Control.GridContainer>
        </Control.Paper>
    )
}

export default adminLayout(RoleMasterList);