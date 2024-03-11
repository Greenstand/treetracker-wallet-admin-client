import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import TrustRelationshipTable from './TrustRelationshipTable';
import { getTrustRelationships } from '../../api/trust_relationships';

import AuthContext from '../../store/auth-context';
import {useTrustRelationshipsContext} from '../../store/TrustRelationshipsContext';
import Message from '../../components/UI/components/Message/Message';

function TrustRelationship() {
  // get data from context
  const { pagination, setIsLoading, prepareRows } =
  useTrustRelationshipsContext();
  // error
  const [message, setMessage] = useState('');
  // data to be displayed in the table
  const [tableRows, setTableRows] = useState([]);


  // total rows count for pagination
  const [totalRowCount, setTotalRowCount] = useState(null);

  const authContext = useContext(AuthContext);


  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        const data = await getTrustRelationships(authContext.token, {pagination});

        const preparedRows = prepareRows(await data.trust_relationships);
        setTableRows(preparedRows);
        setTotalRowCount(data.total);
        
      } catch (error) {
        console.error(error);
        setMessage('An error occurred while fetching the table data');
      }finally {
        setIsLoading(false);
       }
    };
    loadData();
  }, [pagination]);

  return (
    <div
      style={{
        marginTop: '5rem',
        marginLeft: '1rem',
        display: 'flex',
        flexDirection: 'column',
        marginRight: '1rem',
        width: '100%',
      }}
    >
      {message && <Message message={message} onClose={() => setMessage('')} />}
      <Grid container direction="column" sx={{ flexGrow: '1' }}>
        <TrustRelationshipTable
        tableTitle={'Trust Relationship'}
        tableRows={tableRows}
        totalRowCount={totalRowCount}
        />
      </Grid>
    </div>
  );
}

export default TrustRelationship;
