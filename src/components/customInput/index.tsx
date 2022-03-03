import React, { memo } from 'react'
import { TextField } from "@material-ui/core"

import useStyles from './styles'

interface Props {
    value: string
    placeholder: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    variant?: 'standard' | 'filled' | 'outlined'
    size?: 'small' | 'medium'
    className?: string
}

const CustomInput = ({ value, placeholder, setValue, variant='standard', size='medium', className }: Props) => {
    const classes = useStyles();

    const handleOnChange = (event: any) => {
        setValue(event.target.value)
    }
    
    return(
        <TextField
            value={value}
            className={className || classes.input}
            label={placeholder}
            variant={variant}
            size={size}
            onChange={handleOnChange}
        />
    )
}

export default memo(CustomInput)