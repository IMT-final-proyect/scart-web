
import { makeStyles, Theme } from '@material-ui/core';
import { headerSize } from '../../../utils/constants';

import globalColors from '../../../utils/styles/globalColors';
const { innerWidth: width } = window


const useStyles = makeStyles<Theme>((theme: Theme) => ({
    container:{
        display: 'flex',
        flexGrow: 1,
        paddingTop: headerSize+30,
    },
    bottomContainer:{
        flexGrow: 1,
        marginTop: '1.5%',
        paddingLeft: '2.5%',
        paddingRight: '2.5%'
    },
    card:{
        paddingRight: '2.5%',
        paddingLeft: '2.5%',
        paddingBottom: '2.5%',
        paddingTop: '3%',
        width: width*0.95,
        [theme.breakpoints.down('sm')]: {
            marginTop: '17%'
        },
    },
    palletsCard: {
        padding: '2.5%',
        width: width*0.95,
        [theme.breakpoints.down('sm')]: {
            marginTop: '17%'
        },
    },
    textTitle:{
        fontSize:20,
        marginBottom: '3%',
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
        color: globalColors.darkGrey,
        fontSize: 15,
        [theme.breakpoints.down('md')]: {
            fontSize: 12,
        },
    },
    dataField:{
        marginLeft: '2%',
        textAlign: 'start',
        fontSize: 15,
        [theme.breakpoints.down('md')]: {
            fontSize: 12,
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
    arrivalDataRow:{
        marginBottom: '1%',
        paddingRight: '1%'
    },
    titleContainer:{
        justifyContent: 'space-between',
    },
    textCenter: {
        textAlign: 'center',
        marginTop: '2%'
    },
    palletsText: {
        fontSize: 15,
        marginRight: '2%'
    },
    spinner: {
        marginTop: '20%',
        color: globalColors.lightBlue
    },
    spinnerButton: {
        backgroundColor:'black'
    }
}));

export default useStyles