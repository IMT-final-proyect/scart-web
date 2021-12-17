import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: '5%',
    },
    button: {
        width: '100%',
        height: 'auto',
        textTransform: 'none',
        fontSize: 17,
        justifyContent: "flex-start",
        paddingLeft: '10%',
        paddingTop: '1%',
    },
    icon: {
        background: globalColors.darkBlue,
        color: globalColors.white,
        paddingTop: '3%',
        paddingRight: '3%',
        paddingLeft: '3%',
        marginRight: '4%',
        borderRadius: '10%',
    },
}));

export default useStyles;