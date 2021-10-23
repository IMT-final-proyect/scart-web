
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
    contractorCard:{
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
    textTitle:{
        fontSize:20,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15,
        },
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
    circleIcon:{
        marginTop: '3%',
        marginBottom: '3%',
        marginRight: '3%',
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
    button:{
        height: '35px',
        textTransform: 'none',
        paddingTop: '2%',
        paddingBottom: '2%',
        alignItems: 'center',
    },
    spinner: {
        marginTop: '5%',
        color: globalColors.white
    }
}));

export default useStyles