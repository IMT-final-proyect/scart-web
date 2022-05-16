import { Button, Grid } from '@material-ui/core'
import { useState } from 'react'
import NumericInput from '../../../../../components/NumericInput'
import useStyles from './styles'

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  _handleEdit: (palletsOut: number) => void
}
const EditArrivalModal = ({ setOpenModal, _handleEdit }: Props) => {
  const classes = useStyles()
  const [palletsOut, setPalletsOut] = useState<number>(0)
  
  const _handleOnClick = () => {
    _handleEdit(palletsOut)
  }

  return (
    <Grid className={classes.modal}>
      <Grid container className={classes.title}>
        <text className={classes.title}>Editar datos del anuncio</text>
      </Grid>
      <Grid className={classes.subtitle}>
        <text className={classes.subtitle}>Cantidad de Pallets de salida</text>
      </Grid>
      <NumericInput value={palletsOut} setValue={setPalletsOut}/>
      <Grid container className={classes.buttons}  direction='row' justifyContent='space-between'>
          <Button variant="contained" className={classes.cancel} onClick={ () => setOpenModal(false)}>Cancelar</Button>
          <Button variant="contained" color='primary' onClick={_handleOnClick}>Crear</Button>
      </Grid>
    </Grid>
  )
}

export default EditArrivalModal