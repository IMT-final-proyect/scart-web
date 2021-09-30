
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
            width: '130%',
            marginLeft: '2.5%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '730px',
        },
        [theme.breakpoints.up('md')]: {
            width: '95%',
            marginRight: '2.5%',
        },
    },
    leftCard:{
        marginTop: '10%',
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
    titleContainer:{
        
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
        height: '35px',
    }
}));

export default useStyles