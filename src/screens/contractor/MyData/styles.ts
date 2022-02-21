import { makeStyles, Theme } from '@material-ui/core';
import { headerSize } from '../../../utils/constants';
import globalColors from '../../../utils/styles/globalColors';

const { innerWidth } = window;

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        paddingTop: headerSize + 50,
    },
    empty:{
        padding: '1%'
    },
    card: {
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        minWidth: innerWidth * 0.6,
        paddingTop: '2.5%',
        paddingBottom: '5%',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            minWidth: innerWidth * 0.8
        },
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: '10%'
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
}));

export default useStyles;