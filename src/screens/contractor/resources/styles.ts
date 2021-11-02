
import { makeStyles, Theme } from '@material-ui/core';

import globalColors from '../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        flexGrow: 1,
    },
    cardContainer:{
    },
    rightCard:{
        marginTop: '10%',
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        paddingBottom: '2.5%',
        [theme.breakpoints.up('xs')]: {
            marginLeft: '2.5%',
            marginRight: '2.5%'
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '17%'
        },
    },
    leftCard:{
        marginTop: '10%',
        marginLeft: '2.5%',
        paddingRight: '2.5%',
        paddingLeft: '2.5%',
        paddingBottom: '2.5%',
        [theme.breakpoints.up('xs')]: {
            marginLeft: '2.5%',
            marginRight: '2.5%'
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '17%'
        },
    },
    textTitle:{
        fontSize:20,
        marginTop: '4%',
        marginBottom: '3%',
        marginLeft: '3%',
        fontWeight: 'bold',
        color: globalColors.lightBlue,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15,
        },
    },
    textCenter: {
        textAlign: 'center'
    },
    circleIcon:{
        marginTop: '3%',
        marginBottom: '3%',
        marginRight: '3%',
    },
    headerText:{
        marginBottom: '2%',
        color: globalColors.darkGrey,
        fontSize: 12,
    },
    footer:{
        alignItems: 'center'
    },
    footerText:{
        marginLeft: '5%',
    },
    arrowsContainer:{
        marginRight: '3%',
    },
    button:{
        height: '50px',
    },
    snackbar: {
        width: '75%',
    },
    searchTitle:{
        color: globalColors.darkGrey,
        marginTop: '1%',
        marginBottom: '2%',
        marginLeft: '1%',
        fontSize: 15,
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
        },
    },
    inputContainer: {
        marginRight: '2%'
    },
    spinner: {
        marginTop: '10%',
        color: globalColors.lightBlue
    },
    input: {
        minWidth: '95%',
        [theme.breakpoints.down('md')]: {
            marginBottom: '3%',
        },
    },
    vehicleCard:{
        marginTop: '2.5%',
        marginLeft: '2.5%',
        padding: '2.5%',
        width: '95%',
        [theme.breakpoints.up('xs')]: {
            marginLeft: '2.5%',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '5%'
        },
    },
}));

export default useStyles