
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
    cardContainer: {
        marginBottom: '5%',
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    status: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    enabled: {
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '2.5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: globalColors.green,
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: 25,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-around',
    },
    disabled: {
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '2.5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: globalColors.red,
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: 25,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-around',
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
    },
    img: {
        minWidth: '160px',
        maxWidth: '100%',
    },
    card: {
        borderRadius: '30px',
        textAlign: 'center',
        padding: '5px'
    },
    text: {
        fontSize: '15px',
        fontWeight: 'bold',
    }
}));

export default useStyles