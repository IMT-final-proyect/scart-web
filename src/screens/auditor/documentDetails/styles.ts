
import { makeStyles, Theme } from '@material-ui/core';

import globalColors from '../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        flexGrow: 1,
    },
    cardContainer:{
    },
    card:{
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
    commentCard:{
        marginTop: '1%',
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
        marginTop: '3%',
        marginBottom: '3%',
        marginLeft: '3%',
        [theme.breakpoints.down('sm')]: {
            fontSize: 15,
        },
    },
    circleIcon:{
        marginTop: '3%',
        marginBottom: '3%',
        marginRight: '3%',
    },
    field:{
        marginBottom: '2%',
        color: globalColors.darkGrey,
        fontSize: 13,
        [theme.breakpoints.down('md')]: {
            fontSize: 12,
        },
    },
    dataField:{
        marginLeft: '2%',
        textAlign: 'start',
        [theme.breakpoints.down('md')]: {
            fontSize: 10,
        }
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
        height: '35px',
    },
    textField: {
        marginTop: '1%',
        marginBottom: '1%',
        minWidth: '100%',
        minHeight: '100%',
    },
    text:{
        maxWidth: 'auto',
        textAlign: 'start',
        fontWeight: 'bold',
        marginLeft: '1%',
        [theme.breakpoints.down('md')]: {
            fontSize: 10,
        }
    },
    rechazar:{
        maxWidth: 'auto',
        textAlign: 'start',
        background: globalColors.red,
        color: globalColors.white,
        fontWeight: 'bold',
        [theme.breakpoints.down('md')]: {
            fontSize: 10,
        },
    },
    documentDataRow:{
        marginBottom: '1%',
        paddingRight: '1%'
    }
}));

export default useStyles