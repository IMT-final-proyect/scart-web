import { makeStyles, Theme } from '@material-ui/core';
import globalColors from '../../../../../utils/styles/globalColors';

interface Props {
    color: string
}

const useStyles = makeStyles<Theme, Props>((theme: Theme) => ({
    container:{
        textAlign: 'start',
        alignItems: 'center'
    },
    text:{
        maxWidth: 'auto',
        textAlign: 'start',
        [theme.breakpoints.down('lg')]: {
            fontSize: 14,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 11,
        },
    },
    severity:{
        maxWidth: 'auto',
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
    },
    button:{
        height: '35px',
        color: globalColors.lightBlue
    },
}));

export default useStyles