import { Button, Card, CircularProgress, Grid, Modal, Typography } from "@material-ui/core"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import EditIcon from '@mui/icons-material/Edit';
import CustomSnackbar from "../../../components/customSnackbar"
import EditDriverModal from "../../../components/editDriverModal"
import { RootState } from "../../../redux/rootReducer"
import { editDriver } from "../../../redux/slices/resourcesSlice"
import { IUser } from "../../../redux/slices/userSlice"
import { IDriver } from "../../../utils/interfaces"
import useStyles from "./styles"

const MyData = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [openEditDriverModal, setOpenEditDriverModal] = useState(false)
    const [openEditDriverSuccess, setOpenEditDriverSuccess] = useState(false)
    const [openEditDriverError, setOpenEditDriverError] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [messageSnackbar, setMessageSnackbar] = useState('')
    const loading: boolean = useSelector((state: RootState) => state.documents.drivers.loading)
    const success: boolean = useSelector((state: RootState) => state.resources.drivers.success)
    const error: boolean = useSelector((state: RootState) => state.resources.drivers.success)
    const data: IUser | null = useSelector((state: RootState) => state.user.userData)
    
    useEffect(() => {
        setOpenEditDriverSuccess(success)
    }, [success])

    const _editDriver = (
        driver: IDriver | IUser, 
        name: string, 
        surname: string, 
        username: string,
        cuit: string, 
        birthdate: moment.Moment, 
        street: string,
        number: number,
        city: string,
        province: string,
        zipCode: string,
        password?: string) => {
        if (changePassword)
            dispatch(editDriver(driver, name, surname, username, cuit, birthdate, street, number, city, province, zipCode, password))
        else
            dispatch(editDriver(driver, name, surname, username, cuit, birthdate, street, number, city, province, zipCode))
        setMessageSnackbar('Conductor modificado con exito')
    }

    return (
        <>
            <Modal open={openEditDriverModal} onClose={() => setOpenEditDriverModal(false)}>
                <EditDriverModal 
                    driver={data as IUser} 
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
                            <Grid item xs={2}>
                                <div className={classes.empty}/>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography className={classes.title}>Mis Datos</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Button onClick={() => {setOpenEditDriverModal(true)}}>
                                    <EditIcon />
                                </Button>
                            </Grid>
                        </Grid>
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
                        <Grid container direction='row' justifyContent="center" alignItems="center">
                            <Typography className={classes.field}>Dirección:</Typography>
                            <Typography className={classes.data}>{(data?.address?.street || '-')+' '+(data?.address?.number || '')}</Typography>
                        </Grid>
                        <Grid container direction='row' justifyContent="center" alignItems="center">
                            <Typography className={classes.field}>Ciudad:</Typography>
                            <Typography className={classes.data}>{data?.address?.city || '-'}</Typography>
                        </Grid>
                        <Grid container direction='row' justifyContent="center" alignItems="center">
                            <Typography className={classes.field}>Provincia:</Typography>
                            <Typography className={classes.data}>{data?.address?.province || '-'}</Typography>
                        </Grid>
                        <Grid container direction='row' justifyContent="center" alignItems="center">
                            <Typography className={classes.field}>Codigo Postal:</Typography>
                            <Typography className={classes.data}>{data?.address?.zip_code || '-'}</Typography>
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

