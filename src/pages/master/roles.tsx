import adminLayout from "../../masterLayout/adminLayout";
import CustomTable from "../../shared/CustomTable";
import { useState, useEffect } from "react";
import Control from "../../components";
import { IHeadCell } from "../../interface/tableHead/IHeadCell";
import { deleteRole, getAllRoles } from "../../service/roleMaster-Service";
import { useDispatch, useSelector } from "react-redux";
import { RootState, dispatch } from "../../store/store";
import { sliceEnum } from "../../common/enum/Enum";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import crypto from "../../common/crypto";
import { editClickProps, deleteClickProps, addClickProps } from "../../interface/props/IhandleClikProps";
import DialogBox from "../../shared/dialogBox";

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

];

const handleEditClick = (props: editClickProps) => {
    const { row, navigate } = props;
    const handleEditClick = () => {
        navigate(`/role/${crypto.encrypted(row.Id)}`);
    }
    return <Tooltip title="edit">
        <IconButton id="edit" onClick={handleEditClick} color='primary' >
            <EditIcon />
        </IconButton>
    </Tooltip>
}
const handleAddClick = (props: any) => {
    const { navigate } = props;
    const handleAddClick = () => {
        navigate(`/role/${crypto.encrypted(null)}`);
    }
    return <Tooltip title="Add">
        <IconButton id="Add" onClick={handleAddClick} color='primary' >
            <AddIcon />
        </IconButton>
    </Tooltip>
}

const Roles = () => {
    const [filterText, setFilterText] = useState("");
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', isLoading: false, onConfirm: () => { } })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { dataArr, status, httpStatus, message } = useSelector((state: RootState) => state.roleMaster);

    const handleDeleteClick = (props: deleteClickProps) => {
        const { row, navigate } = props;
        const onConfirm = () => {
            setConfirmDialog({ isOpen: true, isLoading: true, title: 'are you sure want to delete this?', subTitle: 'not able to recover', onConfirm })
            dispatch(deleteRole(row.Id));
        }
        const handleDeleteClick = () => {
            setConfirmDialog({ isOpen: true, isLoading: false, title: 'are you sure want to delete this?', subTitle: 'not able to recover', onConfirm })
        }
        return <Tooltip title="delete">
            <IconButton id="delete" onClick={handleDeleteClick} color='error' >
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    }

    useEffect(() => {
        dispatch(getAllRoles())
    }, [dispatch])

    useEffect(() => {
        if (httpStatus == '403')
            navigate('/', { state: { from: location }, replace: true });
        else if (status == sliceEnum.error)
            toast.error(message);
    }, [status, message])

    return (
        <Control.Paper>
            <Control.GridContainer>
                <Control.GridItem>
                    <Control.Input onChange={(e: any) => { setFilterText(e.target.value) }} />
                </Control.GridItem>
                <CustomTable tableName="Role List" rows={dataArr} headCells={headCells}
                    filterText={filterText} tableActions={{ handleEditClick, handleDeleteClick, handleAddClick }} actions={true} />
            </Control.GridContainer>
            <DialogBox confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
        </Control.Paper>
    )
}

export default adminLayout(Roles);