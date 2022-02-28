
import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    box:{
        backgroundColor: globalColors.darkBlue,
        width: "10px",
        height: "auto",
        marginRight: '10px'
    }
}));

export default useStyles