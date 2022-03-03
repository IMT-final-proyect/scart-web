import React, { memo } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"

import useStyles from './styles'

interface Props {
    value: string
    placeholder?: string
    data: any[]
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const CustomSelect = ({ value, placeholder, data, setValue }: Props) => {
    const classes = useStyles();
    
    const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as string);
    };
    
    return(
    <FormControl className={classes.formControl}>
        {placeholder && <InputLabel id="select">{placeholder}</InputLabel>}
            <Select
                labelId="select"
                id="select"
                value={value}
                onChange={handleSelect}
            >
                {data.map((element) =>
                        <MenuItem value={element.name}>{element.name}</MenuItem>)
                }
            
            </Select>
    </FormControl>
    )
}

export default memo(CustomSelect)