import { Button, Card, CircularProgress, Grid, Modal, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import CustomSnackbar from '../../../../../components/customSnackbar';
import { RootState } from '../../../../../redux/rootReducer';
import { editSpecialUser, getSpecialUser, ISpecialUser } from '../../../../../redux/slices/specialUsersSlice';
import { capitalize, getRolNumber } from '../../../../../utils/functions/roles';
import useStyles from './styles'
import EditUserModal from '../EditUserModal';
import { putChangePassword } from '../../../../../redux/slices/userSlice';

const UserDetails = () => {
	const history = useHistory();
	const classes = useStyles()
	const dispatch = useDispatch()
	const [openEditUserModal, setOpenEditUserModal] = useState(false)
	const [openEditUserSuccess, setOpenEditUserSuccess] = useState(false)
	const [openEditUserError, setOpenEditUserError] = useState(false)
	const [changePassword, setChangePassword] = useState(false)
	const [messageSnackbar, setMessageSnackbar] = useState('')
	const user = useSelector((state: RootState) => state.specialUsers.userDetailed)
	const loading = useSelector((state: RootState) => state.specialUsers.loading)
	const success = useSelector((state: RootState) => state.specialUsers.success)
	const error = useSelector((state: RootState) => state.specialUsers.error)

	const { pathname } = history.location 
	const url = pathname.split('/')
	const rolName = capitalize(url[2])
	const rolNumber = getRolNumber(rolName)
	const id = url[3]
	
	useEffect(() => {
		dispatch(getSpecialUser(id, rolNumber)) 
	}, [dispatch, id, rolNumber])
	
	useEffect(() => {
		setOpenEditUserSuccess(success)
}, [success])

useEffect(() => {
		setOpenEditUserError(!!error)
}, [error])

const _editUser = (
	user: ISpecialUser, 
	name: string, 
	surname: string, 
	username: string,
	cuit: string, 
	email: string,
	phone: string,
	password?: string) => {
		dispatch(editSpecialUser(user.id, name, surname,rolNumber, cuit, username, email, phone))
		if (changePassword && !!password) dispatch(putChangePassword(password, user.rol, user.id))
		setMessageSnackbar('Conductor modificado con exito')
}

	return(
		<>
			<Modal open={openEditUserModal} onClose={() => setOpenEditUserModal(false)}>
					<EditUserModal 
							user={user} 
							changePassword={changePassword}
							editUser={_editUser} 
							setOpenEditUserModal={setOpenEditUserModal} 
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
													<Typography className={classes.title}>{rolName}</Typography>
											</Grid>
											<Grid item xs={2}>
													<Button onClick={() => {setOpenEditUserModal(true)}}>
															<EditIcon />
													</Button>
											</Grid>
									</Grid>
									<Grid container direction='row' justifyContent="center" alignItems="center">
											<Typography className={classes.field}>Nombre:</Typography>
											<Typography className={classes.data}>{user?.name || '-'}</Typography>
									</Grid>
									<Grid container direction='row' justifyContent="center" alignItems="center">
											<Typography className={classes.field}>Apellido:</Typography>
											<Typography className={classes.data}>{user?.surname || '-'}</Typography>
									</Grid>
									<Grid container direction='row' justifyContent="center" alignItems="center">
											<Typography className={classes.field}>Usuario:</Typography>
											<Typography className={classes.data}>{user?.username || '-'}</Typography>
									</Grid>
									<Grid container direction='row' justifyContent="center" alignItems="center">
											<Typography className={classes.field}>CUIL:</Typography>
											<Typography className={classes.data}>{user?.cuit || '-'}</Typography>
									</Grid>
									<Grid container direction='row' justifyContent="center" alignItems="center">
											<Typography className={classes.field}>Email:</Typography>
											<Typography className={classes.data}>{user?.email || '-'}</Typography>
									</Grid>
									<Grid container direction='row' justifyContent="center" alignItems="center">
											<Typography className={classes.field}>Telefono:</Typography>
											<Typography className={classes.data}>{user?.phone || '-'}</Typography>
									</Grid>
							</Card>
					</Grid>
			}
			<CustomSnackbar open={openEditUserSuccess && !!messageSnackbar} message={messageSnackbar} type='success' onClose={() =>  setOpenEditUserSuccess(false)} />
			<CustomSnackbar open={openEditUserError} message={'Error editando conductor'} type='error' onClose={() =>  setOpenEditUserError(false)} />
		</>
	)
}

export default UserDetails
