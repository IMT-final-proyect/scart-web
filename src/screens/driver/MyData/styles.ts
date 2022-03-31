import { makeStyles, Theme } from '@material-ui/core';
import { headerSize } from '../../../utils/constants';
import globalColors from '../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: headerSize + 50,
    },
    empty:{
        padding: '1%'
    },
    card: {
        padding: '5%',
        textAlign: 'center',
        marginLeft: '2.5%',
        marginRight: '2.5%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: '10%',
        textAlign: 'left',
        color: globalColors.lightBlue
    },
    field: {
        fontSize: 20,
        marginRight: 10
    },
    data: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    spinner: {
        marginTop: '20%',
        color: globalColors.lightBlue
    },
    dataContainer: {
        textAlign: 'left'
    }
}));

export default useStyles;