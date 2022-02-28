import { makeStyles, Theme } from '@material-ui/core';
import { headerSize } from '../../../utils/constants';
import globalColors from '../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: headerSize+30,
        paddingLeft: '2.5%',
        paddingRight: '2.5%'
    },
    card:{
        minWidth: '100%',
        paddingTop: '1%',
        paddingBottom: '2%',
        paddingLeft: '2.5%',
        paddingRight: '2.5%,',
        marginBottom: '2%',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    headerText:{
        marginBottom: '2%',
        color: globalColors.darkGrey,
        fontSize: 13,
        [theme.breakpoints.down('md')]: {
            fontSize: 13,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 10,
        },
    },
    textCenter: {
        textAlign: 'center'
    },
    placeholderText:{
        fontSize: 17,
        marginRight: '2.5%'
    },
    button:{
        height: '50px',
        textTransform: 'none',
        alignItems: 'center',
    },
    circleIcon:{
        marginTop: '3%',
        marginBottom: '3%',
        marginRight: '3%',
    },
    spinner: {
        color: globalColors.lightBlue,
    },
}));

export default useStyles;