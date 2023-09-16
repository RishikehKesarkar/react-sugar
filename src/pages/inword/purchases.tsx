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
import crypto from "../../common/crypto";
import { IconButton, Tooltip } from "@mui/material";
import { imgIcon } from "../../assets/imgIcon";
import Loader from "../../shared/loader";
import { getAllPurchases } from "../../service/purchase-Service";

const headCells: IHeadCell[] = [
    {
        id: 'shortName',
        numeric: false,
        label: 'short Name',
        filter: true
    },
    {
        id: 'subTotal',
        numeric: true,
        label: 'subTotal',
        filter: true
    },
    {
        id: 'netPayable',
        numeric: true,
        label: 'netPayable'
    },
]
const handleAddClick = (props: any) => {
    const { navigate } = props;
    return <Tooltip title="Add">
        <IconButton id="Add" onClick={() => { navigate(`/purchase/${crypto.encrypted(null)}`) }} color='primary' >
            <imgIcon.AddIcon />
        </IconButton>
    </Tooltip>
}
const handleEditClick = (props: any) => {
    const { row, navigate } = props;
    return <Tooltip title="edit">
        <IconButton id="edit" onClick={() => { navigate(`/purchase/${crypto.encrypted(row.purchaseId)}`) }} color='primary' >
            <imgIcon.EditIcon />
        </IconButton>
    </Tooltip>
}

const Purchases = () => {
    const [filterText, setFilterText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { purchases, message, httpStatus, status } = useSelector((state: RootState) => state.purchase);
    useEffect(() => {
        dispatch(getAllPurchases())
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
                    <CustomTable tableName="purchases" rows={purchases} headCells={headCells}
                        checkboxRequire={true} tableActions={{ handleAddClick, handleEditClick }} filterText={filterText} actions={true} />
                </Control.GridContainer>
            </Control.Paper>
        </>
    )
}

export default adminLayout(Purchases);