import { Button, Grid, Snackbar, TextField, } from '@material-ui/core';
import useStyles from './styles';
import { useCallback, useState } from 'react';
import { Alert } from '@mui/material';

interface Props{
    addContractor: (username: string, password: string, name: string, cuit: string, street: string, number: string, city: string, province: string) => void
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateDriverModal = ({ addContractor, setOpenModal }: Props) => {
    const classes = useStyles();
    const [emptyField, setEmptyField] = useState(false)
    const [passwordNotRepeated, setPasswordNotRepeated] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [name, setName] = useState('')
    const [cuit, setCuit] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    
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
    
    
    const _onChangeCuit = useCallback((event) => {
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
        if(!!username && !!password && !!repeatPassword && !!name && !!cuit && !!street && !!number && !!city && !!province){
            if (password === repeatPassword){
                addContractor(username, password, name, cuit, street, number, city, province);
                setOpenModal(false);
            } else {
                setPasswordNotRepeated(true);
            }
        }
        else{
            setEmptyField(true);
        }
    }

    return (
        <Grid className={classes.modal} container direction='column' justify='center' alignItems='center'>
                <text className={classes.title}>Crear contratista</text>
                <text className={classes.subtitle}>Registrar un nuevo contratista</text>
                <TextField
                    id="driver-username"
                    className= {classes.textInput}
                    size="medium"
                    label="Nombre de usuario"
                    value={username}
                    onChange={_onChangeUsername}
                />
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
                        id="driver-cuit"
                        className= {classes.textInput}
                        size="medium"
                        label="CUIT"
                        value={cuit}
                        onChange={_onChangeCuit}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="driver-street"
                        className= {classes.textInput}
                        size="medium"
                        label="Calle"
                        value={street}
                        onChange={_onChangeStreet}
                    />
                    <TextField
                        id="driver-number"
                        className= {classes.textInput}
                        size="medium"
                        label="Numero"
                        value={number}
                        onChange={_onChangeNumber}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="driver-city"
                        className= {classes.textInput}
                        size="medium"
                        label="Ciudad"
                        value={city}
                        onChange={_onChangeCity}
                    />
                    <TextField
                        id="driver-province"
                        className= {classes.lastTextInput}
                        size="medium"
                        label="Provincia"
                        value={province}
                        onChange={_onChangeProvince}
                    />
                </Grid>
                <Snackbar className={classes.snackbar} open={emptyField} autoHideDuration={6000} onClose={() => setEmptyField(false)} >
                    <Alert onClose={() => setEmptyField(false)} severity="error" sx={{ width: '100%' }}>
                        Falta completar algún campo
                    </Alert>
                </Snackbar>
                <Snackbar className={classes.snackbar} open={passwordNotRepeated} autoHideDuration={6000} onClose={() => setPasswordNotRepeated(false)}>
                    <Alert onClose={() => setPasswordNotRepeated(false)} severity="error" sx={{ width: '100%' }}>
                        Las contraseñas no coinciden
                    </Alert>
                </Snackbar>
                <Grid container direction='row' justifyContent='space-between'>
                    <Button variant="contained" className={classes.cancel} onClick={ () => setOpenModal(false)}>Cancelar</Button>
                    <Button variant="contained" color='primary' onClick={_handleOnClick}>Crear</Button>
                </Grid>
            </Grid>
    )
}

export default CreateDriverModal