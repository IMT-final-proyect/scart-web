import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Button, Grid, Snackbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import { useEffect, useState } from 'react';
import moment from 'moment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CircularProgress from '@mui/material/CircularProgress';
import { useFilePicker } from 'use-file-picker';

import CustomSelect from '../../../../../components/customSelect';
import CustomSelectObject from '../customSelectObject' 
import { getRolNumber, getRolNumero } from '../../../../../utils/functions/roles';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentTypesByEntity } from '../../../../../redux/slices/documentTypesSlice';
import { RootState } from '../../../../../redux/rootReducer';
import globalColors from '../../../../../utils/styles/globalColors';
import { Alert } from '@mui/material';

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

interface Props{
    addDocument: (expirationDate: moment.Moment, type: number, entityType: number, entityId: number) => void
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
    const contractorId = useSelector((state: RootState) => state.user.userData?.id)

    const [openFileSelector, { filesContent, loading, errors, plainFiles, clear }] = useFilePicker({
    multiple: true,
    readAs: 'DataURL',
    accept: ['.png', '.pdf', '.rar', '.zip', '.jpeg', '.jpg'],
    });

    useEffect(() => {
        console.log(filesContent);
    }, [filesContent])

    useEffect(() => {
        if (!!entityType) dispatch(getDocumentTypesByEntity(getRolNumero(entityType)))
    }, [entityType])

    const handleExpirationChange = (date: moment.Moment | null) => {
        setExpirationDate(date);
      };

    const _handleOnClick = () => {
        if(!!expirationDate && (!!documentType) && (!!entityType)){
            let typeId
            (Object.keys(documentTypes).map((key: string) => {
                if (documentTypes[parseInt(key)].name === documentType) typeId = documentTypes[parseInt(key)].id
            }))
            console.log('contractord: ',contractorId);
            
            if(!!typeId && !!contractorId){
                addDocument(moment(expirationDate), typeId, getRolNumero(entityType), contractorId)
                setOpenDriverModal(false)
            }
        }
        else{
            setEmptyField(true)
        }
    }

    return (
        <Grid className={classes.modal} container direction='column' justify='center' alignItems='center'>
            <Typography className={classes.title}>Cargar documentación</Typography>
            <CustomSelect value={entityType} placeholder='Entidad' setValue={setEntityType} data={entities}/>
            {documentTypes &&
                <CustomSelectObject value={documentType} placeholder='Documento' setValue={setDocumentType} data={documentTypes}/>
            }
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
            <Snackbar className={classes.snackbar} open={emptyField} autoHideDuration={6000} onClose={() => setEmptyField(false)} >
                <Alert onClose={() => setEmptyField(false)} severity="error" sx={{ width: '100%' }}>
                    Falta completar algún campo
                </Alert>
            </Snackbar>
            <Grid container direction='row' justifyContent='space-between'>
                <Button variant="contained" className={classes.cancel} onClick={ () => setOpenDriverModal(false)}>Cancelar</Button>
                <Button variant="contained" color='primary' onClick={_handleOnClick}>Crear</Button>
            </Grid>
        </Grid>
    )
}

export default CreateDocumentModal