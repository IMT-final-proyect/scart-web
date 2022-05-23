import { Grid, Typography, Button } from "@material-ui/core"
import moment from "moment";
import { IDriverInside } from "../../../../utils/interfaces";
import useStyles from './styles';

interface Props { 
    driverToLeave: IDriverInside | undefined
    handleDriverToLeave: (driverId: number, vehicleId: number) => void
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}
const DriverLeaves = ({ driverToLeave, handleDriverToLeave, setOpenModal }: Props) => {
    const classes = useStyles();
    
    const _handleOnClick = () => {
        if(!!driverToLeave) {
            handleDriverToLeave(driverToLeave?.driver.id, driverToLeave?.vehicle.id)
        }
        setOpenModal(false)
    }

    return(
        <Grid className={classes.modal} container direction='column' justify='center' alignItems='center'>
            <Typography className={classes.title}>{'¿Desea registrar la salida?'}</Typography>
            <Grid container direction='column' alignItems='center' justifyContent='center'>
                <Grid container direction='row'>
                    <Typography className={classes.text}>Conductor:</Typography>
                    <Typography className={classes.textBold}>{driverToLeave?.driver.name + ' ' + driverToLeave?.driver.surname}</Typography>
                </Grid>
                <Grid container direction='row'>
                    <Typography className={classes.text}>Vehiculo:</Typography>
                    <Typography className={classes.textBold}>{driverToLeave?.vehicle.plate}</Typography>
                </Grid>
                <Grid container direction='row'>
                    <Typography className={classes.text}>Contratista:</Typography>
                    <Typography className={classes.textBold}>{driverToLeave?.contractor.name || 'No hay datos del contratista'}</Typography>
                </Grid>
                <Grid container direction='row'>
                    <Typography className={classes.text}>Ingreso: </Typography>
                    <Typography className={classes.textBold}>{moment(driverToLeave?.checkIn).format('DD/MM/yy - HH:mm')}</Typography>
                </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='space-between'>
                <Button variant="contained" className={classes.cancel} onClick={ () => setOpenModal(false)}>Cancelar</Button>
                <Button variant="contained" className={classes.accept} onClick={_handleOnClick}>Aceptar</Button>
            </Grid>
        </Grid>
    )
}

export default DriverLeaves