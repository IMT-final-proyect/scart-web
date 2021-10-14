import { makeStyles, Theme } from '@material-ui/core';

import { headerSize } from '../../utils/constants';
import globalColors from '../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    customizeToolbar:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: headerSize,
        height: headerSize,
    },
    title:{
        marginLeft: theme.spacing(2),
        marginBottom: '5%'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
      marginTop: '2.5%',
      width: 250,
    },
    salir: {
        textTransform: "none",
        color: globalColors.white,
        fontSize: 16,
        marginLeft: '5%',
        marginRight: '5%'
    }
}));
export default useStyles