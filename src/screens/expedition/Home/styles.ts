
import { makeStyles, Theme } from '@material-ui/core';
import { headerSize } from '../../../utils/constants';

import globalColors from '../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        flexGrow: 1,
    },
    cardContainer:{
    },
    titleCard:{
        marginTop: headerSize+30,
        marginLeft: '2.5%',
        paddingRight: '2.5%',
        paddingLeft: '2.5%',
        paddingBottom: '1%',
        paddingTop: '1%',
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
    center: {
        alignItems: 'center'
    },
    textCenter: {
        textAlign: 'center'
    },
    contentCard:{
        marginTop: '2%',
        marginLeft: '2.5%',
        paddingRight: '1%',
        paddingLeft: '1%',
        paddingBottom: '2.5%',
        paddingTop: '2.5%',
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
        fontSize:23,
        marginBottom: '0.5%',
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
        },
    },
    circleIcon:{
        marginTop: '3%',
        marginBottom: '3%',
        marginRight: '3%',
    },
    headerText:{
        marginBottom: '1%',
        color: globalColors.darkGrey,
        fontSize: 15,
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
    spinner: {
        marginTop: '20%',
        color: globalColors.lightBlue
    },
    searchTitle:{
        color: globalColors.darkGrey,
        marginBottom: '1%',
        marginLeft: '1%',
        fontSize: 15,
    },
    inputContainer: {
        marginRight: '2%'
    },
    input: {
        minWidth: '95%',
        [theme.breakpoints.down('md')]: {
            marginBottom: '3%',
        },
    }
}));

export default useStyles