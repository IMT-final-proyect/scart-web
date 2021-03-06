import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Button, Grid, Snackbar, } from '@material-ui/core';
import useStyles from './styles';
import { useEffect, useState } from 'react';
import moment from 'moment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CircularProgress from '@mui/material/CircularProgress';
import { useFilePicker } from 'use-file-picker';

import CustomSelect from '../customSelect';
import CustomSelectObject from '../customSelectObject' 
import { getRolNumero } from '../../utils/functions/roles';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentTypesByEntity } from '../../redux/slices/documentTypesSlice';
import { RootState } from '../../redux/rootReducer';
import globalColors from '../../utils/styles/globalColors';
import CustomSnackbar from '../customSnackbar';

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
    accept: ['.png', '.pdf', '.jpeg', '.jpg'],
    });

    useEffect(() => {
        if (!!entityType) dispatch(getDocumentTypesByEntity(getRolNumero(entityType)))
    }, [entityType])

    const handleExpirationChange = (date: moment.Moment | null) => {
        setExpirationDate(date);
      };

    const _handleOnClick = () => {
        if(!!expirationDate && (!!documentType) && (!!entityType) && (filesContent.length > 0)){
            let typeId
            (Object.keys(documentTypes).map((key: string) => {
                if (documentTypes[parseInt(key)].name === documentType) typeId = documentTypes[parseInt(key)].id
            }))
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
            <text className={classes.title}>Cargar documentaci??n</text>
            <CustomSelect value={entityType} placeholder='Entidad' setValue={setEntityType} data={entities}/>
            {documentTypes &&
                <CustomSelectObject value={documentType} placeholder='Documento' setValue={setDocumentType} data={documentTypes}/>
            }
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    className={classes.datePicker}
                    autoOk
                    disablePast
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
            <text className={classes.filesUploaded}>Archivos cargados: {filesContent.length}</text>
            <CustomSnackbar open={emptyField} message='Falta completar alg??n campo o adjuntar alguna imagen' type='error' onClose={() => setEmptyField(false)} />
            <Grid container direction='row' justifyContent='space-between'>
                <Button variant="contained" className={classes.cancel} onClick={ () => setOpenDriverModal(false)}>Cancelar</Button>
                <Button variant="contained" color='primary' onClick={_handleOnClick}>Crear</Button>
            </Grid>
        </Grid>
    )
}

export default CreateDocumentModal