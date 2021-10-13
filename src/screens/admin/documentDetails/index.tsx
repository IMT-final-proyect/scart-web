import React, { useState } from 'react';

import { Button, Card, Grid, TextField} from '@material-ui/core';

import useStyles from './styles';
import FileRow from './components/fileRow'

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

const owner = {
    name: 'Contratista S.A.',
    cuit: '30-3643622-9',
    phone: '+5492236778923',
    address: 'Av. Constitucion 1234',
    mail: 'm.romina@gmail.com'
}

const DocumentDetails = () => {
    const classes = useStyles();
    const [comment, setComment] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    }

    return (
        <Grid container className={classes.container} direction='row'>
            <Card className={classes.card}>
                <Grid container justifyContent='space-between'>
                    <text className={classes.textTitle}>
                        Datos del dueño
                    </text>
                </Grid>
                <Grid container justifyContent='space-between' direction='row'>
                    <Grid item xs={2}>
                        <text className={classes.field}>
                            Nombre:
                        </text>
                        <text className={classes.dataField}>
                            {owner.name}
                        </text>
                        
                    </Grid>
                    <Grid item xs={2}>
                        <text className={classes.field}>
                            CUIT: 
                        </text>
                        <text className={classes.dataField}>
                            {owner.cuit}
                        </text>
                    </Grid>
                    <Grid item xs={2}>
                        <text className={classes.field}>
                            Telefono: 
                        </text>
                        <text className={classes.dataField}>
                            {owner.phone}
                        </text>
                    </Grid>
                    <Grid item xs={2}>
                        <text className={classes.field}>
                            Dirección: 
                        </text>
                        <text className={classes.dataField}>
                            {owner.address}
                        </text>
                    </Grid>
                    <Grid item xs={2}>
                        <text className={classes.field}>
                            Email: 
                        </text>
                        <text className={classes.dataField}>
                            {owner.mail}
                        </text>
                    </Grid>
                </Grid>
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