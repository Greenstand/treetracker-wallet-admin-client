import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import TransfersTable from './TransfersTable';
// import mockData from '../../mock_data.json';
import Message from '../../components/UI/components/Message/Message';
import { getTransfers } from '../../api/transfers';
import { useTransfersContext } from '../../store/TransfersContext';
// import { formatWithCommas, getDateText } from '../../utils/formatting';

// const statuses = ['Completed', 'Pending', 'Failed'];

// const newData = mockData.map(x => {
//   return {
//     ...x,
//     status: statuses[Math.floor(Math.random() * 3)],
//   };
// });

/**@function
 * @name MyTransfers
 * @description Renders the My Transfers page
 *
 * @returns {JSX.Element} - My Transfers page component
 * */
const MyTransfers = () => {
  // get data from context
  const { pagination, filter, setIsLoading, prepareRows } = useTransfersContext();
  // error
  const [message, setMessage] = useState('');
  // data to be displayed in the table
  const [tableRows, setTableRows] = useState([]);
  // total rows count for pagination
  const [totalRowCount, setTotalRowCount] = useState(null);


  // load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await getTransfers({ pagination, filter });
        const preparedRows = prepareRows(await data.transfers);

        setTableRows(preparedRows);
        setTotalRowCount(data.count);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setMessage('An error occurred while fetching the table data');
      }
    };
    loadData();
  }, [pagination, filter]);


  return (
    <div style={{ marginTop: '5rem', marginLeft: '1rem' }}>
      {message && (
        <Message
          message={message}
          onClose={() => setMessage('')}
        />
      )}
      <Grid container direction='column'>
        <TransfersTable
          tableTitle={'My Transfers'}
          tableRows={tableRows}
          totalRowCount={totalRowCount}
        />
      </Grid>
    </div>);
};

export default MyTransfers;
