import { makeStyles, Theme } from "@material-ui/core";
import globalColors from "../../utils/styles/globalColors";
import NutrecoImage from '../../assets/images/planta_inicio.jpeg'

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        backgroundColor: globalColors.grey,
        height: '100vh',
        margin: 0,
        padding: 0,
        backgroundImage: `url(${NutrecoImage})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
    },
    card:{
        padding: '2.5%',
        backgroundColor: 'rgba(255,255,255,.8)',
        [theme.breakpoints.down('md')]: {
            padding: '0',
        },
        
    },
    row: {
        marginTop: '3%',
        marginBottom: '5%',
    },
    title: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        textTransform: 'none'
    },
    textInput: {
        color: globalColors.lightBlue,
    },
    buttonContainer:{
        marginTop: '20%',
    },
    button: {
        backgroundColor: globalColors.lightBlue,
        color: globalColors.white,
        fontSize: 15,
        margin: 'auto',
        textTransform: 'none'
    },
    forgotPassword: {
        marginTop: '10%',
        justify: 'center',
        alignItems: 'center',
        textTransform: 'none',
        backgroundColor: globalColors.white
    },
    logoNutreco: {
        marginBottom: '2%',
        [theme.breakpoints.down('lg')]: {
            width: '30%',
            marginBottom:'3%'
        },
        [theme.breakpoints.down('sm')]: {
            width: '20%',
            marginBottom:'3%'
        },
    }
}));

export default useStyles