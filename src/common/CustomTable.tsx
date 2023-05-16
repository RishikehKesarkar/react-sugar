import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { IHeadCell } from '../interface/tableHead/IHeadCell';
import { useNavigate } from 'react-router-dom';
import DialogBox from './dialogBox';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const DEFAULT_ORDER = 'asc';
//const DEFAULT_ORDER_BY = 'calories';
const DEFAULT_ROWS_PER_PAGE = 5;

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, newOrderBy: any) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    checkboxRequire?: boolean;
    headCells: IHeadCell[];
    actions?: boolean
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount,
        onRequestSort, checkboxRequire, headCells, actions } = props;

    const createSortHandler = (newOrderBy: keyof any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, newOrderBy);
    };

    return (
        <TableHead>
            <TableRow>
                {
                    checkboxRequire ? <TableCell padding="checkbox" key="tcheadcheckbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell> : null
                }
                {headCells.map((headCell) => (
                    <TableCell hidden={headCell.hidden}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        // padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                {
                    actions ? <TableCell key="tcactions" align='right'>Action</TableCell> : null
                }
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
    tableName: string,
    ToolBarActions?: { handleAddClick?: any }
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, tableName, ToolBarActions } = props;
    const navigate = useNavigate();

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    <h2>{tableName}</h2>
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                ToolBarActions?.handleAddClick ?
                    <>
                        {ToolBarActions?.handleAddClick({ navigate })}
                    </> : null
            )}
        </Toolbar>
    );
}

interface CustomTableProps {
    headCells: IHeadCell[],
    rows: any,
    tableName: string,
    checkboxRequire?: boolean,
    filterText?: string | any,
    actions?: boolean,
    outTableValueState?: any,
    tableActions?: { handleEditClick?: any, handleDeleteClick?: any, handleAddClick?: any, getTableValue?: any }
}

function CustomTable(props: CustomTableProps) {
    const { rows, headCells, checkboxRequire, filterText, actions,
        tableName, tableActions } = props;
    const [order, setOrder] = React.useState<Order>(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = React.useState<any>(DEFAULT_ORDER);
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [visibleRows, setVisibleRows] = React.useState<any[] | null>(null);
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [paddingHeight, setPaddingHeight] = React.useState(0);
    const navigate = useNavigate();

    React.useMemo(() => {
        let newSelected: string[] = [];
        rows.map((row: any) => {
            const selectedIndex = selected.indexOf(row.Id);
            if (row.selected) {
                if (selectedIndex === -1) {
                    newSelected = newSelected.concat(selected, row.Id);
                } else if (selectedIndex === 0) {
                    newSelected = newSelected.concat(selected.slice(1));
                } else if (selectedIndex === selected.length - 1) {
                    newSelected = newSelected.concat(selected.slice(0, -1));
                } else if (selectedIndex > 0) {
                    newSelected = newSelected.concat(
                        selected.slice(0, selectedIndex),
                        selected.slice(selectedIndex + 1),
                    );
                }
            }
        })
        setSelected(newSelected);
    }, [rows])

    React.useEffect(() => {
        let rowsOnMount = stableSort(
            rows,
            getComparator(DEFAULT_ORDER, DEFAULT_ORDER),
        );
        rowsOnMount = rowsOnMount.slice(
            0 * DEFAULT_ROWS_PER_PAGE,
            0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
        );

        setVisibleRows(rowsOnMount);
    }, []);

    const handleRequestSort = React.useCallback(
        (event: React.MouseEvent<unknown>, newOrderBy: keyof any) => {
            const isAsc = orderBy === newOrderBy && order === 'asc';
            const toggledOrder = isAsc ? 'desc' : 'asc';
            setOrder(toggledOrder);
            setOrderBy(newOrderBy);

            const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));
            const updatedRows = sortedRows.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            );
            setVisibleRows(updatedRows);
        },
        [order, orderBy, page, rowsPerPage],
    );

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n: any) => n.Id);
            setSelected(newSelected);
            if (tableActions?.getTableValue) tableActions?.getTableValue(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
        if (tableActions?.getTableValue) tableActions?.getTableValue(newSelected);

    };

    const handleChangePage = React.useCallback(
        (event: unknown, newPage: number) => {
            setPage(newPage);

            const sortedRows = stableSort(rows, getComparator(order, orderBy));
            const updatedRows = sortedRows.slice(
                newPage * rowsPerPage,
                newPage * rowsPerPage + rowsPerPage,
            );
            setVisibleRows(updatedRows);

            // Avoid a layout jump when reaching the last page with empty rows.
            const numEmptyRows =
                newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

            const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
            setPaddingHeight(newPaddingHeight);
        },
        [order, orderBy, dense, rowsPerPage],
    );

    const handleChangeRowsPerPage = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const updatedRowsPerPage = parseInt(event.target.value, 10);
            setRowsPerPage(updatedRowsPerPage);

            setPage(0);

            const sortedRows = stableSort(rows, getComparator(order, orderBy));
            const updatedRows = sortedRows.slice(
                0 * updatedRowsPerPage,
                0 * updatedRowsPerPage + updatedRowsPerPage,
            );
            setVisibleRows(updatedRows);

            // There is no layout jump to handle on the first page.
            setPaddingHeight(0);
        },
        [order, orderBy],
    );

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterRecord(), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }

    const isNull = (val: any) => {
        return (val == null || val == undefined || val == "") ? "N/A" : val;
    }

    const filterRecord = () => {
        try {
            const lowercasedValue = filterText == undefined ? "" : filterText.toLowerCase();
            if (lowercasedValue == "") {
                return rows;
            }
            else {
                const filteredData = rows.filter((row: any) => {
                    return headCells.filter((f) => f.filter == true).some((key: any) =>
                        isNull(row[key.id]).toString().toLowerCase().includes(lowercasedValue));
                });
                return filteredData;
            }
        }
        catch (err) {
            console.log("err", err);
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} tableName={tableName}
                    ToolBarActions={tableActions} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            checkboxRequire={checkboxRequire}
                            headCells={headCells}
                            actions={actions}
                        />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().length == 0 ?
                                    <TableRow key="trempty">
                                        <TableCell key="tcempty"></TableCell>
                                        <TableCell key="tcnotfound" align="left"> <h3>No record found</h3></TableCell>
                                    </TableRow> :
                                    recordsAfterPagingAndSorting().map((row: any, index) => {
                                        const isItemSelected = isSelected(row.Id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                //onClick={(event) => handleClick(event, row.Id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.Id}
                                                selected={isItemSelected}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                {
                                                    checkboxRequire ? <TableCell key="tcCkeck" padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            onClick={(event) => handleClick(event, row.Id)}
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                        : null
                                                }
                                                {
                                                    headCells.map((cell, index: any) => {
                                                        const value = row[cell.id];
                                                        return <TableCell hidden={cell.hidden} key={index} align={cell.numeric ? 'right' : 'left'}>{value}</TableCell>

                                                    })
                                                }
                                                {
                                                    actions ? <TableCell key="tcaction" align='right'>
                                                        {tableActions?.handleDeleteClick ? tableActions?.handleDeleteClick({ row, navigate }) : null}
                                                        {tableActions?.handleEditClick ? tableActions?.handleEditClick({ row, navigate }) : null}
                                                    </TableCell> : null
                                                }

                                            </TableRow>
                                        );
                                    })
                            }
                            {paddingHeight > 0 && (
                                <TableRow
                                    style={{
                                        height: paddingHeight,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}

export default CustomTable;