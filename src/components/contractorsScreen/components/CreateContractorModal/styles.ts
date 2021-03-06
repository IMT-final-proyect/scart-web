
import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../../../utils/styles/globalColors';

const { innerWidth } = window;

const useStyles = makeStyles((theme: Theme) => ({
    textInput: {
        color: globalColors.lightBlue,
        marginTop: 0,
        marginBottom: '5%'
    },
    lastTextInput: {
        color: globalColors.lightBlue,
        marginTop: 0,
        marginBottom: '10%'
    },
    modal: {
        position: 'absolute', 
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%)`,
        margin: 0,
        width: 'auto',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '1.5%',
        paddingBottom: '2.5%',
        backgroundColor: globalColors.white,
        borderRadius: 10,
        borderWidth: 1,
        [theme.breakpoints.down('xs')]: {
            minWidth: innerWidth * 0.8
        },
        [theme.breakpoints.down('lg')]: {
            paddingLeft: '2%',
            paddingRight: '2%',
            paddingTop: 0,
            paddingBottom: '1%',
        }
    },
    title: {
        marginTop: '3%',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: '2.5%'
    },
    subtitle:{
        fontSize: 15,
        marginBottom: '2.5%'
    },
    cancel: {
        padding: '2.5%',
        background: globalColors.red,
        color: globalColors.white
    },
    emptyMessage: {
        backgroundColor: globalColors.red,
        color: globalColors.white,
        paddingLeft: '5%',
        paddingRight: '5%',
        marginBottom: '10%',
        borderRadius: 10,
        borderWidth: 1,
    },
    snackbar: {
        position: 'absolute',
        top: '105%',
        left: '50%',
        width: '75%' 
    }
}));

export default useStyles