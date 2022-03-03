import { makeStyles, Theme } from '@material-ui/core';

interface Props {
    color: string
}

const useStyles = makeStyles<Theme, Props>((theme: Theme) => ({
    container:{
        maxWidth: 'auto'
    },
    text:{
        maxWidth: 'auto',
        [theme.breakpoints.down('sm')]: {
            fontSize: 11,
        },
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
        paddingLeft: '4%',
        paddingRight: '4%',
        paddingTop: '1%',
        paddingBottom: '1%'
    }
}));

export default useStyles