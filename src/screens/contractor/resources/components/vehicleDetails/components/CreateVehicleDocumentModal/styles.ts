
import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../../../../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    textInput: {
        color: globalColors.lightBlue,
        marginTop: '2.5%',
        marginBottom: '2.5%'
    },
    datePicker: {
        marginBottom: '15%',
        marginTop: '5%'
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
    },
    title: {
        marginTop: '3%',
        fontSize: 25,
        fontWeight: 'bold',
    },
    subtitle: {
        marginTop: '3%',
        fontSize: 20,
        marginBottom: '5%'
    },
    cancel: {
        padding: '2.5%',
        background: globalColors.red,
        color: globalColors.white
    },
    upload: {
        padding: '2.5%',
        background: globalColors.green,
        color: globalColors.white,
        marginBottom: '2.5%'
    },
    filesUploaded: {
        marginBottom: '15%'
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