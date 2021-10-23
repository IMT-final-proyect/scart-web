import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../utils/styles/globalColors';

interface Props {
    color: string
}

const useStyles = makeStyles<Theme, Props>((theme: Theme) => ({
    container:{
        flexGrow: 1,
        paddingBottom: '1%',
        marginTop: '65px',
    },
    bottomCardContainer: {
        flexGrow: 1,
        marginTop: '2%',
        [theme.breakpoints.down('md')]: {
            marginTop: '5%'
        },
    },
    cardContainer:{
        padding: '2%',
        paddingBottom: '4%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
    },
    dataContainer:{
        marginBottom: '1%',
        textAlign: 'start'
    },
    stateContainer: {
        display: 'flex',
        flex: 'row',
        alignItems: 'flex-start'
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
    stateColor: {
        backgroundColor: ({color}) => color,
        borderRadius: 20,
        fontWeight: 'bold',
        marginLeft: '5%',
        paddingLeft: '8%',
        paddingRight: '8%',
        paddingTop: '2%',
        paddingBottom: '2%'
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
        [theme.breakpoints.down('sm')]: {
            marginLeft: '2.5%',
            marginRight: '2.5%',
        },
    },
    rightCard: {
        marginLeft: '2%',
        marginRight: '3.5%',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '2.5%',
            marginRight: '2.5%',
            marginTop: '5%'
        },
    },
    noImageSelected: {
        marginLeft: '2%',
        marginRight: '3.5%',
        padding: '5%',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '2.5%',
            marginRight: '2.5%',
            marginTop: '5%'
        },
    },
    image: {
        width: '100%'
    }
}));

export default useStyles