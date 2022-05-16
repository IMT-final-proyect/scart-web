import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../../../../utils/styles/globalColors';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
    container:{
        textAlign: 'start',
        alignItems: 'center',
        height: '40px',
        borderRadius: 5
    },
    text:{
        maxWidth: 'auto',
        textAlign: 'start',
        fontSize: 13,
    },
    button:{
        height: '35px',
        color: globalColors.lightBlue,
        textTransform: 'none'
    },
    noActions:{
        height: '35px',
        color: globalColors.black,
        textTransform: 'none'
    },
    actions:{
        color: globalColors.grey
    },
    stateColor: {
        borderRadius: 20,
        fontWeight: 'bold',
        marginLeft: '5%',
        paddingLeft: '8%',
        paddingRight: '8%',
        paddingTop: '2%',
        paddingBottom: '2%'
    },
}));

export default useStyles