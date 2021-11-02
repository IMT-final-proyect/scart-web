import React, { useEffect, useState } from 'react';
import { Button, Card, CircularProgress, Grid, } from '@material-ui/core'
import useStyles from './styles' 
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import Base64Downloader from 'react-base64-downloader';
import moment from 'moment';
import PreviewIcon from '@mui/icons-material/Preview';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DownloadIcon from '@mui/icons-material/Download';
import { getDocumentById } from '../../redux/slices/documentsSlice';
import globalColors from '../../utils/styles/globalColors';
import { getStateColor, getStateName } from '../../utils/functions/states';

const DocumentDetails = () => {
    const { activeDocument, loading, error } = useSelector((state: RootState) => state.documents)
    const stateName = getStateName(activeDocument.state)
    const color = getStateColor(stateName)
    const classes = useStyles({color});    
    const dispatch = useDispatch()
    const params: any = useParams();
    const [image, setImage] = useState('')

    useEffect(() => {
        dispatch(getDocumentById(params.id))        
    }, [dispatch, params])

    return (
        <>
        {loading ?
            <Grid container alignContent='center' justifyContent='center' >
                <CircularProgress className={classes.spinner} />
            </Grid>
            :
            <Grid container className={classes.container} direction='column' justifyContent='space-between'>
                <Card className={classes.cardContainer}>
                    <Grid container direction='column' alignItems='flex-start'>
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
                            <div className={classes.stateContainer}>
                                <text className={classes.dataField}> Estado: </text>
                                <text className={classes.stateColor}> {stateName} </text>
                            </div>
                    </Grid>
                </Card>
                <Grid container className={classes.bottomCardContainer} direction='row' justifyContent='space-between'>
                    <Grid item xs={12} md={3}>
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
                                                                style={{ color: globalColors.lightBlue }}
                                                            >
                                                                    <DownloadIcon style={{fontSize: 30}}/>
                                                            </Base64Downloader>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Button size="small" style={{padding: 0}} onClick={() => setImage(value)}>
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
                    <Grid item xs={12} md={9}>
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
        }
        </>
    )
}

export default DocumentDetails;