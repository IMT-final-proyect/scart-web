import { makeStyles, Theme } from '@material-ui/core/styles';
import globalColors from '../../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  entityTitle: {
    fontSize: 22,
    textDecoration: 'underline',
    [theme.breakpoints.down('sm')]: {
        fontSize: 18,
    },
  },
  entityName: {
    fontSize: 20,
    marginTop: '2.5%',
    fontWeight: 'bold',
    marginBottom: '2.5%'
  },
  areValidDiv: {
    textAlign:'center'
  },
  areValidText:{
    color: globalColors.darkGrey,
    fontSize: 15,
  },
  titleContainer:{
    justifyContent: 'space-between',
  },
  fileTitle:{
    color: globalColors.darkGrey,
    textAlign: 'start',
    fontSize: 15,
    [theme.breakpoints.down('md')]: {
        fontSize: 12,
    },
  },
  stateColor: {
    borderRadius: 20,
    textAlign: 'center',
    paddingTop: '2%',
    paddingBottom: '2%'
  },
  stateText: {
      marginLeft: '1.5%',
      color: globalColors.white,
      fontSize: 13,
      [theme.breakpoints.down('md')]: {
          fontSize: 12,
      },
  },
  filesCard: {
    paddingTop: '2.5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '2.5%',
    [theme.breakpoints.down('sm')]: {
        marginLeft: '2.5%',
        marginRight: '2.5%',
    },
  },
  invalidText:{
    marginTop: '1.5%',
    marginBottom: '1.5%'
  },
  textCenter: {
    textAlign: 'center',
    marginTop: '2%'
  }
}));

export default useStyles;
