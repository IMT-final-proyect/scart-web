import { Button, Card, CircularProgress, Grid, Modal, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import EditIcon from '@mui/icons-material/Edit';
import CustomSnackbar from "../../../components/customSnackbar"
import EditContractorModal from "../../../components/editContractorModal"
import { RootState } from "../../../redux/rootReducer"
import { getContractorData, IUser, putChangePassword } from "../../../redux/slices/userSlice"
import { IContractor } from "../../../utils/interfaces"
import useStyles from "./styles"
import { editContractor } from "../../../redux/slices/contractorsSlice";
import { AllowedRol } from "../../../utils/constants";

const MyData = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [openEditContractorModal, setOpenEditContractorModal] = useState(false)
    const [openEditContractorSuccess, setOpenEditContractorSuccess] = useState(false)
    const [openEditContractorError, setOpenEditContractorError] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [messageSnackbar, setMessageSnackbar] = useState('')
    const loading: boolean = useSelector((state: RootState) => state.documents.contractor.loading)
    const success: boolean = useSelector((state: RootState) => state.documents.contractor.success)
    const error = useSelector((state: RootState) => state.documents.contractor.error)
    const data: IUser | null = useSelector((state: RootState) => state.user.userData)
    
    useEffect(() => {
        setOpenEditContractorSuccess(success)
        dispatch(getContractorData(data?.id))
    }, [success, data, dispatch])

    useEffect(() => {
        setOpenEditContractorError(!!error)
    }, [error])

    const _editContractor = (
        contractor: IContractor, 
        name: string,
        username: string,
        email: string,
        cuit: string, 
        street: string,
        number: string,
        city: string,
        province: string,
        zipCode: string,
        password?: string) => {
        dispatch(editContractor(contractor, name, username, email, cuit, street, number, city, province, zipCode))
        if (changePassword && !!password) dispatch(putChangePassword(password, AllowedRol.contractor, contractor.id))
        setMessageSnackbar('Conductor modificado con exito')
    }

    return (
        <>
            <Modal open={openEditContractorModal} onClose={() => setOpenEditContractorModal(false)}>
                <EditContractorModal 
                    contractor={data as IUser} 
                    changePassword={changePassword}
                    editContractor={_editContractor} 
                    setOpenEditContractorModal={setOpenEditContractorModal} 
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
                                <Button onClick={() => {setOpenEditContractorModal(true)}}>
                                    <EditIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container direction='row' justifyContent="center" alignItems="center">
                            <Typography className={classes.field}>Nombre:</Typography>
                            <Typography className={classes.data}>{data?.name || '-'}</Typography>
                        </Grid>
                        <Grid container direction='row' justifyContent="center" alignItems="center">
                            <Typography className={classes.field}>Usuario:</Typography>
                            <Typography className={classes.data}>{data?.username || '-'}</Typography>
                        </Grid>
                        <Grid container direction='row' justifyContent="center" alignItems="center">
                            <Typography className={classes.field}>CUIT:</Typography>
                            <Typography className={classes.data}>{data?.cuit || '-'}</Typography>
                        </Grid>
                        <Grid container direction='row' justifyContent="center" alignItems="center">
                            <Typography className={classes.field}>Email:</Typography>
                            <Typography className={classes.data}>{data?.email || '-'}</Typography>
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
                            <Typography className={classes.field}>Telefono:</Typography>
                            <Typography className={classes.data}>{data?.phone|| '-'}</Typography>
                        </Grid>
                    </Card>
                </Grid>
            }
            <CustomSnackbar open={openEditContractorSuccess && !!messageSnackbar} message={messageSnackbar} type='success' onClose={() =>  setOpenEditContractorSuccess(false)} />
            <CustomSnackbar open={openEditContractorError} message={'Error editando conductor'} type='error' onClose={() =>  setOpenEditContractorError(false)} />
        </>
    )
}

export default MyData

