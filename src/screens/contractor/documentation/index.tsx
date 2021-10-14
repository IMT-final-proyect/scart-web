import React, { useEffect, useState } from 'react';
import { Button, Card, Grid, Modal, } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
import DocumentRow from './components/documentRow/DocumentRow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { createDocument, getContractorDocuments } from '../../../redux/slices/documentsSlice';
import CreateContractorDocumentModal from './components/CreateContractorDocumentModal';
import { IDocument } from '../../../utils/interfaces';
import { ROUTES } from '../navigation/routes';
import { Link } from 'react-router-dom';

const Documentacion = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const documents: IDocument[] = useSelector((state: RootState) => state.documents.contractor.data)
    const accountData = useSelector((state: RootState) => state.user.accountData)
    const userData = useSelector((state: RootState) => state.user.userData)

    useEffect(() => {
        dispatch(getContractorDocuments(accountData?.entityId))
    }, [])

    const addDocument = (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[]) => {
        dispatch(createDocument(expirationDate, type, entityType, entityId, images))
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
            <Card className={classes.leftCard}>
                <Grid container justifyContent='space-between'>
                    <text className={classes.textTitle}>
                        Documentación
                    </text>
                    <Button onClick={() => setOpenModal(true)}>
                        <AddCircleIcon className={classes.circleIcon}/>
                    </Button>
                </Grid>
                {documents.length === 0 ?
                    <text className={classes.textCenter}> No hay documentos asociados</text>
                    :
                    <>
                        <Grid container justifyContent='space-between'>
                            <Grid item xs={5} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Documento
                                </text>
                            </Grid>
                            <Grid item xs={3} className={classes.headerText}>
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
                            {Object.keys(documents).map((key: string, i: any) =>
                            <Button
                                className={classes.button}
                                component={Link}
                                to={ROUTES.root+ROUTES.documentacion+'/'+documents[parseInt(key)].id}
                            >  
                                <DocumentRow 
                                    key={documents[parseInt(key)].id}
                                    type={documents[parseInt(key)].type}
                                    expiration={documents[parseInt(key)].expirationDate}
                                    state={documents[parseInt(key)].state}
                                    images={documents[parseInt(key)].photos}
                                />
                            </Button>
                            )}
                        </Grid>
                    </>
                }
                </Card>
        </Grid>
        </>
    )
}

export default Documentacion;