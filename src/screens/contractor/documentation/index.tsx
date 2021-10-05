import React, { useEffect, useState } from 'react';
import { Button, Card, Grid, Modal, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
import DocumentRow from './components/documentRow/DocumentRow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { createDocument, getContractorDocuments } from '../../../redux/slices/contractorSlices/documentsSlice';
import CreateDocumentModal from './components/CreateDocumentModal';
import { IDocument } from '../../../utils/interfaces';

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

    const addDocument = (expirationDate: moment.Moment, type: number, entityType: number, entityId: number) => {
        dispatch(createDocument(expirationDate, type, entityType, entityId))
        setOpenModal(false)
    }


    return (
        <>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <CreateDocumentModal
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
                    <Typography className={classes.textCenter}> No hay documentos asociados</Typography>
                    :
                    <>
                        <Grid container justifyContent='space-between'>
                            <Grid item xs={4} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Documento
                                </text>
                            </Grid>
                            <Grid item xs={2} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Recurso
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
                                    Acciones
                                </text>
                            </Grid>
                        </Grid>
                        <Grid container direction='column' justifyContent='space-between' >
                            {Object.keys(documents).map((key: string, i: any) =>
                                <DocumentRow 
                                    key={documents[parseInt(key)].id}
                                    type={documents[parseInt(key)].type}
                                    contractor={userData?.name}
                                    expiration={documents[parseInt(key)].expirationDate}
                                    state={documents[parseInt(key)].state}
                                />
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