import adminLayout from "../../masterLayout/adminLayout";
import CustomTable from "../../common/CustomTable";
import { useState, useEffect } from "react";
import Control from "../../components";
import { IHeadCell } from "../../interface/tableHead/IHeadCell";
import { getAllCities } from "../../service/cityMaster-Service";
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

const headCells: IHeadCell[] = [
    {
        id: 'cityId',
        numeric: true,
        disablePadding: true,
        hidden: true,
        label: 'id'
    },
    {
        id: 'cityName',
        numeric: false,
        label: 'City Name',
        filter: true
    },
    {
        id: 'stateName',
        numeric: false,
        label: 'State Name',
        filter: true
    },
    {
        id: 'pinCode',
        numeric: true,
        label: 'PinCode'
    },

]

const handleAddClick = (props: any) => {
    const { navigate } = props;
    const handleAddClick = () => {
        navigate(`/city/${crypto.encrypted(null)}`);
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
        navigate(`/city/${crypto.encrypted(row.cityId)}`);
    }
    return <Tooltip title="edit">
        <IconButton id="edit" onClick={handleEditClick} color='primary' >
            <imgIcon.EditIcon />
        </IconButton>
    </Tooltip>
}

const CityMasterList = () => {
    const [filterText, setFilterText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { cities, message, httpStatus, status } = useSelector((state: RootState) => state.City);
    useEffect(() => {
        dispatch(getAllCities())
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
                    <CustomTable tableName="Cities" rows={cities} headCells={headCells}
                        checkboxRequire={true} tableActions={{ handleAddClick, handleEditClick }} filterText={filterText} actions={true} />
                </Control.GridContainer>
            </Control.Paper>
        </>
    )
}

export default adminLayout(CityMasterList);