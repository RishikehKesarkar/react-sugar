import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableSortLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { IHeadCell } from '../interface/tableHead/IHeadCell';
import { imgIcon } from '../assets/imgIcon';
import { useDispatch } from 'react-redux';
import { setaccountDetails } from '../store/reducer/accountMasterSlice';

const useStyles = makeStyles((theme) => ({
  tableHeadCell: {
    fontWeight: 'bold',
  },
  tableSortLabel: {
    fontWeight: 'bold',
  }
}));

interface TableHeadProps {
  headCells: IHeadCell[];
  actions?: boolean;
}

function DetailTableHead({ headCells, actions }: TableHeadProps) {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow key='headRow'>
        {headCells.map(({ id, numeric, label }) => (
          <TableCell key={`tblHeadcell-${id}`} align={numeric ? 'right' : 'left'} className={classes.tableHeadCell}>
            <TableSortLabel key={`tblLabel-${label}`} classes={{ root: classes.tableSortLabel }}>
              {label}
            </TableSortLabel>
          </TableCell>
        ))}
        {actions && <TableCell key="tcactions" align='right' className={classes.tableHeadCell}>Action</TableCell>}
      </TableRow>
    </TableHead>
  );
}

interface CustomTableProps {
  headCells: IHeadCell[];
  rows: any | [];
  tableActions?: {
    handleEditClick?: any;
    handleDeleteClick?: any;
    handleAddClick?: any;
    handleUndoClick?: any;
    getTableValue?: any;
  };
  actions?: boolean;
}

const DetailTable = ({ headCells, rows, tableActions, actions }: CustomTableProps) => {
  const dispatch = useDispatch();
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {tableActions?.handleAddClick && tableActions.handleAddClick()}
      <TableContainer sx={{ maxHeight: 340, maxWidth: 770 }}>
        <Table stickyHeader aria-label="sticky table">
          <DetailTableHead headCells={headCells} actions={actions} />
          <TableBody>
            {!rows || rows.length === 0 ? (
              <TableRow key="trempty">
                <TableCell key="tcempty"></TableCell>
                <TableCell key="tcnotfound" align="left">
                  <h5>No record found</h5>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row: any, rowindex: any) => (
                <TableRow hover tabIndex={-1} key={`tblRow-${rowindex}`}>
                  {headCells.map(({ id, numeric }, index) => (
                    <TableCell key={`tblCell-${index}`} align={numeric ? 'right' : 'left'}
                      style={row.detailAction === "D" ? { filter: "blur(1px)" } : {}}>
                      {row[id]}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell key={`tblActon-${row.id}`} align='right'>
                      {row.detailAction !== "D" && (
                        <>
                          {tableActions?.handleDeleteClick && tableActions.handleDeleteClick({ row })}
                          {tableActions?.handleEditClick && tableActions.handleEditClick({ row })}
                        </>
                      )}
                      {row.detailAction === "D" && (
                        <>
                          {tableActions?.handleUndoClick && tableActions.handleUndoClick({ row })}
                        </>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DetailTable;