import { makeStyles, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
    container:{
        [theme.breakpoints.down('sm')]: {
            marginBottom: '5%',
        },
    },
    card:{
        marginTop: '5%',
        marginLeft: '2.5%',
        paddingLeft: '1.5%',
        paddingBottom: '1%',
        [theme.breakpoints.up('xs')]: {
            width: '130%',
            marginLeft: '2.5%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '730px',
        },
        [theme.breakpoints.up('md')]: {
            width: '95%',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '17%'
        },
    },
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
        divider: {
        height: 28,
        margin: 4,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
}));

export default useStyles