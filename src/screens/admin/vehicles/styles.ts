
import { makeStyles, Theme } from '@material-ui/core';
import { headerSize } from '../../../utils/constants';

import globalColors from '../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        flexGrow: 1,
    },
    card:{
        marginTop: headerSize+30,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        paddingTop: '1%',
        paddingBottom: '2%',
        paddingLeft: '2.5%',
        paddingRight: '2.5%,',
        minWidth: '95%'
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
    leftCard:{
        marginTop: '5%',
        marginLeft: '2.5%',
        paddingRight: '2.5%',
        paddingLeft: '2.5%',
        paddingBottom: '2.5%',
        [theme.breakpoints.up('xs')]: {
            width: '130%',
            marginLeft: '2.5%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '730px',
        },
        [theme.breakpoints.up('md')]: {
            width: '95%',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '17%'
        },
    },
    textTitle:{
        fontSize:20,
        marginTop: '1%',
        marginBottom: '1%',
        fontWeight: 'bold',
        color: globalColors.lightBlue,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15,
        },
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
        [theme.breakpoints.down('md')]: {
            fontSize: 13,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 9,
        },
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
    textCenter: {
        textAlign: 'center'
    },
    button:{
        height: '35px',
        textTransform: 'none',
        paddingTop: '2%',
        paddingBottom: '2%',
        alignItems: 'center',
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
        marginTop: '5%',
        color: globalColors.white
    },
    input: {
        minWidth: '95%',
        [theme.breakpoints.down('md')]: {
            marginBottom: '3%',
        },
    }
}));

export default useStyles