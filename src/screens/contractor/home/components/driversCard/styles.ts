import { makeStyles, Theme } from '@material-ui/core';
import { padding } from '@mui/system';
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
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  container_header: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: '1%',
    paddingTop: '1%',
    backgroundColor: "#0C4395",
  },
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '3%',
  },
  separator: {
    backgroundColor: globalColors.grey,
    height: '0.5%'
  },
  title: {
    fontSize: 25,
    color: globalColors.white
  },
  subtitle: {
    fontSize: 17,
    marginBottom: "2%",
    color: globalColors.darkGrey
  },
  number_OOR: { //Out of Rule
    fontSize: 50
  },
  number_Pending: {
    fontSize: 50
  },
  button_Pending: {
    textTransform: 'none',
    border: '2px solid #e7e7e7',
    padding: '1% 10%',
    "&:hover": {
      border: '3px solid ' + globalColors.yellow
    }
  },
  button_OOR: {
    textTransform: 'none',
    border: '2px solid #e7e7e7',
    padding: '1% 10%',
    "&:hover": {
      border: '3px solid ' + globalColors.red
    }
  },
}));

export default useStyles