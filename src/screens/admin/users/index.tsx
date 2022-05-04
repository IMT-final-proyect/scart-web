import { Button, Card, CircularProgress, Grid, Modal, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../../redux/rootReducer'
import { createSpecialUser, deleteSpecialUser, getSpecialUsers } from '../../../redux/slices/specialUsersSlice'
import { ROUTES } from '../navigation/routes'
import SpecialUserRow from './components/SpecialUserRow'
import useStyles from './styles'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CustomSelect from '../../../components/customSelect'
import { AllowedRol } from '../../../utils/constants'
import { getRolName } from '../../../utils/functions/roles'
import CreateUserModal from './components/CreateUserModal'
import DeleteModal from '../../../components/DeleteModal'
import CustomSnackbar from '../../../components/customSnackbar'
import TomisBar from '../../../components/TomisBar'

export const specialEntities = [
    {
        name: 'Encargado'
    },
    {
        name: 'Auditor'
    },
    {
        name: 'Seguridad'
    },
    {
        name: 'Expedicion'
    }
]

const Users = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [deleteUserModal, setDeleteUserModal] = useState(false)
    const [openUserModal, setOpenUserModal] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(-1)
    const [selectedUserRol, setSelectedUserRol] = useState(-1)
    const [messageSnackbar, setMessageSnackbar] = useState('')
    const [openSnackbarError, setOpenSnackbarError] = useState(false)
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false)
    const [selectedEntity, setSelectedEntity] = useState('Encargado')
    const managers = useSelector((state: RootState) => state.specialUsers.data.managers)
    const auditors = useSelector((state: RootState) => state.specialUsers.data.auditors)
    const securities = useSelector((state: RootState) => state.specialUsers.data.securities)
    const expeditors = useSelector((state: RootState) => state.specialUsers.data.expeditors)
    const loading = useSelector((state: RootState) => state.specialUsers.loading)
    const success = useSelector((state: RootState) => state.specialUsers.success)
    const error = useSelector((state: RootState) => state.specialUsers.error)

    useEffect(() => {
      console.log(selectedEntity);
      
    }, [selectedEntity])
    

    useEffect(() => {
        dispatch(getSpecialUsers())
    }, [dispatch])

    useEffect(() => {
        setOpenSnackbarSuccess(success)
    }, [success])

    useEffect(() => {
        setOpenSnackbarError(error ? true : false)
        setMessageSnackbar(error?.message || '')
    }, [error])

    const addUser = (
        name: string,
        surname: string,
        rol: number,
        username: string,
        cuit: string,
        password: string,
        email: string) => {
            dispatch(createSpecialUser(name, surname, rol, username, cuit, password, email))
            setMessageSnackbar('Usuario creado con exito')
        }

    const handleDeleteSpecialUser = (id: number, contractorId?: number, rol?: number) => {
        if(!!rol) dispatch(deleteSpecialUser(id, rol))
        setMessageSnackbar('Usuario eliminado con exito')
    }

    const handleDeleteUserModal = (id: number, rol: number) => {
        setSelectedUserId(id)
        setSelectedUserRol(rol)
        setDeleteUserModal(true)
    }

    return (
        <>
            <Modal open={openUserModal} onClose={() => setOpenUserModal(false)}>
                <CreateUserModal
                    setOpenUserModal={setOpenUserModal}
                    addUser={addUser}
                />
            </Modal>
            <Modal open={deleteUserModal} onClose={() => setDeleteUserModal(false)}>
                <DeleteModal entity={'usuario'} id={selectedUserId} handleDelete={handleDeleteSpecialUser} setOpenModal={setDeleteUserModal} rol={selectedUserRol}/>
            </Modal>
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                <Card className={classes.card}>
                    <Grid container justifyContent='space-between'>
                        <Grid item xs={11}>
                            <Grid container>
                                <TomisBar/>
                                <Typography className={classes.textTitle}>Usuarios</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Button onClick={() => setOpenUserModal(true)}>
                                <AddCircleIcon className={classes.circleIcon}/>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' alignItems='center'>
                        <Typography className={classes.placeholderText}>Tipo de usuario</Typography>
                        <CustomSelect value={selectedEntity} setValue={setSelectedEntity} data={specialEntities} />
                    </Grid>
                </Card>
                <Card className={classes.card}>
                    {loading ? 
                        <Grid container alignContent='center' justifyContent='center' >
                            <CircularProgress className={classes.spinner} />
                        </Grid>
                    :
                    <>
                        <>
                            {selectedEntity === getRolName(AllowedRol.manager) &&
                                <>
                                    {managers.length === 0 ?
                                        <text className={classes.textCenter}> No hay encargados registrados</text>
                                        :
                                        <>
                                            <Grid container justifyContent='space-between'>
                                                <Grid item xs={3} className={classes.headerText}>
                                                    <text className={classes.headerText}>
                                                        Nombre
                                                    </text>
                                                </Grid>
                                                <Grid item xs={3} className={classes.headerText}>
                                                    <text className={classes.headerText}>
                                                        Usuario
                                                    </text>
                                                </Grid>
                                                <Grid item xs={2} className={classes.headerText}>
                                                    <text className={classes.headerText}>
                                                        Documento
                                                    </text>
                                                </Grid>
                                                <Grid item xs={2} className={classes.headerText}>
                                                    <text className={classes.headerText}>
                                                        Rol
                                                    </text>
                                                </Grid>
                                                <Grid item xs={1} className={classes.headerText}>
                                                    <text className={classes.headerText}>
                                                        Acciones
                                                    </text>
                                                </Grid>
                                            </Grid>
                                            <Grid container direction='column' justifyContent='space-between' >
                                                {Object.keys(managers).map((key: string, i: any) =>
                                                <Button
                                                    className={classes.button}
                                                    component={Link}
                                                    to={ROUTES.root+ROUTES.manager+'/'+managers[parseInt(key)].id}
                                                >  
                                                    <SpecialUserRow
                                                        key={managers[parseInt(key)].id}
                                                        user={managers[parseInt(key)]}
                                                        handleDeleteSpecialUser={handleDeleteUserModal}
                                                    />
                                                </Button>
                                                )}
                                            </Grid>
                                        </>
                                    }
                                </>
                            }
                        </>
                        {selectedEntity === getRolName(AllowedRol.auditor) &&
                            <>
                                {auditors.length === 0 ?
                                    <text className={classes.textCenter}> No hay auditores registrados</text>
                                    :
                                    <>
                                        <Grid container justifyContent='space-between'>
                                            <Grid item xs={3} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Nombre
                                                </text>
                                            </Grid>
                                            <Grid item xs={3} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Usuario
                                                </text>
                                            </Grid>
                                            <Grid item xs={2} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Documento
                                                </text>
                                            </Grid>
                                            <Grid item xs={2} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Rol
                                                </text>
                                            </Grid>
                                            <Grid item xs={1} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Acciones
                                                </text>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction='column' justifyContent='space-between' >
                                            {Object.keys(auditors).map((key: string, i: any) =>
                                            <Button
                                                className={classes.button}
                                                component={Link}
                                                to={ROUTES.root+ROUTES.auditor+'/'+auditors[parseInt(key)].id}
                                            >  
                                                <SpecialUserRow
                                                    key={auditors[parseInt(key)].id}
                                                    user={auditors[parseInt(key)]}
                                                    handleDeleteSpecialUser={handleDeleteUserModal}
                                                />
                                            </Button>
                                            )}
                                        </Grid>
                                    </>
                                }
                            </>
                        }
                        {selectedEntity === getRolName(AllowedRol.security) &&
                            <>
                                {securities.length === 0 ?
                                    <text className={classes.textCenter}> No hay personal de seguridad registrado</text>
                                    :
                                    <>
                                        <Grid container justifyContent='space-between'>
                                            <Grid item xs={3} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Nombre
                                                </text>
                                            </Grid>
                                            <Grid item xs={3} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Usuario
                                                </text>
                                            </Grid>
                                            <Grid item xs={2} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Documento
                                                </text>
                                            </Grid>
                                            <Grid item xs={2} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Rol
                                                </text>
                                            </Grid>
                                            <Grid item xs={1} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Acciones
                                                </text>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction='column' justifyContent='space-between' >
                                            {Object.keys(securities).map((key: string, i: any) =>
                                            <Button
                                                className={classes.button}
                                                component={Link}
                                                to={ROUTES.root+ROUTES.security+'/'+securities[parseInt(key)].id}
                                            >  
                                                <SpecialUserRow
                                                    key={securities[parseInt(key)].id}
                                                    user={securities[parseInt(key)]}
                                                    handleDeleteSpecialUser={handleDeleteUserModal}
                                                />
                                            </Button>
                                            )}
                                        </Grid>
                                    </>
                                }
                            </>
                        }
                        {selectedEntity === getRolName(AllowedRol.expedition) &&
                            <>
                                {expeditors.length === 0 ?
                                    <text className={classes.textCenter}> No hay personal de expedición registrado</text>
                                    :
                                    <>
                                        <Grid container justifyContent='space-between'>
                                            <Grid item xs={3} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Nombre
                                                </text>
                                            </Grid>
                                            <Grid item xs={3} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Usuario
                                                </text>
                                            </Grid>
                                            <Grid item xs={2} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Documento
                                                </text>
                                            </Grid>
                                            <Grid item xs={2} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Rol
                                                </text>
                                            </Grid>
                                            <Grid item xs={1} className={classes.headerText}>
                                                <text className={classes.headerText}>
                                                    Acciones
                                                </text>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction='column' justifyContent='space-between' >
                                            {Object.keys(expeditors).map((key: string, i: any) =>
                                            <Button
                                                className={classes.button}
                                                component={Link}
                                                to={ROUTES.root+ROUTES.expedition+'/'+expeditors[parseInt(key)].id}
                                            >  
                                                <SpecialUserRow
                                                    key={expeditors[parseInt(key)].id}
                                                    user={expeditors[parseInt(key)]}
                                                    handleDeleteSpecialUser={handleDeleteUserModal}
                                                />
                                            </Button>
                                            )}
                                        </Grid>
                                    </>
                                }
                            </>
                        }
                    </>
                    }
                </Card>
            </Grid>
            <CustomSnackbar open={openSnackbarSuccess && !!messageSnackbar} message={messageSnackbar} type='success' onClose={() =>  setOpenSnackbarSuccess(false)} />
            <CustomSnackbar open={openSnackbarError && !!messageSnackbar} message={messageSnackbar} type='error' onClose={() =>  setOpenSnackbarError(false)} />
        </>
    )
}

export default Users