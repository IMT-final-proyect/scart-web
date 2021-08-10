import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        maxWidth: 'auto'
    },
    text:{
        maxWidth: 'auto',
        [theme.breakpoints.down('sm')]: {
            fontSize: 11,
        },
        
    }
}));

export default useStyles