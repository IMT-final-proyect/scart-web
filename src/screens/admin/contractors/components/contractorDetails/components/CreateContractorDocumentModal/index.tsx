

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Button, Grid, Snackbar, } from '@material-ui/core';
import useStyles from './styles';
import { useEffect, useState } from 'react';
import moment from 'moment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CircularProgress from '@mui/material/CircularProgress';
import { useFilePicker } from 'use-file-picker';

import CustomSelectObject from '../../../../../../../components/customSelectObject'; 
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@mui/material';
import { RootState } from '../../../../../../../redux/rootReducer';
import { getDocumentTypesByEntity } from '../../../../../../../redux/slices/documentTypesSlice';
import globalColors from '../../../../../../../utils/styles/globalColors';
import CustomSnackbar from '../../../../../../../components/customSnackbar';

interface Props{
    addDocument: (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[]) => void
    setOpenContractorDocumentModal: React.Dispatch<React.SetStateAction<boolean>>
    contractorId: number
}

const CreateContractorDocumentModal = ({ addDocument, setOpenContractorDocumentModal, contractorId }: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [emptyField, setEmptyField] = useState(false)
    const [expirationDate, setExpirationDate] = useState<moment.Moment | null>(null);
    const [documentType, setDocumentType] = useState('')
    const documentTypes = useSelector((state: RootState) => state.documentTypes.data)
    const error = useSelector((state: RootState) => state.documents.contractor.error)

    const [openFileSelector, { filesContent, loading, errors, plainFiles, clear }] = useFilePicker({
        multiple: true,
        readAs: 'DataURL',
        accept: ['.png', '.pdf', '.jpeg', '.jpg'],
    });
    
    useEffect(() => {
        dispatch(getDocumentTypesByEntity(2))
    }, [])

    const handleExpirationChange = (date: moment.Moment | null) => {
        setExpirationDate(date);
        };

    const _handleOnClick = () => {
        if(!!expirationDate && (!!documentType)){
            let typeId
            (Object.keys(documentTypes).map((key: string) => {
                if (documentTypes[parseInt(key)].name === documentType) typeId = documentTypes[parseInt(key)].id
            }))
            let images: string[] = [] as Array<string> 
            (filesContent.map(file => {
                images.push(file.content)
            }))
            
            if(!!typeId && !!contractorId){
                addDocument(moment(expirationDate), typeId, 2, contractorId, images)
                setOpenContractorDocumentModal(false)
            }
        }
        else{
            setEmptyField(true)
        }
    }

    return (
        <Grid className={classes.modal} container direction='column' justify='center' alignItems='center'>
            <text className={classes.title}>Cargar documentación</text>
            <text className={classes.subtitle}>Contratista</text>
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
            <CustomSnackbar open={emptyField} message='Falta completar algún campo' type='error' onClose={() => setEmptyField(false)} />
            <CustomSnackbar open={!!error} message={error?.message || ''} type='error' onClose={() => setEmptyField(false)} />
            <Grid container direction='row' justifyContent='space-between'>
                <Button variant="contained" className={classes.cancel} onClick={ () => setOpenContractorDocumentModal(false)}>Cancelar</Button>
                <Button variant="contained" color='primary' onClick={_handleOnClick}>Crear</Button>
            </Grid>
        </Grid>
    )
}
export default CreateContractorDocumentModal
