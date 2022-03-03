
import { makeStyles, Theme } from '@material-ui/core';
import { headerSize } from '../../../utils/constants';
import globalColors from '../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        flexGrow: 1,
        paddingTop: headerSize + 40,
        [theme.breakpoints.down('xs')]: {
            paddingTop: headerSize + 20
        },
    },
    cardLeft: {
        minWidth: 'auto',
        textAlign: 'center',
        cursor:'pointer'
    },
    cardRight: {
        textAlign: 'center',
        cursor:'pointer'
    },
    cardContainer: {
        marginBottom: '5%'
    },
    status: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    enabled: {
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: '2.5%',
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        borderRadius: 10,
        backgroundColor: globalColors.green,
    },
    disabled: {
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: '2.5%',
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        borderRadius: 10,
        backgroundColor: globalColors.red,
    },
    statusText:{
        color: globalColors.white,
        borderColor: globalColors.black,
        fontSize: 25,
        fontWeight: 2,
        [theme.breakpoints.down('md')]: {
            fontSize: 20,
            fontWeight: 4,
        },
    }
}));

export default useStyles