import { makeStyles, Theme } from '@material-ui/core';
import colors from '../../../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
  card:{
    flex: 3,
    marginTop: '65px',
    marginInline: '10%',
    display: 'flex',
    height: '100%'
  },
  counterContainer:{
    display: 'flex',
    flex: 3,
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    textAlign: 'center',
  },
  chartContainer:{
    flex: 3,
    justifyContent: 'center',
    textAlign: 'center',
    margin:'auto',
  },
  img:{
    width: 120,
  },
  counter:{
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: '15%',
    paddingBottom: '15%',
  },
  counterText:{
    color: colors.white,
  },
  details:{
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: '10%',
    paddingBottom: '10%',
  },
  detailsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  } 
}));

export default useStyles