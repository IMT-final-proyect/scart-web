
import { makeStyles, Theme } from '@material-ui/core';
import { headerSize } from '../../utils/constants';
import globalColors from '../../utils/styles/globalColors';

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
        marginLeft: '2.5%',
        paddingRight: '2.5%',
        paddingLeft: '2.5%',
        paddingBottom: '1.5%',
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
    filesCard: {
        paddingTop: '2.5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '2.5%',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '2.5%',
            marginRight: '2.5%',
        },
    },
    commentCard:{
        marginLeft: '2.5%',
        paddingRight: '2.5%',
        paddingLeft: '2.5%',
        paddingBottom: '2.5%',
        [theme.breakpoints.down('sm')]: {
            marginTop: '17%'
        },
    },
    textTitle:{
        fontSize: 20,
        marginBottom: '1%',
        [theme.breakpoints.down('sm')]: {
            fontSize: 22,
        },
    },
    textTitleField:{
        fontSize:20,
        marginBottom: '1%',
        marginLeft: '1%',
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            fontSize: 15,
        },
    },
    field:{
        marginLeft: '1%',
        color: globalColors.darkGrey,
        textAlign: 'start',
        fontSize: 13,
        [theme.breakpoints.down('md')]: {
            fontSize: 12,
        },
    },
    dataFieldContainer: {
        marginBottom: '1%'
    },
    dataField:{
        marginLeft: '1%',
        textAlign: 'start',
        fontSize: 15,
        [theme.breakpoints.down('md')]: {
            fontSize: 10,
        }
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
    imageCard: {
        padding: '2%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%)`,
    },
    image: {
        width: '100%'
    },
    titleContainer:{
        justifyContent: 'space-between',
    },
    textCenter: {
        textAlign: 'center',
        marginTop: '2%'
    },
    spinner: {
        marginTop: '20%',
        color: globalColors.lightBlue
    },
    severity:{
        maxWidth: 'auto',
        textAlign: 'start',
        marginLeft: '2%',
        [theme.breakpoints.down('sm')]: {
            fontSize: 11,
        },
    },
    stateColor: {
        borderRadius: 20,
        textAlign: 'center',
        paddingTop: '2%',
        paddingBottom: '2%'
    },
    stateText: {
        marginLeft: '1.5%',
        color: globalColors.white,
        fontSize: 13,
        [theme.breakpoints.down('md')]: {
            fontSize: 12,
        },
    },
    entityName: {
        fontSize: 20,
        marginTop: '2.5%',
        fontWeight: 'bold',
        marginBottom: '2.5%'
    },
    fieldFile:{
        fontSize:25,
        marginTop: '2.5%',
        marginBottom: '2.5%',
        [theme.breakpoints.down('sm')]: {
            fontSize: 15,
        },
    },
    fileTitle:{
        color: globalColors.darkGrey,
        textAlign: 'start',
        fontSize: 15,
        [theme.breakpoints.down('md')]: {
            fontSize: 12,
        },
    },
    invalidText:{
        marginTop: '1.5%',
        marginBottom: '1.5%'
    },
    areValidDiv: {
        textAlign:'center'
    },
    areValidText:{
        color: globalColors.darkGrey,
        fontSize: 15,
    },
    documentsContainer: {
        padding: '2.5%',
        width: '100%'
    }
}));

export default useStyles