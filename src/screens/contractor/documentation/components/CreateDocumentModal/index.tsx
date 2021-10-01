import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import useStyles from './styles';
import { useCallback, useState } from 'react';
import moment from 'moment';

interface Props{
    addVehicle: (expirationDate: moment.Moment, state: number, type: number) => void
    setOpenDriverModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateDocumentModal = ({ addVehicle, setOpenDriverModal }: Props) => {
    const classes = useStyles();
    const [emptyField, setEmptyField] = useState(false)
    const [expirationDate, setExpirationDate] = useState<moment.Moment | null>(null);
    const [state, setState] = useState(-1)
    const [type, setType] = useState(-1)

    const handleExpirationChange = (date: moment.Moment | null) => {
        setExpirationDate(date);
      };
    
    const _onChangeState = useCallback((event) => {
        setState(event.target.value);
    }, [setState]);
    
    const _onChangeType = useCallback((event) => {
        setType(event.target.value);
    }, [setType]);

    const _handleOnClick = () => {
        if(!!expirationDate && (state>-1) && (type>-1)){
            addVehicle(moment(expirationDate), state, type)
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
                id="driver-state"
                className= {classes.textInput}
                size="medium"
                label="Estado"
                value={state}
                onChange={_onChangeState}
            />
            <TextField
                id="driver-type"
                className= {classes.textInput}
                size="medium"
                label="Tipo"
                value={type}
                onChange={_onChangeType}
            />
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    className={classes.datePicker}
                    autoOk
                    variant="inline"
                    format="DD/MM/yyyy"
                    id="expiration"
                    label="Fecha de vencimiento"
                    value={expirationDate}
                    onChange={handleExpirationChange}
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

export default CreateDocumentModal