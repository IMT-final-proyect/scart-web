import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    cardContainer:{
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginTop: '60px',
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        paddingBottom: '2%',
        paddingTop: '2%',
    },
    dataContainer:{
        textAlign: 'start',
        marginBottom: '1.5%'
    },
    dataField:{
        marginBottom: '10%',
        fontSize: 16,
        color: globalColors.darkGrey
    },
    data:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    image:{
        borderRadius: '50%',
        height: 100,
        alignSelf: 'center',
        [theme.breakpoints.down('md')]: {
            marginTop: '50%',
            height: 80,
          },
    },
    titleContainer:{
        justifyContent: 'space-between',

    },
    headerText:{
        marginBottom: '2%',
        color: globalColors.darkGrey,
        fontSize: 12,
    },
    rightCard:{
        marginTop: '2.5%',
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        paddingBottom: '2.5%',
        [theme.breakpoints.up('xs')]: {
            marginRight: '2.5%',
            marginLeft: '2.5%',
        },
    },
    textTitle:{
        fontSize:20,
        marginTop: '3%',
        marginBottom: '3%',
        marginLeft: '3%',
    },
    circleIcon:{
        marginTop: '3%',
        marginBottom: '3%',
        marginRight: '3%',
    },
    button:{
        height: '35px',
        textTransform: 'none',
    },
    qrButton:{
        textTransform: 'none',
    },
    textCenter: {
        textAlign: 'center',
        marginTop: '2%'
    },
    spinner: {
        marginTop: '20%',
        color: globalColors.lightBlue
    },
    snackbar: {
        width: '75%',
    },
    qrModal: {
        position: 'absolute', 
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%)`,
    }
}));

export default useStyles