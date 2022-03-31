/* eslint-disable array-callback-return */


import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Button, Grid, } from '@material-ui/core';
import useStyles from './styles';
import { useEffect, useState } from 'react';
import moment from 'moment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CircularProgress from '@mui/material/CircularProgress';
import { useFilePicker } from 'use-file-picker';
 
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/rootReducer';
import { AllowedRol } from '../../../../../utils/constants';
import { getDocumentTypesByEntity } from '../../../../../redux/slices/documentTypesSlice';
import globalColors from '../../../../../utils/styles/globalColors';
import CustomSnackbar from '../../../../../components/customSnackbar';
import CustomSelectObject from '../../../../../components/customSelectObject';


interface Props{
    addDocument: (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[], contractorId: number) => void
    setOpenDriverDocumentModal: React.Dispatch<React.SetStateAction<boolean>>
    driverId: number
    contractorId: number
}

const CreateDriverDocumentModal = ({ addDocument, setOpenDriverDocumentModal, driverId, contractorId }: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [emptyField, setEmptyField] = useState(false)
    const [expirationDate, setExpirationDate] = useState<moment.Moment | null>(null);
    const [documentType, setDocumentType] = useState('')
    const documentTypes = useSelector((state: RootState) => state.documentTypes.data)
    const error = useSelector((state: RootState) => state.documents.drivers.error)
    
    const [openFileSelector, { filesContent, loading }] = useFilePicker({
        multiple: true,
        readAs: 'DataURL',
        accept: ['.png', '.pdf', '.jpeg', '.jpg'],
    });
    
    useEffect(() => {
        dispatch(getDocumentTypesByEntity(AllowedRol.driver))
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
            
            if(!!typeId && !!driverId){
                addDocument(moment(expirationDate), typeId, AllowedRol.driver, driverId, images, contractorId)
                setOpenDriverDocumentModal(false)
            }
        }
        else{
            setEmptyField(true)
        }
    }

    return (
        <Grid className={classes.modal} container direction='column' justify='center' alignItems='center'>
            <Grid item>
                <text className={classes.title}>Cargar documentación</text>
            </Grid>
            <Grid>
                <text className={classes.subtitle}>Conductor</text>
            </Grid>           
            {
                documentTypes &&
                <Grid item xs={12}>
                    <CustomSelectObject value={documentType} placeholder='Documento' setValue={setDocumentType} data={documentTypes}/>
                </Grid>
            }
            <Grid item> 
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
            </Grid>
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
                <Button variant="contained" className={classes.cancel} onClick={ () => setOpenDriverDocumentModal(false)}>Cancelar</Button>
                <Button variant="contained" color='primary' onClick={_handleOnClick}>Crear</Button>
            </Grid>
        </Grid>
    )
}
export default CreateDriverDocumentModal
