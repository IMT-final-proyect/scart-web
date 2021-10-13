import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Button, Grid, Snackbar, TextField, } from '@material-ui/core';
import useStyles from './styles';
import { useCallback, useState } from 'react';
import moment from 'moment';
import { Alert } from '@mui/material';

interface Props{
    addDriver: (username: string, password: string, name: string, surname: string, cuit: string, birthdate: moment.Moment) => void
    setOpenDriverModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateDriverModal = ({ addDriver, setOpenDriverModal }: Props) => {
    const classes = useStyles();
    const [emptyField, setEmptyField] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [cuit, setCuit] = useState('')
    const [birthdate, setBirthdate] = useState<moment.Moment | null>(null);
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
    
    const _onChangeSurname = useCallback((event) => {
        setSurname(event.target.value);
    }, [setSurname]);
    
    const _onChangeCuit = useCallback((event) => {
        setCuit(event.target.value);
    }, [setCuit]);
    
    const handleBirthdateChange = (date: moment.Moment | null) => {
        setBirthdate(date);
      };

    const _handleOnClick = () => {
        if(!!username && !!password && !!repeatPassword && !!name && !!surname && !!cuit && !!birthdate){
            if (password === repeatPassword){
                addDriver(username, password, name, surname, cuit, moment(birthdate));
                setOpenDriverModal(false);
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
                <text className={classes.title}>Crear conductor</text>
                <text className={classes.subtitle}>Registrar un nuevo conductor</text>
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
                        id="driver-surname"
                        className= {classes.textInput}
                        size="medium"
                        label="Apellido"
                        value={surname}
                        onChange={_onChangeSurname}
                    />
                </Grid>
                <TextField
                    id="driver-cuit"
                    className= {classes.textInput}
                    size="medium"
                    label="CUIT"
                    value={cuit}
                    onChange={_onChangeCuit}
                />
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        className={classes.datePicker}
                        autoOk
                        disableFuture
                        variant="inline"
                        format="DD/MM/yyyy"
                        id="birthdate"
                        label="Fecha de nacimiento"
                        value={birthdate}
                        onChange={handleBirthdateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
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
                    <Button variant="contained" className={classes.cancel} onClick={ () => setOpenDriverModal(false)}>Cancelar</Button>
                    <Button variant="contained" color='primary' onClick={_handleOnClick}>Crear</Button>
                </Grid>
            </Grid>
    )
}

export default CreateDriverModal