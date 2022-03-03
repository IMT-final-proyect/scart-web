import { Button, Grid, Snackbar, TextField, } from '@material-ui/core';
import useStyles from './styles';
import { useCallback, useState } from 'react';
import { Alert } from '@mui/material';
import CustomSnackbar from '../../../../../components/customSnackbar';

interface Props{
    addContractor: (username: string, password: string, email: string, name: string, cuit: string, phone: string, street: string, number: string, city: string, province: string) => void
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateDriverModal = ({ addContractor, setOpenModal }: Props) => {
    const classes = useStyles();
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [cuit, setCuit] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    
    const _onChangeUsername = useCallback((event) => {
        if (!event.target.value.includes(" "))
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

    const _onChangePhone = useCallback((event) => {
        setPhone(event.target.value);
    }, [setPhone]);
    
    const _onChangeEmail = useCallback((event) => {
        setEmail(event.target.value);
    }, [setEmail]);

    const _onChangeCuit = useCallback((event) => {
        if (!event.target.value.includes("-") && !event.target.value.includes(" "))
            setCuit(event.target.value);
    }, [setCuit]);
    
    const _onChangeStreet = useCallback((event) => {
        setStreet(event.target.value);
    }, [setStreet]);
    
    const _onChangeNumber = useCallback((event) => {
        setNumber(event.target.value);
    }, [setNumber]);

    const _onChangeCity = useCallback((event) => {
        setCity(event.target.value);
    }, [setCity]);

    const _onChangeProvince = useCallback((event) => {
        setProvince(event.target.value);
    }, [setProvince]);

    const _handleOnClick = () => {
        if(!!username && !!password && !!email && !!repeatPassword && !!name && !!cuit){
            if (password === repeatPassword){
                if(cuit.length === 11){
                    addContractor(username, password, email, name, cuit, phone, street, number, city, province);
                    setOpenModal(false);
                }
                else {
                    setError(true)
                    setMessage('El cuit no tiene 11 digitos')
                }
            } else {
                setError(true);
                setMessage('Las contraseñas no coiniciden')
            }
        }
        else{
            setError(true);
            setMessage('Faltan completar campos')
        }
    }

    return (
        <Grid className={classes.modal} container direction='column' justify='center' alignItems='center'>
                <text className={classes.title}>Crear contratista</text>
                <text className={classes.subtitle}>Registrar un nuevo contratista</text>
                <Grid>
                    <TextField
                        id="contractor-username"
                        className= {classes.textInput}
                        size="medium"
                        label="Nombre de usuario"
                        value={username}
                        onChange={_onChangeUsername}
                    />
                    <TextField
                            id="contractor-email"
                            variant="standard"
                            className= {classes.textInput}
                            size="medium"
                            label="Email"
                            value={email}
                            onChange={_onChangeEmail}
                        />
                    </Grid>
                <Grid item>
                    <TextField
                        id="contractor-password"
                        type='password'
                        className= {classes.textInput}
                        size="medium"
                        label="Contraseña"
                        value={password}
                        onChange={_onChangePassword}
                    />
                    <TextField
                        id="contractor-repeatpassword"
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
                        id="contractor-name"
                        className= {classes.textInput}
                        size="medium"
                        label="Nombre"
                        value={name}
                        onChange={_onChangeName}
                    />
                    <TextField
                        id="contractor-cuit"
                        type="numeric"
                        className= {classes.textInput}
                        size="medium"
                        label="CUIT"
                        value={cuit}
                        onChange={_onChangeCuit}
                    />
                </Grid>
                <Grid>
                    <TextField
                        id="contractor-phone"
                        type="numeric"
                        className= {classes.textInput}
                        size="medium"
                        label="Telefono"
                        value={phone}
                        onChange={_onChangePhone}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="contractor-street"
                        className= {classes.textInput}
                        size="medium"
                        label="Calle"
                        value={street}
                        onChange={_onChangeStreet}
                    />
                    <TextField
                        id="contractor-number"
                        className= {classes.textInput}
                        type="numeric"
                        size="medium"
                        label="Numero"
                        value={number}
                        onChange={_onChangeNumber}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="contractor-city"
                        className= {classes.textInput}
                        size="medium"
                        label="Ciudad"
                        value={city}
                        onChange={_onChangeCity}
                    />
                    <TextField
                        id="contractor-province"
                        className= {classes.lastTextInput}
                        size="medium"
                        label="Provincia"
                        value={province}
                        onChange={_onChangeProvince}
                    />
                </Grid>
                <CustomSnackbar open={error} message={message} type='error' onClose={() => setError(false)} />
                <Grid container direction='row' justifyContent='space-between'>
                    <Button variant="contained" className={classes.cancel} onClick={ () => setOpenModal(false)}>Cancelar</Button>
                    <Button variant="contained" color='primary' onClick={_handleOnClick}>Crear</Button>
                </Grid>
            </Grid>
    )
}

export default CreateDriverModal