import React from 'react';
import { Card, makeStyles, Theme } from "@material-ui/core"
import { drawerWidth, headerSize } from '../../../../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        marginLeft: drawerWidth,
        marginTop: headerSize,
    },
    cardContainer:{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: '1%',
        marginRight: '3%',
        marginLeft: '3%',
    },
}));


const ResourceDetails = () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Card>
                <text> Recurso detalle </text>
            </Card>
        </div>
    )
}

export default ResourceDetails;