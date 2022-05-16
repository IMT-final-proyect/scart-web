import { Button, Grid } from '@material-ui/core'
import React, { Dispatch } from 'react'
import useStyles from './styles'

export interface Props {
  value: number
  setValue: Dispatch<React.SetStateAction<number>>
}
const NumericInput = ({ value, setValue }: Props) => {
  const classes = useStyles()
  const handleLess = () => {
    if(value>0) setValue(value - 1)
  }
  
  return (
    <Grid container className={classes.container}>
      <Button className={classes.buttonMinum} variant='outlined' onClick={handleLess}>
        <text className={classes.icons}>-</text>
      </Button>
      <Grid className={classes.valueContainer}>
        <text className={classes.text}>{value}</text>
      </Grid>
      <Button className={classes.buttonPlus} variant='outlined' onClick={() => setValue(value + 1)}>
        <text className={classes.icons}>+</text>
      </Button>
    </Grid>
  )
}

export default NumericInput
