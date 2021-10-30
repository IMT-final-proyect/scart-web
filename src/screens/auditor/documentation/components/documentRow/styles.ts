import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        textAlign: 'start',
        alignItems: 'center'
    },
    text:{
        maxWidth: 'auto',
        textAlign: 'start',
        [theme.breakpoints.down('lg')]: {
            fontSize: 14,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 11,
        },
    },
    state:{
        maxWidth: 'auto',
        textAlign: 'start',
        [theme.breakpoints.down('lg')]: {
            fontSize: 11,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 7,
        },
    },
    button:{
        height: '35px',
        color: globalColors.lightBlue
    },
}));

export default useStyles