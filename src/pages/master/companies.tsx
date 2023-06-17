import adminLayout from "../../masterLayout/adminLayout";
import CustomTable from "../../common/CustomTable";
import { useState, useEffect } from "react";
import Control from "../../components";
import { IHeadCell } from "../../interface/tableHead/IHeadCell";
import { getAllCompanys } from "../../service/companyMaster-Service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { sliceEnum } from "../../common/enum/Enum";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { editClickProps } from "../../interface/props/IhandleClikProps";
import crypto from "../../common/crypto";
import { IconButton, Tooltip } from "@mui/material";
import { imgIcon } from "../../assets/imgIcon";


const headCells: IHeadCell[] = [
    {
        id: 'Id',
        numeric: true,
        disablePadding: true,
        hidden: true,
        label: 'id'
    },
    {
        id: 'companyName',
        numeric: false,
        disablePadding: false,
        label: 'company Name',
    },
    {
        id: 'shortName',
        numeric: false,
        disablePadding: false,
        label: 'short Name',
        filter: true
    }
];

const handleEditClick = (props: editClickProps) => {
    const { row, navigate } = props;
    const handleEditClick = () => {
        navigate(`/company/${crypto.encrypted(row.Id)}`);
    }
    return <Tooltip title="edit">
        <IconButton id="edit" onClick={handleEditClick} color='primary' >
            <imgIcon.EditIcon />
        </IconButton>
    </Tooltip>
}
const handleAddClick = (props: any) => {
    const { navigate } = props;
    const handleAddClick = () => {
        navigate(`/company/${crypto.encrypted(null)}`);
    }
    return <Tooltip title="Add">
        <IconButton id="Add" onClick={handleAddClick} color='primary' >
            <imgIcon.AddIcon />
        </IconButton>
    </Tooltip>
}

const Companies = () => {
    const [filterText, setFilterText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { dataArr, status, httpStatus, message } = useSelector((state: RootState) => state.companyMaster);

    useEffect(() => {
        dispatch(getAllCompanys())
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
                <CustomTable tableName="Companys" tableActions={{ handleEditClick, handleAddClick }} rows={dataArr} headCells={headCells}
                    checkboxRequire={true} filterText={filterText} actions={true} />
            </Control.GridContainer>
        </Control.Paper>
    )
}

export default adminLayout(Companies);