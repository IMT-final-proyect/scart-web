import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import useStyles from './styles';
import { useEffect, useState } from 'react';
import moment from 'moment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CircularProgress from '@mui/material/CircularProgress';
import { useFilePicker } from 'use-file-picker';

import CustomSelect from '../../../../../components/customSelect';
import { getRolNumber } from '../../../../../utils/functions/getRolePath';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentTypesByEntity } from '../../../../../redux/slices/documentTypesSlice';
import { RootState } from '../../../../../redux/rootReducer';
import globalColors from '../../../../../utils/styles/globalColors';

interface Props{
    addDocument: (expirationDate: moment.Moment, entityType: number, entityId: number) => void
    setOpenDriverModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateDocumentModal = ({ addDocument, setOpenDriverModal }: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [emptyField, setEmptyField] = useState(false)
    const [expirationDate, setExpirationDate] = useState<moment.Moment | null>(null);
    const [documentType, setDocumentType] = useState('')
    const [entityType, setEntityType] = useState('')
    const documentTypes = useSelector((state: RootState) => state.documentTypes.data)
      const [openFileSelector, { filesContent, loading, errors, plainFiles, clear }] = useFilePicker({
        multiple: true,
        readAs: 'DataURL',
        accept: ['.png', '.pdf', '.rar', '.zip', '.jpeg', '.jpg'],
      });

    const entities = [
        {
            name: 'Contratista'
        },
        {
            name: 'Conductor'
        },
        {
            name: 'Vehiculos'
        }
    ]

    useEffect(() => {
        console.log(filesContent);
        
    }, [filesContent])
    useEffect(() => {
        // if (!!entityType) dispatch(getDocumentTypesByEntity(entityType))
    }, [entityType])

    const handleExpirationChange = (date: moment.Moment | null) => {
        setExpirationDate(date);
      };

    const _handleOnClick = () => {
        if(!!expirationDate && (!!documentType) && (!!entityType)){
            const documentId = documentTypes.findIndex(document => document.name === documentType)
            addDocument(moment(expirationDate), documentId, getRolNumber(entityType))
            setOpenDriverModal(false)
        }
        else{
            setEmptyField(true)
        }
    }

    return (
        <Grid className={classes.modal} container direction='column' justify='center' alignItems='center'>
            <Typography className={classes.title}>Cargar documentación</Typography>
            <CustomSelect value={entityType} placeholder='Entidad' setValue={setEntityType} data={entities}/>
            <CustomSelect value={documentType} placeholder='Documento' setValue={setDocumentType} data={documentTypes}/>
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
            <Button onClick={() => openFileSelector()} variant="contained" className={classes.upload}>
                {loading ?
                    <CircularProgress style={{color: globalColors.white}}/>
                :
                <>
                    <AttachFileIcon/>
                    Seleccionar archivos
                </>
                }
            </Button>
            <Typography className={classes.filesUploaded}>Archivos cargados: {filesContent.length}</Typography>
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