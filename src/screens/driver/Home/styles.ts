
import { makeStyles, Theme } from '@material-ui/core';
import { headerSize } from '../../../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        flexGrow: 1,
        marginTop: headerSize + 40
    },
    cardLeft: {
        minWidth: 'auto',
        textAlign: 'center'
    },
    cardRight: {
        textAlign: 'center'
    },
    cardContainer: {
        marginBottom: '5%'
    }
}));

export default useStyles