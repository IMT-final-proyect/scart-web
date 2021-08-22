import React, { useState } from 'react'
import { Card, Grid, IconButton, Paper, InputBase, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles'

const Filters = () => {
    const classes = useStyles();
    const [contractor, setContractor] = useState('');

    const Search = () => (
        <Paper component="form" className={classes.paper}>
            <InputBase
                className={classes.input}
                placeholder="Buscar"
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )

    const handleContractor = (event: React.ChangeEvent<{ value: unknown }>) => {
        setContractor(event.target.value as string);
      };

    const Contratista = () => (
        <FormControl className={classes.formControl}>
            <InputLabel id="contractor">Contratista</InputLabel>
                <Select
                    labelId="contractor"
                    id="contractor-select"
                    value={contractor}
                    onChange={handleContractor}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
      </FormControl>
    )

    return(
        <Grid container className={classes.container} direction='column' justifyContent='space-between'>
            <Card className={classes.card}>
                <Search/>
                <Contratista/>
            </Card>
        </Grid>
    )
}

export default Filters