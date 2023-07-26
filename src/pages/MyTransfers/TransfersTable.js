import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';


const TableHeader = ({ tableTitle }) => {
  return (
    <Grid item sx={{ paddingBottom: '15px' }}>
      <Typography variant={'h4'}>
        {tableTitle}
      </Typography>
    </Grid>

  );
};


const TransfersTable = ({ tableTitle, tableColumns }) => {
  return (<Grid container direction={'column'}>
    <TableHeader tableTitle={tableTitle} />
    {/*<Grid>*/}
    {/*  <Paper elevation={3} sx={{ height: '400px', width: '1000px' }}>*/}
    {/*    */}
    {/*  </Paper>*/}
    {/*</Grid>*/}
    <TableContainer component={Paper} sx={{ height: '400px', width: '1000px' }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {tableColumns.map((column, id) => {
              return (
                <TableCell key={`${id}-${column.description}`}
                           sx={{ fontSize: '14px' }}>{column.description}</TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>

        </TableBody>
      </Table>
    </TableContainer>
  </Grid>);
};

export default TransfersTable;