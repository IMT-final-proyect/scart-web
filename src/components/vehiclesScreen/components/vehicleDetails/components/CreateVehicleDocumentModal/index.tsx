

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Button, Grid, } from '@material-ui/core';
import useStyles from './styles';
import { useEffect, useState } from 'react';
import moment from 'moment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CircularProgress from '@mui/material/CircularProgress';
import { useFilePicker } from 'use-file-picker';

import CustomSelectObject from '../../../../../customSelectObject'; 
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/rootReducer';
import { getDocumentTypesByEntity } from '../../../../../../redux/slices/documentTypesSlice';
import globalColors from '../../../../../../utils/styles/globalColors';
import { AllowedRol } from '../../../../../../utils/constants';
import CustomSnackbar from '../../../../../customSnackbar';

interface Props{
    addDocument: (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[], contractorId: number) => void
    setOpenVehicleDocumentModal: React.Dispatch<React.SetStateAction<boolean>>
    vehicleId: number
    contractorId: number
}

const CreateVehicleDocumentModal = ({ addDocument, setOpenVehicleDocumentModal, vehicleId, contractorId }: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [emptyField, setEmptyField] = useState(false)
    const [expirationDate, setExpirationDate] = useState<moment.Moment | null>(null);
    const [documentType, setDocumentType] = useState('')
    const documentTypes = useSelector((state: RootState) => state.documentTypes.data)
    const error = useSelector((state: RootState) => state.documents.vehicles.error)

    const [openFileSelector, { filesContent, loading, errors, plainFiles, clear }] = useFilePicker({
        multiple: true,
        readAs: 'DataURL',
        accept: ['.png', '.pdf', '.jpeg', '.jpg'],
    });
    
    useEffect(() => {
        dispatch(getDocumentTypesByEntity(6))
    }, [dispatch])

    const handleExpirationChange = (date: moment.Moment | null) => {
        setExpirationDate(date);
        };

    const _handleOnClick = () => {
        if(!!expirationDate && (!!documentType) && (filesContent.length > 0)){
            let typeId
            (Object.keys(documentTypes).map((key: string) => {
                if (documentTypes[parseInt(key)].name === documentType) typeId = documentTypes[parseInt(key)].id
            }))
            let images: string[] = [] as Array<string> 
            (filesContent.map(file => {
                images.push(file.content)
            }))
            
            if(!!typeId && !!vehicleId){
                addDocument(moment(expirationDate), typeId, AllowedRol.vehicle, vehicleId, images, contractorId)
                setOpenVehicleDocumentModal(false)
            }
        }
        else{
            setEmptyField(true)
        }
    }

    return (
        <Grid className={classes.modal} container direction='column' justify='center' alignItems='center'>
            <text className={classes.title}>Cargar documentación</text>
            <text className={classes.subtitle}>Vehiculo</text>
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
            <text className={classes.filesUploaded}>Archivos cargados: {filesContent.length}</text>
            <CustomSnackbar open={emptyField} message='Falta completar algún campo o adjuntar alguna imagen' type='error' onClose={() => setEmptyField(false)} />
            <CustomSnackbar open={!!error} message={error?.message || ''} type='error' onClose={() => setEmptyField(false)} />
            <Grid container direction='row' justifyContent='space-between'>
                <Button variant="contained" className={classes.cancel} onClick={ () => setOpenVehicleDocumentModal(false)}>Cancelar</Button>
                <Button variant="contained" color='primary' onClick={_handleOnClick}>Crear</Button>
            </Grid>
        </Grid>
    )
}
export default CreateVehicleDocumentModal
