import { Grid } from '@mui/material';
import TrustRelationshipTable from './TrustRelationshipTable';
import { useTrustRelationshipsContext } from '../../store/TrustRelationshipsContext';
import Message from '../../components/UI/components/Message/Message';

function TrustRelationship() {
  // get data from context
  const { message, tableRows, totalRowCount, setMessage } =
  useTrustRelationshipsContext();
 

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
