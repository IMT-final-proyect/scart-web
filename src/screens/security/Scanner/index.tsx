import { Grid } from '@material-ui/core'
import useStyles from './styles';
import QrReader from 'react-qr-scanner'

const Scanner = () => {
    const classes = useStyles();

    const handleError = () => {

    }

    const handleScan = () => {

    }

    return(
        <Grid container className={classes.container}>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
            />
        </Grid>
    )
}
export default Scanner