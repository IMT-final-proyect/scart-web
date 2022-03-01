import { Button, Grid, TextField, } from '@material-ui/core';
import useStyles from './styles';
import { useCallback, useState } from 'react';
import CustomSelect from '../../../../../components/customSelect'
import CustomSnackbar from '../../../../../components/customSnackbar';
import { specialEntities } from '../..';
import { getRolNumber } from '../../../../../utils/functions/roles';

interface Props{
    addUser: ( 
        name: string, 
        surname: string,
        rol: number, 
        username: string,
        cuit: string, 
        email: string,
        password: string
    ) => void
    setOpenUserModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateUserModal = ({ addUser, setOpenUserModal }: Props) => {
    const classes = useStyles();
    const [emptyField, setEmptyField] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [cuit, setCuit] = useState('')
    const [entityType, setEntityType] = useState('')
    const [passwordNotRepeated, setPasswordNotRepeated] = useState(false);



    const _onChangeUsername = useCallback((event) => {
        setUsername(event.target.value);
    }, [setUsername]);
    
    const _onChangePassword = useCallback((event) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const _onChangeRepeatPassword = useCallback((event) => {
        setRepeatPassword(event.target.value);
    }, [setRepeatPassword]);

    const _onChangeName = useCallback((event) => {
        setName(event.target.value);
    }, [setName]);

    const _onChangeEmail = useCallback((event) => {
        setEmail(event.target.value);
    }, [setEmail]);
    
    const _onChangeSurname = useCallback((event) => {
        setSurname(event.target.value);
    }, [setSurname]);
    
    const _onChangeCuit = useCallback((event) => {
        if (!event.target.value.includes("-") && !event.target.value.includes(" "))
            setCuit(event.target.value);
    }, [setCuit]);

    const _handleOnClick = () => {
        if(!!username && !!password && !!repeatPassword && !!name && !!surname && !!cuit && !!email){
            if(cuit.length === 11){
                if (password === repeatPassword){
                    addUser(name, surname, getRolNumber(entityType), username, cuit, email, password);
                    setOpenUserModal(false);
                }
                else {
                    setPasswordNotRepeated(true);
                }
            }
            else{
                setError(true)
                setMessage('El cuit debe tener 11 digitos')
            }
        }
        else{
            setEmptyField(true);
        }
    }

    return (
        <Grid className={classes.modal} container direction='column' justify='center' alignItems='center'>
            <text className={classes.title}>Crear Usuario</text>
            <text className={classes.subtitle}>Registrar un nuevo usuario</text>
            <Grid item>
                <CustomSelect value={entityType} placeholder='Tipo de usuario' setValue={setEntityType} data={specialEntities}/>
                <TextField
                    id="driver-username"
                    className= {classes.textInput}
                    size="medium"
                    label="Nombre de usuario"
                    value={username}
                    onChange={_onChangeUsername}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="driver-password"
                    type='password'
                    className= {classes.textInput}
                    size="medium"
                    label="Contraseña"
                    value={password}
                    onChange={_onChangePassword}
                />
                <TextField
                    id="driver-repeatpassword"
                    type='password'
                    className= {classes.textInput}
                    size="medium"
                    label="Repetir contraseña"
                    value={repeatPassword}
                    onChange={_onChangeRepeatPassword}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="driver-name"
                    className= {classes.textInput}
                    size="medium"
                    label="Nombre"
                    value={name}
                    onChange={_onChangeName}
                />
                <TextField
                    id="driver-surname"
                    className= {classes.textInput}
                    size="medium"
                    label="Apellido"
                    value={surname}
                    onChange={_onChangeSurname}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="driver-email"
                    className= {classes.lastTextInput}
                    size="medium"
                    label="Email"
                    value={email}
                    onChange={_onChangeEmail}
                />
                <TextField
                    id="driver-cuit"
                    className= {classes.lastTextInput}
                    size="medium"
                    label="CUIT"
                    value={cuit}
                    onChange={_onChangeCuit}
                />
            </Grid>
            <CustomSnackbar open={emptyField} message='Falta completar algún campo' type='error' onClose={() => setEmptyField(false)} />
            <CustomSnackbar open={error} message={message} type='error' onClose={() => setError(false)} />
            <CustomSnackbar open={passwordNotRepeated} message={'Las contraseñas no coinciden'} type='error' onClose={() =>  setPasswordNotRepeated(false)} />
            <Grid container direction='row' justifyContent='space-between'>
                <Button variant="contained" className={classes.cancel} onClick={ () => setOpenUserModal(false)}>Cancelar</Button>
                <Button variant="contained" color='primary' onClick={_handleOnClick}>Crear</Button>
            </Grid>
        </Grid>
    )
}

export default CreateUserModal