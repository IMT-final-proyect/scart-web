import { Button, Card, CircularProgress, Grid, Modal, Typography } from "@material-ui/core"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import EditIcon from '@mui/icons-material/Edit';
import CustomSnackbar from "../../../components/customSnackbar"
import EditDriverModal from "../../../components/editDriverModal"
import { RootState } from "../../../redux/rootReducer"
import { editDriver, getDriverById } from "../../../redux/slices/resourcesSlice"
import { IUser, putChangePassword } from "../../../redux/slices/userSlice"
import { IDriver } from "../../../utils/interfaces"
import useStyles from "./styles"
import { AllowedRol } from "../../../utils/constants";

const MyData = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [openEditDriverModal, setOpenEditDriverModal] = useState(false)
    const [openEditDriverSuccess, setOpenEditDriverSuccess] = useState(false)
    const [openEditDriverError, setOpenEditDriverError] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [messageSnackbar, setMessageSnackbar] = useState('')
    const loading: boolean = useSelector((state: RootState) => state.resources.drivers.loading)
    const success: boolean = useSelector((state: RootState) => state.resources.drivers.success)
    const error = useSelector((state: RootState) => state.resources.drivers.error)
    const driverId: number | undefined = useSelector((state: RootState) => state.user.userData?.id)
    const data: IDriver = useSelector((state: RootState) => state.resources.drivers.data[driverId as number])
    
    useEffect(() => {
        setOpenEditDriverSuccess(success)
        dispatch(getDriverById(driverId as number))
    }, [success, driverId, dispatch])

    useEffect(() => {
        setOpenEditDriverError(!!error)
    }, [error])

    const _editDriver = (
        driver: IDriver | IUser, 
        name: string, 
        surname: string, 
        username: string,
        cuit: string, 
        phone: string,
        birthdate: moment.Moment, 
        email: string,
        password?: string) => {
        dispatch(editDriver(driver, name, surname, username, cuit, phone, birthdate, email))
        if (changePassword && !!password) dispatch(putChangePassword(password, AllowedRol.driver, driver.id)) 
        setMessageSnackbar('Conductor modificado con exito')
    }

    return (
        <>
            <Modal open={openEditDriverModal} onClose={() => setOpenEditDriverModal(false)}>
                <EditDriverModal 
                    driver={data} 
                    changePassword={changePassword}
                    editDriver={_editDriver} 
                    setOpenEditDriverModal={setOpenEditDriverModal} 
                    setChangePassword={setChangePassword}
                />
            </Modal>
            {loading ?
                <Grid container alignContent='center' justifyContent='center' >
                    <CircularProgress className={classes.spinner} />
                </Grid>
                :
                <Grid container className={classes.container} justifyContent="center" alignItems="center">
                    <Card className={classes.card}>
                        <Grid container >
                            <Grid item xs={10}>
                                <Typography className={classes.title}>Mis Datos</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Button onClick={() => {setOpenEditDriverModal(true)}}>
                                    <EditIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.dataContainer} direction='row' justifyContent="center" alignItems="center">
                            <Grid item xs={6}>
                                <Typography className={classes.field}>Nombre:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.data}>{data?.name || '-'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.field}>Apellido:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.data}>{data?.surname || '-'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.field}>CUIL:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.data}>{data?.cuit || '-'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.field}>Email:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.data}>{data?.email || '-'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.field}>Contratista:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.data}>{data?.contractor?.name || '-'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.field}>Fecha de Nacimiento:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.data}>{moment(data?.birth_date).format('DD/MM/YYYY') || '-'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.field}>Telefono:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.data}>{data?.phone || '-'}</Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            }
            <CustomSnackbar open={openEditDriverSuccess && !!messageSnackbar} message={messageSnackbar} type='success' onClose={() =>  setOpenEditDriverSuccess(false)} />
            <CustomSnackbar open={openEditDriverError} message={'Error editando conductor'} type='error' onClose={() =>  setOpenEditDriverError(false)} />
        </>
    )
}

export default MyData

