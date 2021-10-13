import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        maxWidth: 'auto'
    },
    text:{
        maxWidth: 'auto',
        marginBottom: '0.7%',
        [theme.breakpoints.down('sm')]: {
            fontSize: 11,
        },
    }
}));

export default useStyles