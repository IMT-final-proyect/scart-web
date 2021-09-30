import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import useStyles from './styles';
import { useCallback, useState } from 'react';
import moment from 'moment';

interface Props{
    addDriver: (name: string, surname: string, cuit: string, birthdate: moment.Moment) => void
    setOpenDriverModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateDriverModal = ({ addDriver, setOpenDriverModal }: Props) => {
    const classes = useStyles();
    const [emptyField, setEmptyField] = useState(false)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [cuit, setCuit] = useState('')
    const [birthdate, setBirthdate] = useState<moment.Moment | null>(null);
    
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
        if(!!name && !!surname && !!cuit && !!birthdate){
            addDriver(name, surname, cuit, moment(birthdate))
            setOpenDriverModal(false)
        }
        else{
            setEmptyField(true)
        }
    }

    return (
        <Grid className={classes.modal} container direction='column' justify='center' alignItems='center'>
                <Typography className={classes.title}>Crear conductor</Typography>
                <Typography className={classes.subtitle}>Registrar un nuevo conductor</Typography>
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
                        disableToolbar
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
                {emptyField && 
                    <div className={classes.emptyMessage}>Falta completar algún campo</div>
                }
                <Grid container direction='row' justifyContent='space-between'>
                    <Button variant="contained" className={classes.cancel} onClick={ () => setOpenDriverModal(false)}>Cancelar</Button>
                    <Button variant="contained" color='primary' onClick={_handleOnClick}>Crear</Button>
                </Grid>
            </Grid>
    )
}

export default CreateDriverModal