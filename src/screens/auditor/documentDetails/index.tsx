import React, { useEffect, useState } from 'react';

import { Button, Card, Grid, Modal, TextField} from '@material-ui/core';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import Base64Downloader from 'react-base64-downloader';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewIcon from '@mui/icons-material/Preview';
import useStyles from './styles';
import FileRow from './components/fileRow'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDocumentById, getOwner } from '../../../redux/slices/documentsSlice';
import { RootState } from '../../../redux/rootReducer';
import moment from 'moment';
import globalColors from '../../../utils/styles/globalColors';
import { dividerClasses } from '@mui/material';

const files = [
    {
        'id':'1',
        'name':'Archivo1.jpeg'
    },
    {
        'id':'2',
        'name':'Archivo2.jpeg'
    },
    {
        'id':'3',
        'name':'Archivo3.jpeg'
    },
    {
        'id':'4',
        'name':'Archivo4.jpeg'
    },
]

const DocumentDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const params: any = useParams();
    const [comment, setComment] = useState('')
    const [image, setImage] = useState('')
    const [modalImage, setModalImage] = useState(false)
    const { activeDocument, loading, error } = useSelector((state: RootState) => state.documents)
    const owner = useSelector((state: RootState) => state.documents.owner)

    useEffect(() => {
        dispatch(getDocumentById(params.id))
    }, [dispatch, params])

    useEffect(() => {
        if(!!activeDocument.entityType && !!activeDocument.entityId)
            dispatch(getOwner(activeDocument.entityType, activeDocument.entityId))
    }, [activeDocument])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    }

    useEffect(() => {
        if(image !== '') setModalImage(true)
    }, [image])

    const closeImagePicker = (value: any) => {
        setModalImage(false)
        setImage('')
    }


    const DocumentOwner = {
        name: activeDocument.entityType === 1 || activeDocument.entityType === 2 ? owner?.name : owner?.plate,
        document: activeDocument.entityType === 1 || activeDocument.entityType === 2 ? owner?.cuit : null,
        contractor: activeDocument.entityType === 1 || activeDocument.entityType === 6 ? owner?.contractor : null
    }

    return (
    <>
        <Modal open={modalImage} onClose={() => closeImagePicker} onBackdropClick={closeImagePicker}>
            <div className={classes.imageCard}>
                <img src={image} className={classes.image}/>
            </div>
        </Modal>
        <Grid container className={classes.container} direction='row'>
            <Card className={classes.card}>
                <Grid container justifyContent='space-between'>
                    <text className={classes.textTitle}>
                    {activeDocument.type.name}
                    </text>
                </Grid>
                <Grid container className={classes.documentDataRow} justifyContent='space-between' direction='row'>
                    <Grid item xs={6}>
                        <text className={classes.field}>
                            Vencimiento: 
                        </text>
                        <text className={classes.dataField}>
                            {moment(activeDocument.expirationDate).format('DD/MM/YYYY')}
                        </text>
                    </Grid>
                    <Grid item xs={6}>
                        <text className={classes.field}>
                            Importancia: 
                        </text>
                        <text className={classes.dataField}>
                            {activeDocument.type.severity}
                        </text>
                    </Grid>
                </Grid>
                <Grid container className={classes.documentDataRow} justifyContent='space-between' direction='row'>
                    <Grid item xs={6}>
                        <text className={classes.field}>
                            Dueño del documento: 
                        </text>
                        <text className={classes.dataField}>
                            {DocumentOwner.name}
                        </text>
                    </Grid>
                    {DocumentOwner.document &&
                    <Grid item xs={6}>
                        <text className={classes.field}>
                            Cuit/Cuil: 
                        </text>
                        <text className={classes.dataField}>
                            {DocumentOwner.document}
                        </text>
                    </Grid>
                    }
                </Grid>
                {DocumentOwner.contractor &&
                    <Grid container justifyContent='space-between' direction='row'>
                        <Grid item xs={6}>
                            <text className={classes.field}>
                                Contratista: 
                            </text>
                            <text className={classes.dataField}>
                                {DocumentOwner.contractor.name}
                            </text>
                        </Grid>
                        <Grid item xs={6}>
                            <text className={classes.field}>
                                Cuit: 
                            </text>
                            <text className={classes.dataField}>
                                {DocumentOwner.contractor.cuit}
                            </text>
                        </Grid>
                    </Grid>
                }
            </Card>
            <Grid container className={classes.bottomContainer} direction='row' justifyContent='space-between'>
                <Grid item md={4}>
                    <Card className={classes.filesCard}>
                        <Grid container className={classes.titleContainer} justifyContent='space-between'>
                            <text className={classes.textTitle}>
                                Archivos
                            </text>
                        </Grid>
                        {activeDocument.photos.length > 0 ? 
                            <Grid container direction='column' justifyContent='space-between'>
                                <Grid container justifyContent='space-between'>
                                    {activeDocument.photos.map((value: string, index: number) => {
                                            return(
                                                <Grid key={index} className={classes.filesCard} container direction='row'>
                                                    <Grid item xs={1}>
                                                        <AttachFileIcon/>
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <text style={{fontSize: 15}}>Archivo {index+1}</text>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Base64Downloader 
                                                            base64={value}
                                                            downloadName={`archivo${index+1}`}
                                                            Tag="a"
                                                            extraAttributes={{ href: '#' }}
                                                            className="my-class-name"
                                                            style={{ color: globalColors.lightBlue }}
                                                        >
                                                                <DownloadIcon style={{fontSize: 30}}/>
                                                        </Base64Downloader>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Button 
                                                            size="small" 
                                                            style={{padding: 0}} 
                                                            onClick={() => 
                                                                setImage(value)
                                                            }
                                                        >
                                                            <PreviewIcon style={{fontSize: 30}} />
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Grid>
                            :
                            <text className={classes.textCenter}> No hay archivos cargados</text>
                        } 
                    </Card>
                </Grid>
                <Grid item md={8}>
                    <Card className={classes.commentCard}>
                        <TextField
                            className={classes.textField}
                            id="Comentario"
                            label="Comentario"
                            multiline
                            value={comment}
                            onChange={handleChange}
                            variant="outlined"
                            rows={4}
                        />
                        <Grid container justifyContent='flex-end'>
                            <Button variant="contained" color="inherit" className={classes.rechazar}>Rechazar</Button>
                            <Button variant="contained" color="primary" className={classes.text}>Aceptar</Button>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    </>
    )
}

export default DocumentDetails;