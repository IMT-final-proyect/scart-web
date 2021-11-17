import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
  card:{
    flex: 3,
    display: 'column',
    flexDirection: 'row',
    marginTop: '65px',
    marginInline: '10%',
    paddingBottom: '1%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '3%'
  },
  separator: {
    backgroundColor: globalColors.grey,
    height: '0.5%'
  },
  title: {
    fontSize: 25
  },
  subtitle: {
    fontSize: 17
  },
  number: {
    fontSize: 50
  },
  button: {
    textTransform: 'none'
  }
}));

export default useStyles