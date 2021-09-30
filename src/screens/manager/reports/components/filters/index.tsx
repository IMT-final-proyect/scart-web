import React, { useEffect, useState } from 'react'
import { Button, Card, Grid, Typography } from "@material-ui/core"
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles'
import Input from '../../../../../components/input';
import CustomSelect from '../../../../../components/customSelect';

const contractors = [
    {
        name:'Contratista 1'
    },
    {
        name:'Contratista 2'
    },
    {
        name:'Contratista 3'
    },
]

const resourcesType = [
    {
        name:'Conductor'
    },
    {
        name:'Vehiculo'
    },
]

const Filters = () => {
    const classes = useStyles();
    const [contractor, setContractor] = useState<string>('');
    const [resource, setResource] = useState<string>('');
    const [resourceType, setResourceType] = useState<string>('');
    const [fromDate, setFromDate] = useState<moment.Moment | null>(null);
    const [toDate, setToDate] = useState<moment.Moment | null>(null);

    const handleFromDateChange = (date: moment.Moment | null) => {
        setFromDate(date);
      };

    const handleToDateChange = (date: moment.Moment | null) => {
        setToDate(date);
    };

    const handleSearch = () => {
        console.log('filters: '+resource+contractor+resourceType+fromDate?.toString()+toDate?.toString())
    }

    return(
        <Grid container >
            <Card className={classes.card}>
                <Grid container justifyContent='space-between' alignItems='flex-end' >
                    <Grid item xs={6} md={2} className={classes.container}>
                        <Input value={resource} placeholder='Nombre' setValue={setResource} />
                    </Grid>
                    <Grid item xs={6} md={2} className={classes.container}>
                        <CustomSelect value={contractor} placeholder='Contratista' setValue={setContractor} data={contractors}/>
                    </Grid>
                    <Grid item xs={6} md={2} className={classes.container}>
                        <CustomSelect value={resourceType} placeholder='Recurso' setValue={setResourceType} data={resourcesType}/>
                    </Grid>
                    <Grid item xs={6} md={2} className={classes.container}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                autoOk
                                variant="inline"
                                format="DD/MM/yyyy"
                                id="desde"
                                label="Fecha desde"
                                value={fromDate}
                                onChange={handleFromDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={6} md={2} className={classes.container}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>   
                            <KeyboardDatePicker
                                disableToolbar
                                autoOk
                                variant="inline"
                                format="DD/MM/yyyy"
                                id="Hasta"
                                label="Fecha hasta"
                                value={toDate}
                                onChange={handleToDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={6} md={2} className={classes.container}>
                        <Grid container justifyContent='center' alignItems='center'>
                            <Button variant="contained" color="primary" onClick={handleSearch}>
                                <Typography>Search</Typography>
                                <SearchIcon/>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}
export default Filters