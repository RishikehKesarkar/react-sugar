import { useState } from "react";
import {
    Table, TableHead, TableRow, TableCell,
    TablePagination, TableSortLabel, Theme, useTheme, OutlinedInput, Toolbar, InputAdornment,
    TableBody, IconButton, TableContainer
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { imgIcon } from "../assets/imgIcon";
import { useNavigate } from "react-router-dom";
import Control from "../components";
//import "../assets/js/table.js";

const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {
        width: 320,
        //boxShadow: theme.customShadows.z8,
    },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
    },
}));


const useStyles: any = makeStyles((theme: Theme) => ({
    table: {
        marginTop: useTheme().spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: '#46627c', //useTheme().palette.primary.main,
            backgroundColor: '#ebebeb' //useTheme().palette.primary.light,
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
    },
}))

export default function TableView(props: any) {
    //records: any, headCells: any
    const { rowData, columnDefs, checkboxOnchange,filter } = props;
    const navigate = useNavigate();
    const classes = useStyles();
    const [search, setSearch] = useState("");
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState<any>();
    const [orderBy, setOrderBy] = useState<any>();

    // Search
    const TxtSearch = (props: any) => {
        return (
            <StyledRoot
                sx={{
                    color: 'primary.main',
                    bgcolor: 'primary.lighter',
                }}
            >
                {/* <StyledSearch
                    key="search"
                    id="search"
                    onBlur={() => { console.log("blur") }}
                    autoFocus={autoFocus}
                    value={search}
                    onChange={(e: any) => { setSearch(e.target.value) }}
                    placeholder="Search user..."
                    startAdornment={
                        <InputAdornment position="start">
                            
                        </InputAdornment>
                    }
                /> */}
                <Control.Input id="search" value={search} key="searchField" autoFocus
                    onChange={(e: any) => { setSearch(e.target.value) }} />
            </StyledRoot>
        )
    }


    // Return Table Head
    const TblHead = (props: any) => {
        try {
            const handleSortRequest = (cellId: any) => {
                const isAsc = orderBy === cellId && order === "asc";
                setOrder(isAsc ? 'desc' : 'asc');
                setOrderBy(cellId)
            }

            return (<TableHead>
                <TableRow>
                    {
                        columnDefs.map((headCell: any) => (

                            <TableCell key={headCell.field}
                                sortDirection={orderBy === headCell.field ? order : false}>
                                {headCell.field == "Select" ?
                                    <Control.CheckBox name="checkAll" id="checkAll" checked={!rowData.some((row: any) => row?.isChecked !== true)}
                                        onChange={checkboxOnchange} /> :
                                    headCell.disableSorting ? headCell.headerName :
                                        <TableSortLabel
                                            active={orderBy === headCell.field}
                                            direction={orderBy === headCell.field ? order : 'asc'}
                                            onClick={() => { handleSortRequest(headCell.field) }}>
                                            {headCell.headerName}
                                        </TableSortLabel>
                                }
                            </TableCell>))
                    }
                </TableRow>
            </TableHead>)
        }
        catch (err) {
            console.log(err);
            return (<h2>not found</h2>);
        }
    }

    const TblBody = (props: any) => {
        try {
            return (
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().length == 0 ?
                            <TableRow>
                                <TableCell> No record found</TableCell>
                            </TableRow> :
                            recordsAfterPagingAndSorting().map((item: any) => (
                                <TableRow key={item.Id}>
                                    {
                                        columnDefs.map((cell: any, index: any) => {
                                            const value = item[cell.field];
                                            //console.log("item",item);
                                            if (cell.field == "Select") {
                                                return (
                                                    <TableCell key={index} padding="checkbox"><Control.CheckBox id={item.Id.toString()} checked={item.isChecked} onChange={checkboxOnchange} /></TableCell>
                                                )
                                            }
                                            if (!cell.disableSorting) {
                                                return (
                                                    <TableCell key={index}>{value}</TableCell>
                                                )
                                            }
                                            else {
                                                if (item.Id > 0) {
                                                    return (
                                                        <TableCell key={index}>
                                                            <IconButton color='error'>
                                                                <imgIcon.DeleteIcon />
                                                            </IconButton>
                                                            <IconButton color='primary' onClick={() => navigate(`/factory/form/${item.Id}`)}>
                                                                <imgIcon.EditIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    )
                                                }
                                            }
                                        })
                                    }
                                </TableRow>
                            ))
                    }
                </TableBody>
            )
        }
        catch (err) {
            console.log(err);
            return (<h2>not found</h2>);
        }

    }

    // Change Page
    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    }

    // Handle No. Of Records
    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }

    // Pagination
    const TblPagination = () => {
        return (
            <TablePagination
                rowsPerPageOptions={pages}
                component="div"
                count={rowData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        )
    }

    // sorting mechanism
    function stableSort(array: [], comparator: any) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order: any, orderBy: any) {
        return order === 'desc'
            ? (a: [], b: []) => descendingComparator(a, b, orderBy)
            : (a: [], b: []) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a: [], b: [], orderBy: any) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    // End Sorting mechanism

    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterRecord(rowData), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }

    // Filter Data.
    const isNull = (val: any) => {
        return (val == null || val == undefined || val == "") ? "N/A" : val;
    }
    const filterRecord = (items: any) => {
        try {
            const lowercasedValue = filter.toLowerCase();
            if (lowercasedValue == "") {
                return items;
            }
            else {
                const filteredData = items.filter((item: any) => {
                    return columnDefs.filter((f: any) => f.filter != false).some((key: any) =>
                        isNull(item[key.field]).toString().toLowerCase().includes(lowercasedValue));
                });                       
                return filteredData;
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {/* <TxtSearch /> */}
            <TableContainer>
                <Table className={classes.table} >
                    <TblHead />
                    <TblBody />
                </Table>
            </TableContainer>
            <TblPagination />
        </>
    )
}