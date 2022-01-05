import { Card, Grid, Typography } from "@material-ui/core"
import moment from "moment"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/rootReducer"
import { IUser } from "../../../redux/slices/userSlice"
import useStyles from "./styles"

const MyData = () => {
    const classes = useStyles()
    const data: IUser | null = useSelector((state: RootState) => state.user.userData)
    console.log(data);
    

    return (
        <Grid container className={classes.container} justifyContent="center" alignItems="center">
            <Card className={classes.card}>
                <Typography className={classes.title}>Conductor</Typography>
                <Grid container direction='row' justifyContent="center" alignItems="center">
                    <Typography className={classes.field}>Nombre:</Typography>
                    <Typography className={classes.data}>{data?.name || '-'}</Typography>
                </Grid>
                <Grid container direction='row' justifyContent="center" alignItems="center">
                    <Typography className={classes.field}>Apellido:</Typography>
                    <Typography className={classes.data}>{data?.surname || '-'}</Typography>
                </Grid>
                <Grid container direction='row' justifyContent="center" alignItems="center">
                    <Typography className={classes.field}>CUIL:</Typography>
                    <Typography className={classes.data}>{data?.cuit || '-'}</Typography>
                </Grid>
                <Grid container direction='row' justifyContent="center" alignItems="center">
                    <Typography className={classes.field}>Contratista:</Typography>
                    <Typography className={classes.data}>{data?.contractor?.name || '-'}</Typography>
                </Grid>
                <Grid container direction='row' justifyContent="center" alignItems="center">
                    <Typography className={classes.field}>Fecha de Nacimiento:</Typography>
                    <Typography className={classes.data}>{moment(data?.birth_date).format('DD/MM/YYYY') || '-'}</Typography>
                </Grid>
            </Card>
        </Grid>
    )
}

export default MyData