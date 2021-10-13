import { makeStyles, Theme } from '@material-ui/core';

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
        paddingTop: '3%',
        paddingRight: '5%',
    },
}));

export default useStyles;