import { makeStyles, Theme } from '@material-ui/core/styles';
import globalColors from '../../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
  areValidDiv: {
    textAlign:'center'
  },
  areValidText:{
    color: globalColors.darkGrey,
    fontSize: 15,
  }
}));

export default useStyles;
