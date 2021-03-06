import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../../../utils/styles/globalColors';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
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
    severity:{
        maxWidth: 'auto',
        textAlign: 'start',
        [theme.breakpoints.down('sm')]: {
            fontSize: 11,
        },
    },
    button:{
        height: '35px',
        color: globalColors.lightBlue
    },
}));

export default useStyles