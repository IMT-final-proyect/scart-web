
import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../../../../utils/styles/globalColors';

const { innerWidth, innerHeight } = window;

const useStyles = makeStyles((theme: Theme) => ({
    textInput: {
        color: globalColors.lightBlue,
        marginTop: '2.5%',
        marginBottom: '5%',
        width: '90%',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '50%'
        },
    },
    lastTextInput: {
        width: '90%',
        color: globalColors.lightBlue,
    },
    inputsContainer: {
        marginBottom: '0.5%',
        marginTop: '2.5%',
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
        paddingBottom: '1%',
        backgroundColor: globalColors.white,
        borderRadius: 10,
        borderWidth: 1,
        maxHeight: innerHeight,
        [theme.breakpoints.down('xs')]: {
            minWidth: innerWidth * 0.8
        },
    },
    title: {
        marginTop: '3%',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: '2.5%',
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
    },
    passwords: {
        marginBottom: '10%'
    },
    checkbox: {
        justifyContent: 'start',
        marginTop: '5%',
        marginBottom: '2%'
    }
}));

export default useStyles