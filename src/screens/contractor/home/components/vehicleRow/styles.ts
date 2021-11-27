import { makeStyles, Theme } from '@material-ui/core';

interface Props {
    color: string
}

const useStyles = makeStyles<Theme, Props>((theme: Theme) => ({
    iconContainer:{
        maxWidth: 'auto'
    },
    text:{
        maxWidth: 'auto',
        textTransform: 'none',
        [theme.breakpoints.down('sm')]: {
            fontSize: 11,
        }
    },
    state:{
        textAlign: 'start',
        [theme.breakpoints.down('sm')]: {
            fontSize: 11,
        },
    },
    stateColor: {
        backgroundColor: ({color}) => color,
        borderRadius: 20,
        padding: '2%',
        textTransform: 'none'
    }
}));

export default useStyles