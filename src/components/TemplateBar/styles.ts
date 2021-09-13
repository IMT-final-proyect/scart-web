import { makeStyles, Theme } from '@material-ui/core';

import { headerSize } from '../../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
    customizeToolbar:{
        minHeight: headerSize,
        height: headerSize,
    },
    title:{
        marginLeft: theme.spacing(2),
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
}));
export default useStyles