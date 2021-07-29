import React from 'react';
import { Card, makeStyles, Theme } from "@material-ui/core"

import globalColors from "../../../../utils/styles/globalColors" 
import { drawerWidth, headerSize } from '../../../../utils/constants';
import image from '../../../../assets/images/pratto.jpg'

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        marginLeft: drawerWidth,
        marginTop: headerSize+20,
    },
    cardContainer:{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginTop: '1%',
        marginRight: '3%',
        marginLeft: '3%',
    },
    topCardContainer:{
        display: 'flex',
        flex: 1,
        marginTop: '1%',
        marginRight: '3%',
        marginLeft: '3%',
    },
    botCardContainer:{
        display: 'flex',
        flex: 1,
        marginTop: '1%',
        marginRight: '3%',
        marginLeft: '3%',
    },
    dataContainer:{
        display: 'flex',
        flexDirection: 'row',
        marginTop: '2.5%',
        marginLeft: '7.5%'
    },
    leftData:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    rightData:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginLeft: '40%',
    },
    dataFieldContainer:{
        display: 'flex',
        flexDirection: 'row'
    },
    dataField:{
        marginBottom: '10%',
        color: globalColors.darkGrey
    },
    data:{
        marginLeft: '5%',
        fontWeight: 'bold'
    },
    imageContainer:{
        marginLeft: '5%',
        marginTop: '2%'
    },
    image:{
        borderRadius: '50%',
        height: 100,
    },
}));

const ResourceDetails = () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Card className={styles.cardContainer}>
                <Card className={styles.topCardContainer}>
                    <div className={styles.imageContainer}>
                        <img src={image} className={styles.image} />
                    </div>
                    <div className={styles.dataContainer}>
                        <div className={styles.leftData}>
                            <div className={styles.dataFieldContainer}>
                                <text className={styles.dataField}> Nombre: </text>
                                <text className={styles.data}> Lucas </text>
                            </div>
                            <div className={styles.dataFieldContainer}>
                                <text className={styles.dataField}> DNI: </text>
                                <text className={styles.data}> 912201831 </text>
                            </div>
                            <div className={styles.dataFieldContainer}>
                                <text className={styles.dataField}> Telefono: </text>
                                <text className={styles.data}> +542234484492 </text>
                            </div>
                        </div>
                        <div className={styles.rightData}>
                        <div className={styles.dataFieldContainer}>
                                <text className={styles.dataField}> Apellido: </text>
                                <text className={styles.data}> Pratto </text>
                            </div>
                            <div className={styles.dataFieldContainer}>
                                <text className={styles.dataField}> Email: </text>
                                <text className={styles.data}> osopratto@hotmail.com </text>
                            </div>
                            <div className={styles.dataFieldContainer}>
                                <text className={styles.dataField}> Fecha de Nac.: </text>
                                <text className={styles.data}> 04/06/1988 </text>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className={styles.botCardContainer}>
                    <Card className={styles.cardContainer}>
                        <text> Vehiculos conducidos </text>
                    </Card>
                    <Card className={styles.cardContainer}>
                        <text> Documentacion </text>
                    </Card>
                </div>
            </Card>
        </div>
    )
}

export default ResourceDetails;