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
    iconContainer:{
        maxWidth: 'auto',
    },
}));

export default useStyles