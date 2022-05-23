import { makeStyles, Theme } from '@material-ui/core/styles';
import globalColors from '../../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
  entityName: {
    fontSize: 20,
    marginTop: '2.5%',
    fontWeight: 'bold',
    marginBottom: '2.5%'
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
  invalidText:{
    marginTop: '1.5%',
    marginBottom: '1.5%'
  },
}));

export default useStyles;
