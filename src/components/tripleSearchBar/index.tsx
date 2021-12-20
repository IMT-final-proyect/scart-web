import { Grid, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
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
    fourthValue: any
    setFourthValue: any
    cleanAction: () => void
    className?: string
}

const TripleSearchBar = ({ 
    placeholders,
    firstValue, 
    secondValue, 
    thirdValue, 
    setFirstValue, 
    setSecondValue, 
    setThirdValue, 
    fourthValue,
    setFourthValue,
    cleanAction, 
    className }: Props) => {
    const classes = useStyles()
    const [placeholder, setPlaceholder] = useState<string>(placeholders[0].name)
    
    useEffect(() => {        
        cleanAction()
    }, [cleanAction, placeholder])

    useEffect(() => {
        if (placeholder === placeholders[0].name) {
            setSecondValue('')
            setThirdValue('')
            setFourthValue('')
        }
        if (placeholder === placeholders[1].name) {
            setFirstValue('')
            setThirdValue('')
            setFourthValue('')
        }
        if (placeholder === placeholders[2].name) {
            setFirstValue('')
            setSecondValue('')
            setFourthValue('')
        }
        if (placeholder === placeholders[3].name) {
            setFirstValue('')
            setSecondValue('')
            setThirdValue('')
        }
    }, [placeholder, placeholders, setFirstValue, setFourthValue, setSecondValue, setThirdValue])
    
    return (
        <>
            <Grid container direction='row' alignItems='flex-end'>
                <Typography className={classes.searchTitle}> Filtrar por </Typography>
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
                        <CustomInput variant='outlined' className={classes.input} value={secondValue} setValue={setSecondValue} placeholder={placeholders[1].name} size='small' />
                    </Grid>
                }
                {placeholder === placeholders[2].name && 
                    <Grid item xs={10}>
                        <CustomInput variant='outlined' className={classes.input} value={thirdValue} setValue={setThirdValue}  placeholder={placeholders[2].name} size='small'/>
                    </Grid>
                }
                {placeholder === placeholders[3].name && 
                    <Grid item xs={10}>
                        <CustomInput variant='outlined' className={classes.input} value={fourthValue} setValue={setFourthValue}  placeholder={placeholders[3].name} size='small'/>
                    </Grid>
                }
            </Grid>
        </>
    )
}

export default TripleSearchBar 