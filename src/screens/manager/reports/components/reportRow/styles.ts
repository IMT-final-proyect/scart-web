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
            fontSize: 10,
        },
        
    }
}));

export default useStyles