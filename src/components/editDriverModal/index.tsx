import MomentUtils from "@date-io/moment";
import { Checkbox, FormControlLabel, Grid, Button } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Alert, Snackbar, TextField } from "@mui/material"
import moment from "moment";
import { useCallback, useState } from "react";
import { IDriver } from "../../utils/interfaces";
import useStyles from './styles';

interface Props{
    driver: IDriver
    changePassword: boolean
    editDriver: (driver: IDriver, name: string, surname: string, cuit: string, birthdate: moment.Moment, password: string) => void
    setOpenEditDriverModal: React.Dispatch<React.SetStateAction<boolean>>
    setChangePassword: React.Dispatch<React.SetStateAction<boolean>>
}

const EditDriverModal = ( {driver, changePassword, editDriver, setOpenEditDriverModal, setChangePassword }: Props ) => {
    const classes = useStyles();
    const [error, setError] = useState(false)
    const [name, setName] = useState(driver.name)
    const [surname, setSurname] = useState(driver.surname)
    const [cuit, setCuit] = useState(driver.cuit)
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [birthdate, setBirthdate] = useState<moment.Moment | null>(driver.birth_date);
    
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
        if (!event.target.value.includes("-") && !event.target.value.includes(" "))
            setCuit(event.target.value);
    }, [setCuit]);
    
    const handleBirthdateChange = (date: moment.Moment | null) => {
        setBirthdate(date);
      };

      const _handleOnClick = () => {
        if(!!name && !!surname && !!cuit && !!birthdate){
            if(cuit.length === 11){
                if (changePassword){
                    if (password === repeatPassword){
                        editDriver(driver, name, surname, cuit, moment(birthdate), password);
                        setOpenEditDriverModal(false);
                    }
                    else {
                        setError(true)
                        setMessage('Las contraseñas no coiniciden')
                    }
                }
                else {
                    editDriver(driver, name, surname, cuit, moment(birthdate), password);
                    setOpenEditDriverModal(false);
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
            <Grid container className={classes.modal} direction='column' justify='center' alignItems='center'>
                <text className={classes.title}>Editar conductor</text>
                <Grid item className={classes.textInput}>
                    <TextField
                        id="driver-name"
                        variant="standard"
                        className= {classes.textInput}
                        size="medium"
                        label="Nombre"
                        value={name}
                        onChange={_onChangeName}
                    />
                    <TextField
                        id="driver-surname"
                        variant="standard"
                        className= {classes.textInput}
                        size="medium"
                        label="Apellido"
                        value={surname}
                        onChange={_onChangeSurname}
                    />
                </Grid>
                <TextField
                    id="driver-cuit"
                    variant="standard"
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
                <Grid container className={classes.checkbox}>
                    <FormControlLabel control={<Checkbox  defaultChecked checked={changePassword} onChange={() => {setChangePassword(!changePassword)}} />} label="Cambiar contraseña" />
                </Grid>
                <Grid item className={classes.passwords}>
                    <TextField
                        id="driver-password"
                        variant="standard"
                        type='password'
                        className= {classes.textInput}
                        size="medium"
                        label="Contraseña"
                        value={password}
                        onChange={_onChangePassword}
                        disabled={!changePassword}
                    />
                    <TextField
                        id="driver-repeatpassword"
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
                <Snackbar className={classes.snackbar} open={error} autoHideDuration={6000} onClose={() => setError(false)} >
                    <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
                <Grid container direction='row' justifyContent='space-between'>
                    <Button variant="contained" className={classes.cancel} onClick={ () => setOpenEditDriverModal(false)}>Cancelar</Button>
                    <Button variant="contained" color='primary' onClick={_handleOnClick}>Editar</Button>
                </Grid>
            </Grid>
    )
}

export default EditDriverModal