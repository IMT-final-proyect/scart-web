/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { Card, CircularProgress, Grid, Modal, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { useDispatch, useSelector } from 'react-redux'
import CustomSnackbar from '../../../components/customSnackbar';
import { RootState } from '../../../redux/rootReducer'
import { getVisits, putEditVisit } from '../../../redux/slices/expeditionsSlice'
import useStyles from './styles';
import CustomInput from '../../../components/customInput';
import { IVisit } from '../../../utils/interfaces';
import ArrivalRow from './components/arrivalRow';
import moment from 'moment';
import EditArrivalModal from './components/EditArrivalModal';

const Today = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [openSuccess, setOpenSuccess] = useState(false)
  const [searchContractor, setSearchContractor] = useState('')
  const [loadingFilter, setLoadingFilter] = useState(false)
  const [visitsFiltered, setVisitsFiltered] = useState<IVisit[]>([])
  const [before, setBefore] = useState<moment.Moment | null>(null);
  const [after, setAfter] = useState<moment.Moment | null>(moment().utcOffset(-3).set({hour:0,minute:0,second:0,millisecond:0}));
  const [selectedId, setSelectedId] = useState(-1)
  const [openModal, setOpenModal] = useState(false)
  const visits = useSelector((state: RootState) => state.expeditions.data.today)
  const loading = useSelector((state: RootState) => state.expeditions.loading)
  const success = useSelector((state: RootState) => state.expeditions.success)

  useEffect(() => {
      dispatch(getVisits(!!after ? after.toISOString(true) : undefined, !!before ? before.toISOString(true) : undefined))
  },[dispatch, after, before])

  useEffect(() => {
    setVisitsFiltered(() => {
        let visitsAux: IVisit[] = []
        Object.keys(visits).map((key: string, i: any) => {
            visitsAux.push(visits[parseInt(key)])
        })
        return visitsAux
    })
  }, [visits])

  useEffect(() => {
      setLoadingFilter(true)
      let visitsAux: IVisit[] = []
      if(searchContractor !== ''){
          Object.keys(visits).map((key: string, i: any) => {
              const contractorName = visits[parseInt(key)].driver?.contractor?.name?.toUpperCase()
              if (contractorName?.includes(searchContractor.toUpperCase()))
                  visitsAux.push(visits[parseInt(key)])
          })
      }
      else{
          Object.keys(visits).map((key: string, i: any) => {
              visitsAux.push(visits[parseInt(key)])
          })
      }
      setVisitsFiltered(visitsAux)
      setLoadingFilter(false)
  }, [visits, searchContractor])

  useEffect(() => {
    setOpenSuccess(success)
  }, [success])

  const _handleOpenModal = (id: number) => {
    setOpenModal(true)
    setSelectedId(id)
  }

  const _handleEdit = (palletsSalida: number) => {
    dispatch(putEditVisit(selectedId, palletsSalida))
    setOpenModal(false)
  }

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <EditArrivalModal setOpenModal={setOpenModal} _handleEdit={_handleEdit} />
      </Modal>
      <Grid container className={classes.container} direction='row' justifyContent='space-between'>
          <Card className={classes.titleCard}>
              <Grid container className={classes.titleContainer} justifyContent='space-between'>
                  <text className={classes.textTitle}>
                      Historial de visitas
                  </text>
              </Grid>
              <Typography className={classes.searchTitle}> Filtrar por </Typography>
              <Grid className={classes.inputContainer} container  direction='row' justifyContent='space-between' alignItems='center'>
                      <Grid item xs={10} md={5}>
                          <CustomInput variant='outlined' className={classes.input} value={searchContractor} setValue={setSearchContractor} placeholder={'Nombre del contratista'} size='small' />
                      </Grid>
                      <Grid item xs={10} md={3}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                                className={classes.textInput}
                                autoOk
                                variant="inline"
                                format="DD/MM/yyyy"
                                id="after"
                                label="Desde"
                                value={after}
                                onChange={(date) => setAfter(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item xs={10} md={3}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                                className={classes.textInput}
                                autoOk
                                variant="inline"
                                format="DD/MM/yyyy"
                                id="before"
                                label="Hasta"
                                value={before}
                                onChange={(date) => setBefore(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                      </Grid>
              </Grid>
          </Card>
          {loading || loadingFilter ?
              <Grid container alignItems='center' justifyContent='center' >
                  <CircularProgress className={classes.spinner} />
              </Grid>
              :
              <Card className={classes.contentCard}>
                  {visitsFiltered.length === 0 ? 
                      <Typography className={classes.textCenter}>No se ha anunciado ning??n conductor en esas fechas</Typography>
                  :
                      <>
                          <Grid container justifyContent='space-between'>
                              <Grid item xs={1} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Conductor
                                  </text>
                              </Grid>
                              <Grid item xs={1} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Telefono
                                  </text>
                              </Grid>
                              <Grid item xs={1} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Patente
                                  </text>
                              </Grid>
                              <Grid item xs={1} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Tipo de cami??n
                                  </text>
                              </Grid>
                              <Grid item xs={1} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Contratista
                                  </text>
                              </Grid>
                              <Grid item xs={1} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Destino
                                  </text>
                              </Grid>
                              <Grid item xs={1} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Pallets
                                  </text>
                              </Grid>
                              <Grid item xs={1} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Estado
                                  </text>
                              </Grid>
                              <Grid item xs={1} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Horario de llegada
                                  </text>
                              </Grid>
                              <Grid item xs={1} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Horario de ingreso
                                  </text>
                              </Grid>
                              <Grid item xs={1} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Horario de salida
                                  </text>
                              </Grid>
                              <Grid item xs={1} className={classes.headerText}>
                                  <text className={classes.headerText}>
                                      Acciones
                                  </text>
                              </Grid>
                          </Grid>
                          <Grid container direction='column' justifyContent='space-between' >
                              {Object.keys(visitsFiltered).map((key: string, i: any) =>
                                  <ArrivalRow 
                                      key={visitsFiltered[parseInt(key)].id}
                                      index={i}
                                      visit={visitsFiltered[parseInt(key)]}
                                      _handleOpenModal={_handleOpenModal}
                                  />
                              )}
                          </Grid>
                      </>
                  }
              </Card>
          }
      </Grid>
      <CustomSnackbar open={openSuccess} message='Visita modificada con ??xito' type='success' onClose={() => setOpenSuccess(false)} />
    </>
  )
}

export default Today
