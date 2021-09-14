import { makeStyles, Theme } from "@material-ui/core";
import globalColors from "../../utils/styles/globalColors";

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        backgroundColor: globalColors.grey,
        height: '100vh',
        margin: 0,
        padding: 0,
    },
    card:{
        padding: '5%',
    },
    row: {
        marginTop: '3%',
        marginBottom: '5%',
    },
    title: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
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
    },
}));

export default useStyles