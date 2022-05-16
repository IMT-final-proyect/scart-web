import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        maxWidth: 'auto',
        textAlign: 'start',
    },
    text:{
        maxWidth: 'auto',
        textAlign: 'start',
        [theme.breakpoints.down('md')]: {
            fontSize: 13,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 7,
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
    },
    iconContainer:{
        maxWidth: 'auto',
    },
}));

export default useStyles
