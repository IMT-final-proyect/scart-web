import { makeStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
    formControl: {
      marginTop: '2.5%',
      marginBottom: '2.5%',
      width: 200,
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
      [theme.breakpoints.down('sm')]: {
        width: 150,
      },
    },
}));

export default useStyles