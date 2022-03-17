import { makeStyles, Theme } from '@material-ui/core';

import { headerSize } from '../../utils/constants';
import globalColors from '../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    customizeToolbar:{
        minHeight: headerSize,
        height: headerSize,
    },
    user:{
        fontSize: 18,
        marginLeft: theme.spacing(2),
        textTransform: 'none',
        textAlign: 'center'
    },
    title:{
        marginLeft: theme.spacing(2),
        textTransform: 'none',
        textAlign: 'center'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawer: {
        marginTop: '2.5%',
        width: 250,
        height: '100%',
        justifyContent: 'space-between'
    },
    textContainer: {
        textAlign: 'center',
        padding: '10px',
    },
    salir: {
        textTransform: "none",
        color: globalColors.white,
        fontSize: 16,
        marginLeft: '5%',
        marginRight: '5%'
    },
    image: {
        width: '100%'
    },
    text: {
        textAlign: 'center',
        color: 'rgb(172 156 156)'
    }
}));
export default useStyles