import { makeStyles, Theme } from '@material-ui/core';
import { headerSize } from '../../../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: headerSize + 50,
    },
}));

export default useStyles;