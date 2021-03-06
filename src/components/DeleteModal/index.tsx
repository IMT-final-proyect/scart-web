import { Grid, Typography, Button } from "@material-ui/core"
import useStyles from './styles';

interface Props { 
    entity: string
    id: number
    handleDelete: (id: number, contratorId?: number, rolName?: number) => void
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    rol?: number
}
const DeleteModal = ({ entity, id, handleDelete, setOpenModal, rol }: Props) => {
    const classes = useStyles();
    
    const _handleOnClick = () => {
        if(!!rol) handleDelete(id, 1, rol)
        else handleDelete(id)
        setOpenModal(false)
    }

    return(
        <Grid className={classes.modal} container direction='column' justify='center' alignItems='center'>
            <Typography className={classes.title}>{'¿Está seguro que desea eliminar el '+entity+'?'}</Typography>
            <Grid container direction='row' justifyContent='space-between'>
                <Button variant="contained" className={classes.cancel} onClick={ () => setOpenModal(false)}>Cancelar</Button>
                <Button variant="contained" color='primary' onClick={_handleOnClick}>Eliminar</Button>
            </Grid>
        </Grid>
    )
}

export default DeleteModal