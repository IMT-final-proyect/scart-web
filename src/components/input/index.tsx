import React, { memo } from 'react'
import { Paper, TextField } from "@material-ui/core"

import useStyles from './styles'

interface Props {
    value: string
    placeholder: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const Input = ({ value, placeholder, setValue }: Props) => {
    const classes = useStyles();

    const handleOnChange = (event: any) => {
        setValue(event.target.value)
    }
    
    return(
        <TextField
            value={value}
            className={classes.input}
            label={placeholder}
            onChange={handleOnChange}
        />
    )
}

export default memo(Input)