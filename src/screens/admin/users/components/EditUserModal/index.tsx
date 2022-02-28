import { Checkbox, FormControlLabel, Grid, Button } from "@material-ui/core";
import { TextField } from "@mui/material"
import { useCallback, useState } from "react";
import CustomSnackbar from "../../../../../components/customSnackbar";
import { ISpecialUser } from "../../../../../redux/slices/specialUsersSlice";
import useStyles from './styles';

interface Props{
    user: ISpecialUser
    changePassword: boolean
    editUser: (
        user: ISpecialUser, 
        name: string, 
        surname: string, 
        username: string,
        cuit: string, 
        email: string,
        password?: string) => void
    setOpenEditUserModal: React.Dispatch<React.SetStateAction<boolean>>
    setChangePassword: React.Dispatch<React.SetStateAction<boolean>>
}

const EditUserModal = ( {user, changePassword, editUser, setOpenEditUserModal, setChangePassword }: Props ) => {
    const classes = useStyles();
    const [error, setError] = useState(false)
    const [name, setName] = useState(user?.name)
    const [surname, setSurname] = useState(user?.surname)
    const [username, setUsername] = useState(user?.username)
    const [cuit, setCuit] = useState(user?.cuit)
    const [email, setEmail] = useState(user?.email)
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    
    const _onChangePassword = useCallback((event) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const _onChangeRepeatPassword = useCallback((event) => {
        setRepeatPassword(event.target.value);
    }, [setRepeatPassword]);

    const _onChangeName = useCallback((event) => {
        setName(event.target.value);
    }, [setName]);
    
    const _onChangeSurname = useCallback((event) => {
        setSurname(event.target.value);
    }, [setSurname]);

    const _onChangeUsername = useCallback((event) => {
        setUsername(event.target.value);
    }, [setUsername]);

    const _onChangeEmail = useCallback((event) => {
        setEmail(event.target.value);
    }, [setEmail]);
    
    const _onChangeCuit = useCallback((event) => {
        if (!event.target.value.includes("-") && !event.target.value.includes(" "))
            setCuit(event.target.value);
    }, [setCuit]);

      const _handleOnClick = () => {
        if(!!name && !!surname && !!cuit && !!username){
            console.log(cuit);
            
            if(cuit.length === 11){
                if (changePassword){
                    if (password === repeatPassword){
                        editUser(user, name, surname, username, cuit, email, password);
                        setOpenEditUserModal(false);
                    }
                    else {
                        setError(true)
                        setMessage('Las contraseñas no coiniciden')
                    }
                }
                else {
                    editUser(user, name, surname, username, cuit, email);
                    setOpenEditUserModal(false);
                };
            }
            else{
                setError(true)
                setMessage('El cuit debe tener 11 digitos')
            }
        }
        else{
            setError(true);
            setMessage('Falta completar algún campo')
        }
    }

    return (
            <Grid container className={classes.modal} justify='space-between' >
                <Grid container>
                    <text className={classes.title}>Editar usuario</text>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <TextField
                            id="user-name"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="Nombre"
                            value={name}
                            onChange={_onChangeName}
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            id="user-surname"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="Apellido"
                            value={surname}
                            onChange={_onChangeSurname}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <TextField
                            id="user-username"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="Usuario"
                            value={username}
                            onChange={_onChangeUsername}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="user-cuit"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="CUIT"
                            value={cuit}
                            onChange={_onChangeCuit}
                        />
                    </Grid>
                </Grid>
                <Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="user-email"
                            variant="standard"
                            className= {classes.lastTextInput}
                            size="medium"
                            label="Telefono"
                            value={email}
                            onChange={_onChangeEmail}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.checkbox}>
                    <FormControlLabel control={<Checkbox  defaultChecked checked={changePassword} onChange={() => {setChangePassword(!changePassword)}} />} label="Cambiar contraseña" />
                </Grid>
                    <Grid item xs={4} className={classes.passwords}>
                        <TextField
                            id="user-password"
                            variant="standard"
                            type='password'
                            className= {classes.textInput}
                            size="medium"
                            label="Contraseña"
                            value={password}
                            onChange={_onChangePassword}
                            disabled={!changePassword}
                        />
                    </Grid>
                    <Grid item xs={4} className={classes.passwords}>
                        <TextField
                            id="user-repeatpassword"
                            variant="standard"
                            type='password'
                            className= {classes.textInput}
                            size="medium"
                            label="Repetir contraseña"
                            value={repeatPassword}
                            onChange={_onChangeRepeatPassword}
                            disabled={!changePassword}
                        />
                    </Grid>
                <CustomSnackbar open={error} message={message} type='error' onClose={() => setError(false)} />
                <Grid container direction='row' justifyContent='space-between'>
                    <Button variant="contained" className={classes.cancel} onClick={ () => setOpenEditUserModal(false)}>Cancelar</Button>
                    <Button variant="contained" color='primary' onClick={_handleOnClick}>Editar</Button>
                </Grid>
            </Grid>
    )
}

export default EditUserModal