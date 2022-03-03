import { Grid } from "@material-ui/core";
import QRCode from "qrcode.react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import useStyles from './styles'

const QRGenerator = () => {
    const classes = useStyles()
    const id = useSelector((state: RootState) => state.user.accountData?.entityId)
    return (
        <Grid container className={classes.container} justifyContent='center' alignItems='center'>
            <QRCode value={id?.toString()} size={350} includeMargin/>
        </Grid>
    )
}

export default QRGenerator