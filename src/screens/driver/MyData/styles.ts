import { makeStyles, Theme } from '@material-ui/core';
import { headerSize } from '../../../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: headerSize + 50,
    },
    card: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '5%',
        paddingBottom: '5%',
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: '5%'
    },
    field: {
        fontSize: 20,
        marginRight: 10
    },
    data: {
        fontSize: 20,
        fontWeight: 'bold'
    }
}));

export default useStyles;