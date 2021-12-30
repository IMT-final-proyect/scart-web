import { Grid, Typography } from "@material-ui/core";
import QRCode from "qrcode.react";
import useStyles from './styles'

const QRGenerator = () => {
    const classes = useStyles()
    return (
        <Grid container className={classes.container} justifyContent='center' alignItems='center'>
            <QRCode value='matias araneta' size={300} />
            
        </Grid>
    )
}

export default QRGenerator