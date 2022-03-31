import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        maxWidth: 'auto',
        textAlign: 'start',
    },
    text:{
        maxWidth: 'auto',
        textAlign: 'start',
        [theme.breakpoints.down('md')]: {
            fontSize: 10,
        }
    },
    rechazar:{
        maxWidth: 'auto',
        textAlign: 'start',
        [theme.breakpoints.down('md')]: {
            fontSize: 10,
        },
        color: globalColors.red
    }
}));

export default useStyles