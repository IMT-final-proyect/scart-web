import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../../../../utils/styles/globalColors';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
    container:{
        textAlign: 'start',
        alignItems: 'center',
        paddingLeft: '0.5%',
        borderRadius: 5
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
    button:{
        height: '35px',
        color: globalColors.lightBlue,
        textTransform: 'none',
        fontSize: 12
    },
    stateColor: {
        borderRadius: 20,
        fontWeight: 'bold',
        marginLeft: '5%',
        paddingLeft: '8%',
        paddingRight: '8%',
        paddingTop: '2%',
        paddingBottom: '2%'
    },
}));

export default useStyles