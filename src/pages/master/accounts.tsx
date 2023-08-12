import adminLayout from "../../masterLayout/adminLayout";
import CustomTable from "../../shared/CustomTable";
import { useState, useEffect } from "react";
import Control from "../../components";
import { IHeadCell } from "../../interface/tableHead/IHeadCell";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { sliceEnum } from "../../common/enum/Enum";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { editClickProps } from "../../interface/props/IhandleClikProps";
import crypto from "../../common/crypto";
import { IconButton, Tooltip } from "@mui/material";
import { imgIcon } from "../../assets/imgIcon";
import Loader from "../../shared/loader";
import { getAllAccounts } from "../../service/accountMaster-Service";

const headCells: IHeadCell[] = [
    {
        id: 'shortName',
        numeric: false,
        label: 'short Name',
        filter: true
    },
    {
        id: 'accountAddress',
        numeric: false,
        label: 'Address',
        filter: true
    },
    {
        id: 'accountName',
        numeric: false,
        label: 'Account Name'
    },
]

const handleAddClick = (props: any) => {
    const { navigate } = props;
    const handleAddClick = () => {
        navigate(`/account/${crypto.encrypted(null)}`);
    }
    return <Tooltip title="Add">
        <IconButton id="Add" onClick={handleAddClick} color='primary' >
            <imgIcon.AddIcon />
        </IconButton>
    </Tooltip>
}
const handleEditClick = (props: editClickProps) => {
    const { row, navigate } = props;
    const handleEditClick = () => {
        navigate(`/account/${crypto.encrypted(row.accountId)}`);
    }
    return <Tooltip title="edit">
        <IconButton id="edit" onClick={handleEditClick} color='primary' >
            <imgIcon.EditIcon />
        </IconButton>
    </Tooltip>
}

const Accounts = () => {
    const [filterText, setFilterText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { accounts, message, httpStatus, status } = useSelector((state: RootState) => state.account);
    useEffect(() => {
        dispatch(getAllAccounts())
    }, [dispatch])

    useEffect(() => {
        if (httpStatus == '403')
            navigate('/', { state: { from: location }, replace: true });
        else if (status == sliceEnum.error)
            toast.error(message);
    }, [status, message])

    return (
        <>
            <Loader isLoading={status} />
            <Control.Paper>
                <Control.GridContainer>
                    <Control.GridItem>
                        <Control.Input onChange={(e: any) => { setFilterText(e.target.value) }} />
                    </Control.GridItem>
                    <Control.GridItem></Control.GridItem>
                    <CustomTable tableName="accounts" rows={accounts} headCells={headCells}
                        checkboxRequire={true} tableActions={{ handleAddClick, handleEditClick }} filterText={filterText} actions={true} />
                </Control.GridContainer>
            </Control.Paper>
        </>
    )
}

export default adminLayout(Accounts);