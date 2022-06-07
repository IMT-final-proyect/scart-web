import { Button, Grid, TextField } from '@material-ui/core'
import React, { Dispatch } from 'react'
import useStyles from './styles'

export interface Props {
  value: string
  setValue: Dispatch<React.SetStateAction<string>>
}
const NumericInput = ({ value, setValue }: Props) => {
  const classes = useStyles()

  const handleValue = (e: any) => {
    if (!(parseInt(e.target.value) < 0))
      setValue(e.target.value)
  }
  
  return (
    <Grid container className={classes.container}>
      <Grid className={classes.valueContainer}>
        <TextField type='number' className={classes.numericInput} value={value} onChange={handleValue}/>
      </Grid>
    </Grid>
  )
}

export default NumericInput
