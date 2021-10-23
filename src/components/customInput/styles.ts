import { makeStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
    input: {
        [theme.breakpoints.down('sm')]: {
            maxWidth: 150
        },
    },
}));

export default useStyles