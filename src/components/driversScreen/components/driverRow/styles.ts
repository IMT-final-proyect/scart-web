import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    iconContainer:{
        maxWidth: 'auto',
    },
    text:{
        maxWidth: 'auto',
        textTransform: 'none',
        [theme.breakpoints.down('sm')]: {
            fontSize: 11,
        },
        
    },
    state:{
        maxWidth: 'auto',
        textAlign: 'start',
        [theme.breakpoints.down('lg')]: {
            fontSize: 11,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 7,
        },
    },
    stateColor: {
        borderRadius: 20,
        paddingLeft: '4%',
        paddingRight: '4%',
        paddingTop: '1%',
        paddingBottom: '1%'
    }
}));

export default useStyles