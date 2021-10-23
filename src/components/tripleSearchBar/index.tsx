import { Grid, Typography } from "@material-ui/core"
import { useState } from "react"
import CustomInput from "../customInput"
import CustomSelect from "../customSelect"
import useStyles from "./styles"

interface IPlaceholders {
    name: string
}

interface Props {
    placeholders: IPlaceholders[]
    firstValue: any
    setFirstValue: any
    secondValue: any
    setSecondValue: any
    thirdValue: any
    setThirdValue: any
    className?: string
}

const TripleSearchBar = ({ placeholders, firstValue, secondValue, thirdValue, setFirstValue, setSecondValue, setThirdValue, className }: Props) => {
    const classes = useStyles()
    const [placeholder, setPlaceholder] = useState<string>(placeholders[0].name)
    
    return (
        <>
            <Grid container direction='row' alignItems='flex-end'>
                <Typography className={classes.searchTitle}> Filtar por </Typography>
                <CustomSelect value={placeholder} setValue={setPlaceholder} data={placeholders}/>
            </Grid>
            <Grid className={className} container  direction='row' justifyContent='space-between' >
                {placeholder === placeholders[0].name && 
                    <Grid item xs={10}>
                        <CustomInput variant='outlined' className={classes.input} value={firstValue} setValue={setFirstValue} placeholder={placeholders[0].name} size='small' />
                    </Grid>
                }
                {placeholder === placeholders[1].name && 
                    <Grid item xs={10}>
                        <CustomInput variant='outlined' className={classes.input} value={secondValue} setValue={setSecondValue}  placeholder={placeholders[1].name} size='small'/>
                    </Grid>
                }
                {placeholder === placeholders[2].name && 
                    <Grid item xs={10}>
                        <CustomInput variant='outlined' className={classes.input} value={thirdValue} setValue={setThirdValue}  placeholder={placeholders[2].name} size='small'/>
                    </Grid>
                }
            </Grid>
        </>
    )
}

export default TripleSearchBar 