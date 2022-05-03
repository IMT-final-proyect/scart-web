/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { Card, CircularProgress, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import CustomSnackbar from '../../../components/customSnackbar';
import { RootState } from '../../../redux/rootReducer'
import { getArrivals } from '../../../redux/slices/expeditionsSlice'
import { ROUTES } from '../navigation/routes';
import useStyles from './styles';
import CustomInput from '../../../components/customInput';
import { IArrival } from '../../../utils/interfaces';
import ArrivalRow from './components/arrivalRow';

const Today = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [openSuccess, setOpenSuccess] = useState(false)
  const [searchContractor, setSearchContractor] = useState('')
  const [loadingFilter, setLoadingFilter] = useState(false)
  const [arrivalsFiltered, setArrivalsFiltered] = useState<IArrival[]>([])
  const arrivals = useSelector((state: RootState) => state.expeditions.data.evaluated)
  const loading = useSelector((state: RootState) => state.expeditions.loading)
  const success = useSelector((state: RootState) => state.expeditions.success)
  
  useEffect(() => {
    dispatch(getArrivals())
  },[dispatch])

  useEffect(() => {
    setArrivalsFiltered(() => {
        let arrivalsAux: IArrival[] = []
        Object.keys(arrivals).map((key: string, i: any) => {
            arrivalsAux.push(arrivals[parseInt(key)])
        })
        return arrivalsAux
    })
  }, [arrivals])

  useEffect(() => {
      setLoadingFilter(true)
      let arrivalsAux: IArrival[] = []
      if(searchContractor !== ''){
          Object.keys(arrivals).map((key: string, i: any) => {
              const contractorName = arrivals[parseInt(key)].contractor?.toUpperCase()
              if (contractorName?.includes(searchContractor.toUpperCase()))
                  arrivalsAux.push(arrivals[parseInt(key)])
          })
      }
      else{
          Object.keys(arrivals).map((key: string, i: any) => {
              arrivalsAux.push(arrivals[parseInt(key)])
          })
      }
      setArrivalsFiltered(arrivalsAux)
      setLoadingFilter(false)
  }, [arrivals, searchContractor])

  useEffect(() => {
      setOpenSuccess(success)
  }, [success])

  return (
    <>
      <Grid container className={classes.container} direction='row' justifyContent='space-between'>
          <Card className={classes.titleCard}>
              <Grid container className={classes.titleContainer} justifyContent='space-between'>
                  <text className={classes.textTitle}>
                      Anuncios de hoy
                  </text>
              </Grid>
              <Typography className={classes.searchTitle}> Filtrar por </Typography>
              <Grid className={classes.inputContainer} container  direction='row' justifyContent='space-between' >
                      <Grid item xs={10} md={5}>
                          <CustomInput variant='outlined' className={classes.input} value={searchContractor} setValue={setSearchContractor} placeholder={'Nombre del contratista'} size='small' />
                      </Grid>
              </Grid>
          </Card>
          {loading || loadingFilter ?
              <Grid container alignItems='center' justifyContent='center' >
                  <CircularProgress className={classes.spinner} />
              </Grid>
              :
              <Card className={classes.contentCard}>
                  {arrivalsFiltered.length === 0 ? 
                      <Typography className={classes.textCenter}>No se ha anunciado ningún conductor</Typography>
                  :
                      <>
                          <Grid container justifyContent='space-between'>
                              <Grid item xs={3} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Conductor
                                  </text>
                              </Grid>
                              <Grid item xs={3} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Vehiculo
                                  </text>
                              </Grid>
                              <Grid item xs={2} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Contratista
                                  </text>
                              </Grid>
                              <Grid item xs={2} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Horario
                                  </text>
                              </Grid>
                              <Grid item xs={2} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Acciones
                                  </text>
                              </Grid>
                          </Grid>
                          <Grid container direction='column' justifyContent='space-between' >
                              {Object.keys(arrivalsFiltered).map((key: string, i: any) =>
                                  <ArrivalRow 
                                      key={arrivalsFiltered[parseInt(key)].id}
                                      arrival={arrivalsFiltered[parseInt(key)]}
                                      route={ROUTES.root+'/'+arrivalsFiltered[parseInt(key)].id}
                                  />
                              )}
                          </Grid>
                      </>
                  }
              </Card>
          }
      </Grid>
      <CustomSnackbar open={openSuccess} message='Arrivalo evaluado con éxito' type='success' onClose={() => setOpenSuccess(false)} />
    </>
  )
}

export default Today