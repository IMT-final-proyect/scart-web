import React, { useEffect, useState } from 'react';
import { Button, Card, CircularProgress, Grid, Modal, Typography, } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { createDocument, getContractorDocuments } from '../../../redux/slices/documentsSlice';
import CreateContractorDocumentModal from './components/CreateContractorDocumentModal';
import { IDocument } from '../../../utils/interfaces';
import { ROUTES } from '../navigation/routes';
import { Link } from 'react-router-dom';
import { getStateName } from '../../../utils/functions/states';
import CustomInput from '../../../components/customInput';
import CustomSelect from '../../../components/customSelect';
import { EXPIRED, PENDING, REJECTED, VALID } from '../../../utils/constants';
import DocumentRow from './components/documentRow/DocumentRow';
import CustomSnackbar from '../../../components/customSnackbar';

const Documentacion = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchState, setSearchState] = useState('')
    const [loadingFilter, setLoadingFilter] = useState(false)
    const [documentsFiltered, setDocumentsFiltered] = useState<IDocument[]>([])
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false)
    const [openSnackbarError, setOpenSnackbarError] = useState(false)
    const documents: IDocument[] = useSelector((state: RootState) => state.documents.contractor.data)
    const accountData = useSelector((state: RootState) => state.user.accountData)
    const loadingDocuments = useSelector((state: RootState) => state.documents.contractor.loading)
    const error = useSelector((state: RootState) => state.documents.error)
    const success = useSelector((state: RootState) => state.documents.success)

    useEffect(() => {
        dispatch(getContractorDocuments(accountData?.entityId))
    }, [accountData?.entityId, dispatch])

    useEffect(() => {
        setOpenSnackbarSuccess(success)
    }, [success])

    useEffect(() => {
        setOpenSnackbarError(!!error)
    }, [error])

    useEffect(() => {
        setDocumentsFiltered(() => {
            let documentsAux: IDocument[] = []
            Object.keys(documents).map((key: string, i: any) => {
                documentsAux.push(documents[parseInt(key)])
            })
            return documentsAux
        })
    }, [documents])

    useEffect(() => {
        setLoadingFilter(true)
        let documentsAux: IDocument[] = []
        if(searchName !== '' || searchState !== ''){
            if(searchState === ''){
                Object.keys(documents).map((key: string, i: any) => {
                    const contractorName = documents[parseInt(key)].type.name.toUpperCase()
                    if (contractorName.includes(searchName.toUpperCase()))
                        documentsAux.push(documents[parseInt(key)])
                })
            }
            else{
                if(searchName === ''){
                    Object.keys(documents).map((key: string, i: any) => {
                        if (getStateName(documents[parseInt(key)].state) === searchState)
                            documentsAux.push(documents[parseInt(key)])
                    })
                }
                else{
                    Object.keys(documents).map((key: string, i: any) => {
                        const contractorName = documents[parseInt(key)].type.name.toUpperCase()
                        if (contractorName.includes(searchName.toUpperCase()) && getStateName(documents[parseInt(key)].state) === searchState)
                            documentsAux.push(documents[parseInt(key)])
                    })
                }
            }
        }
        else{
            Object.keys(documents).map((key: string, i: any) => {
                documentsAux.push(documents[parseInt(key)])
            })
        }
        setDocumentsFiltered(documentsAux)
        setLoadingFilter(false)
    }, [documents, searchName, searchState])

    const addDocument = (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[]) => {
        if (!!accountData)
            dispatch(createDocument(expirationDate, type, entityType, entityId, images, accountData.entityId))
        setOpenModal(false)
    }

    return (
        <>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <CreateContractorDocumentModal
                    setOpenDriverModal={setOpenModal}
                    addDocument={addDocument}
                />
            </Modal>
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                <Card className={classes.card}>
                    <Grid container justifyContent='space-between' alignItems='center'>
                        <Grid item xs={11}>
                            <Grid container direction='row'>
                                <div className={classes.box}/>
                                <text className={classes.textTitle}>
                                    Documentación
                                </text>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Button onClick={() => setOpenModal(true)}>
                                <AddCircleIcon className={classes.circleIcon}/>
                            </Button>
                        </Grid>
                    </Grid>
                    <Typography className={classes.searchTitle}> Filtrar por </Typography>
                    <Grid className={classes.inputContainer} container  direction='row' justifyContent='space-between' alignItems='center'>
                            <Grid item xs={10} md={5}>
                                <CustomInput 
                                    variant='outlined' 
                                    className={classes.input} 
                                    value={searchName} 
                                    setValue={setSearchName} 
                                    placeholder={'Nombre'} 
                                    size='small' 
                                />
                            </Grid>
                            <Grid item xs={10} md={5}>
                                <CustomSelect 
                                    data={[{name: PENDING}, {name: VALID}, {name: REJECTED}, {name: EXPIRED}]} 
                                    value={searchState} setValue={setSearchState}  
                                    placeholder={'Estado'} 
                                />
                            </Grid>
                    </Grid>
                </Card> 
                {loadingFilter || loadingDocuments ?
                    <Grid container alignContent='center' justifyContent='center' >
                        <CircularProgress className={classes.spinner} />
                    </Grid>
                    :
                    <Card className={classes.documentsCard}>
                        {documents.length === 0 ?
                            <text className={classes.textCenter}> No hay documentos asociados</text>
                            :
                            <>
                                <Grid container justifyContent='space-between'>
                                    <Grid item xs={3} className={classes.headerText}>
                                        <text className={classes.headerText}>
                                            Documento
                                        </text>
                                    </Grid>
                                    <Grid item xs={3} className={classes.headerText}>
                                        <text className={classes.headerText}>
                                            Tipo
                                        </text>
                                </Grid>
                                    <Grid item xs={2} className={classes.headerText}>
                                        <text className={classes.headerText}>
                                            Fecha de venc.
                                        </text>
                                    </Grid>
                                    <Grid item xs={2} className={classes.headerText}>
                                        <text className={classes.headerText}>
                                            Estado
                                        </text>
                                    </Grid>
                                    <Grid item xs={2} className={classes.headerText}>
                                        <text className={classes.headerText}>
                                            Importancia
                                        </text>
                                    </Grid>
                                </Grid>
                                <Grid container direction='column' justifyContent='space-between' >
                                    {Object.keys(documentsFiltered).map((key: string, i: any) =>
                                    <Button
                                        className={classes.button}
                                        component={Link}
                                        to={ROUTES.root+ROUTES.documentacion+'/'+documentsFiltered[parseInt(key)].id}
                                    >  
                                        <DocumentRow 
                                            key={documentsFiltered[parseInt(key)].id}
                                            ownerType={documentsFiltered[parseInt(key)].entityType}
                                            type={documentsFiltered[parseInt(key)].type}
                                            expiration={documentsFiltered[parseInt(key)].expirationDate}
                                            state={documentsFiltered[parseInt(key)].state}
                                        />
                                    </Button>
                                    )}
                                </Grid>
                            </>
                        }
                    </Card>
                }
                <CustomSnackbar open={openSnackbarError} message={error?.message || 'No se pudo crear el documento'} type='error' onClose={() => setOpenSnackbarError(false)} />
                <CustomSnackbar open={openSnackbarSuccess} message={'Documento creado con exito'} type='success' onClose={() => setOpenSnackbarSuccess(false)} />
            </Grid>
        </>
    )
}

export default Documentacion;