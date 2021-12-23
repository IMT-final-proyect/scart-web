import { makeStyles, Theme } from '@material-ui/core';
import { headerSize } from '../../../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        flexGrow: 1,
        marginTop: headerSize + 40
    }
}));

export default useStyles