import React, { useEffect, useState } from 'react';

import { Button, Card, Grid, TextField} from '@material-ui/core';

import useStyles from './styles';
import FileRow from './components/fileRow'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDocumentById, getOwner } from '../../../redux/slices/documentsSlice';
import { RootState } from '../../../redux/rootReducer';
import moment from 'moment';

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

    const DocumentOwner = {
        name: activeDocument.entityType === 1 || activeDocument.entityType === 2 ? owner?.name : owner?.plate,
        document: activeDocument.entityType === 1 || activeDocument.entityType === 2 ? owner?.cuit : null,
        contractor: activeDocument.entityType === 1 || activeDocument.entityType === 6 ? owner?.contractor : null
    }

    return (
        <Grid container className={classes.container} direction='row'>
            <Card className={classes.card}>
                <Grid container justifyContent='space-between'>
                    <text className={classes.textTitle}>
                        Datos del documento
                    </text>
                </Grid>
                <Grid container className={classes.documentDataRow} justifyContent='space-between' direction='row'>
                    <Grid item xs={6}>
                        <text className={classes.field}>
                            Nombre:
                        </text>
                        <text className={classes.dataField}>
                            {activeDocument.type.name}
                        </text>
                        
                    </Grid>
                    <Grid item xs={3}>
                        <text className={classes.field}>
                            Vencimiento: 
                        </text>
                        <text className={classes.dataField}>
                            {moment(activeDocument.expirationDate).format('DD/MM/YYYY')}
                        </text>
                    </Grid>
                    <Grid item xs={3}>
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
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                <Grid item md={4}>
                    <Card className={classes.card}>
                        <Grid container direction='column' justifyContent='space-between' >
                                {files.map((file) =>
                                    <FileRow 
                                        key={file.id}
                                        name={file.name}
                                    />)
                                }
                        </Grid>
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
    )
}

export default DocumentDetails;