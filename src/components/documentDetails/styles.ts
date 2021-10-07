import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        flexGrow: 1,
        marginTop: '2%',
        paddingBottom: '1%',
    },
    cardContainer:{
        padding: '2%',
        [theme.breakpoints.up('xs')]: {
            marginTop: '47px',
            marginLeft: '2.5%',
            marginRight: '2.5%',
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: '47px',
        },
        [theme.breakpoints.up('md')]: {
            marginTop: '5%',
        },
    },
    dataContainer:{
        marginBottom: '1%',
        textAlign: 'start'
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
    titleContainer:{
        justifyContent: 'space-between',

    },
    headerText:{
        marginBottom: '2%',
        color: globalColors.darkGrey,
        fontSize: 12,
    },
    textTitle:{
        fontSize:20,
        marginTop: '1%',
        marginBottom: '3%',
        marginLeft: '3%',
    },
    button:{
        height: '35px',
    },
    textCenter: {
        textAlign: 'center',
        marginTop: '2%'
    },
    archive: {
        marginLeft: '1%'
    },
    icon: {
        fontSize: 60
    },
    leftCard: {
        paddingTop: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '2.5%',
        marginRight: '1%',
        marginBottom: '3%',
        marginLeft: '10%',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            marginLeft: '2.5%',
            marginRight: '2.5%',
        },
    },
    rightCard: {
        marginLeft: '2%',
        marginRight: '3.5%',
        [theme.breakpoints.down('md')]: {
            marginLeft: '2.5%',
            marginRight: '2.5%',
        },
    },
    noImageSelected: {
        marginLeft: '2%',
        marginRight: '3.5%',
        padding: '5%',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            marginLeft: '2.5%',
            marginRight: '2.5%',
        },
    },
    image: {
        width: '100%'
    }
}));

export default useStyles