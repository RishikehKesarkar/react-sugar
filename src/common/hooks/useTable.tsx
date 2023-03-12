import { useState, useRef, useEffect } from "react";
import {
    Table, TableHead, TableRow, TableCell,
    TablePagination, TableSortLabel, Theme, useTheme, OutlinedInput, Toolbar, InputAdornment, TextField
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

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
            color: useTheme().palette.primary.main,
            backgroundColor: useTheme().palette.primary.light,
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

export default function useTable(records: any, headCells: any) {
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
                <StyledSearch
                    key="search"
                    autoFocus={true}
                    value={search}
                    onChange={(e: any) => { setSearch(e.target.value) }}
                    placeholder="Search user..."
                    startAdornment={
                        <InputAdornment position="start">
                            {/* <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} /> */}
                        </InputAdornment>
                    }
                />
            </StyledRoot>
        )
    }

    // Return Table
    const TblTable = (props: any) => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

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
                        headCells.map((headCell: any) => (
                            <TableCell key={headCell.id}
                                sortDirection={orderBy === headCell.id ? order : false}>
                                {headCell.disableSorting ? headCell.label :
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id ? order : 'asc'}
                                        onClick={() => { handleSortRequest(headCell.id) }}>
                                        {headCell.label}
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
                count={records.length}
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
        return stableSort(filterRecord(records), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }

    // Filter Data.
    const isNull = (val: any) => {
        return (val == null || val == undefined || val == "") ? "N/A" : val;
    }
    const filterRecord = (items: any) => {
        try {
            const lowercasedValue = search.toLowerCase();
            if (lowercasedValue == "") {
                return items;
            }
            else {
                const filteredData = items.filter((item: any) => {
                    return headCells.filter((f: any) => f.filter != false).some((key: any) =>
                        isNull(item[key.id]).toString().toLowerCase().includes(lowercasedValue));

                    // return Object.keys(item).some(key =>
                    //     item[key].toString().toLowerCase().includes(lowercasedValue)
                    // );
                });
                // return items.filter((x: any) => x.factoryName.toLowerCase().includes(lowercasedValue))                       
                return filteredData;
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return {
        TblTable, TblHead, TblPagination, recordsAfterPagingAndSorting, TxtSearch, setSearch
    }
}