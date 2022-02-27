import { Button, Card, Grid, Typography } from '@material-ui/core'
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

const specialEntities = [
    {
        name: 'Encargado'
    },
    {
        name: 'Auditor'
    },
    {
        name: 'Seguridad'
    }
]

const Users = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [deleteUserModal, setDeleteUserModal] = useState(false)
    const [openUserModal, setOpenUserModal] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(-1)
    const [messageSnackbar, setMessageSnackbar] = useState('')
    const [deleteUsersModal, setDeleteUsersModal] = useState(false)
    const [openSnackbarError, setOpenSnackbarError] = useState(false)
    const [openUsersModal, setOpenUsersModal] = useState(false)
    const [openUsersSuccess, setOpenUsersSuccess] = useState(false)
    const [selectedEntity, setSelectedEntity] = useState('Encargado')
    const managers = useSelector((state: RootState) => state.specialUsers.data.managers)
    const auditors = useSelector((state: RootState) => state.specialUsers.data.auditors)
    const securities = useSelector((state: RootState) => state.specialUsers.data.securities)
    const loading = useSelector((state: RootState) => state.specialUsers.loading)
    const success = useSelector((state: RootState) => state.specialUsers.success)
    const error = useSelector((state: RootState) => state.specialUsers.error)

    
    useEffect(() => {
        dispatch(getSpecialUsers())
    }, [dispatch])

    const addUser = (
        name: string,
        surname: string,
        rol: number,
        cuit: string,
        username: string,
        password: string,
        email: string) => {
            dispatch(createSpecialUser(name, surname, rol, cuit, username, password, email))
            setOpenUsersModal(false)
            setMessageSnackbar('Conductor creado con exito')
        }

    const handleDeleteSpecialUser = (id: number, rol: number) => {
        dispatch(deleteSpecialUser(id, rol))
        setMessageSnackbar('Conductor eliminado con exito')
    }

    const handleDeleteUserModal = (id: number) => {
        setSelectedUserId(id)
        setDeleteUserModal(true)
    }


    return (
        <Grid container className={classes.container}>
            <Card className={classes.card}>
                <Grid container justifyContent='space-between'>
                    <Typography className={classes.textTitle}>Usuarios</Typography>
                    <Button onClick={() => setOpenUserModal(true)}>
                                <AddCircleIcon className={classes.circleIcon}/>
                    </Button>
                </Grid>
                <Grid container direction='row' alignItems='center'>
                    <Typography className={classes.placeholderText}>Tipo de usuario</Typography>
                    <CustomSelect value={selectedEntity} setValue={setSelectedEntity} data={specialEntities} />
                </Grid>
            </Card>
            <Card className={classes.card}>
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
                                        handleDeleteSpecialUser={handleDeleteSpecialUser}
                                    />
                                </Button>
                                )}
                            </Grid>
                        </>
                    }
                </>
                }
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
                                        handleDeleteSpecialUser={handleDeleteSpecialUser}
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
                                        handleDeleteSpecialUser={handleDeleteSpecialUser}
                                    />
                                </Button>
                                )}
                            </Grid>
                        </>
                    }
                </>
                }
            </Card>
        </Grid>
    )
}

export default Users