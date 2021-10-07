import React, { useEffect, useState } from 'react';
import { Button, Card, Grid, } from '@material-ui/core'
import useStyles from './styles' 
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import Base64Downloader from 'react-base64-downloader';
import moment from 'moment';
import PreviewIcon from '@mui/icons-material/Preview';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DownloadIcon from '@mui/icons-material/Download';
import { getDocumentById } from '../../redux/slices/contractorSlices/documentsSlice';
import globalColors from '../../utils/styles/globalColors';

const DocumentDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const params: any = useParams();
    const [image, setImage] = useState('')
    const { activeDocument, loading, error } = useSelector((state: RootState) => state.documents)

    useEffect(() => {
        dispatch(getDocumentById(params.id))        
    }, [params])

    return (
        <>
        <Grid container className={classes.container} direction='column' justifyContent='space-between'>
            <Card className={classes.cardContainer}>
                <Grid container justifyContent='space-between' direction='column' alignItems='flex-start'>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Documento: </text>
                            <text className={classes.data}> {activeDocument?.type?.name} </text>
                        </div>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Importancia: </text>
                            <text className={classes.data}> {activeDocument?.type?.severity} </text>
                        </div>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Fecha de vencimiento: </text>
                            <text className={classes.data}> {moment(activeDocument?.expirationDate).format('DD/MM/YY')} </text>
                        </div>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Estado: </text>
                            <text className={classes.data}> {activeDocument?.state} </text>
                        </div>
                </Grid>
            </Card>
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                <Grid item xs={12} lg={3}>
                    <Card className={classes.leftCard}>
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
                                                <Grid key={index} className={classes.leftCard} container direction='row'>
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
                                                        >
                                                            <Button style={{padding: 0, color: globalColors.lightBlue}}>
                                                                <DownloadIcon style={{fontSize: 30}}/>
                                                            </Button>
                                                        </Base64Downloader>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Button style={{padding: 0}} onClick={() => setImage(value)}>
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
                <Grid item xs={12} lg={9}>
                    {!image ?
                        <Card className={classes.noImageSelected}>
                            <text>Selecciona una imagen para visualizar</text> 
                        </Card>
                    :
                        <Card className={classes.rightCard}>
                            <img src={image} className={classes.image}/>
                        </Card>
                    }
                </Grid>
            </Grid>
        </Grid>
        </>
    )
}

export default DocumentDetails;