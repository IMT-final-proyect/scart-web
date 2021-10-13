import { makeStyles, Theme } from '@material-ui/core';
import colors from '../../../utils/styles/globalColors';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
    },
    cardContainer:{
        display: 'flex',
        flex: 1,
    },
    card:{
        flex: 1,
        marginTop: '65px',
        marginInline: '10%',
    },
    counterContainer:{
        display: 'flex',
        flex: 1,
        backgroundColor: colors.lightBlue,
        justifyContent: 'center',
        textAlign: 'center',
        
    },
    imgContainer:{
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        margin:'auto',
    },
    img:{
        width: 120,
    },
    counter:{
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '15%',
        paddingBottom: '15%',
    },
    counterText:{
        color: colors.white,
    },
    details:{
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '10%',
        paddingBottom: '10%',
    },
    row:{
    },
    done:{
        color: colors.green,
    },
    wrong:{
        color: colors.red,
    },
    wait: {
        color: colors.yellow,
    },
}));

export default useStyles