import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import moment from 'moment';
import { contractor, driver, vehicle } from '../../utils/constants';
import { getRolName } from '../../utils/functions/roles';
import { IDocument } from '../../utils/interfaces';
import { AppThunk } from '../store';
var _ = require('lodash');


interface IContractorDocuments {
    data: IDocument[]
    expiring: IDocument[]
    loading: boolean
    error: IError|null
}

interface IDriverDocuments {
    data: IDocument[]
    expiring: IDocument[]
    loading: boolean
    error: IError|null
}

interface IVehicleDocuments {
    data: IDocument[]
    expiring: IDocument[]
    loading: boolean
    error: IError|null
}

interface IEntitiesDocuments {
    contractor: IContractorDocuments
    drivers: IDriverDocuments
    vehicles: IVehicleDocuments
    activeDocument: IDocument
    loading: boolean
    error: IError|null
}

interface IError {
   code: string
   message: string
}

const initialState: IEntitiesDocuments = {
    contractor: {
        data: [],
        expiring: [],
        loading: false,
        error: null
    },
    drivers: {
        data: [],
        expiring: [],
        loading: false,
        error: null
    },
    vehicles: {
        data: [],
        expiring: [],
        loading: false,
        error: null
    },
    activeDocument: {
      id: -1,
      entityId: -1,
      entityType: -1,
      type: {
         id: -1,
         name: '',
         appliesTo: -1,
         severity: '',
      },
      state: -1,
      expirationDate: moment(1),
      photos: []
    },
    loading: false,
    error: null
};

const documentsSlice = createSlice({
   name: 'documents',
   initialState,
   reducers: {
      getContractorDocumentsRequest(state) {
         state.contractor.loading = true;
      },
      getContractorDocumentsSuccess(state, action: any) {
         const { payload } = action
         state.contractor.data = payload
         state.contractor.loading = false;
         state.contractor.error = initialState.contractor.error
      },
      getContractorDocumentsFailure(state, action: any) {
         const { payload } = action
         state.contractor.data = initialState.contractor.data;
         state.contractor.loading = false;
         state.contractor.error = payload;
      },
      getContractorExpiringDocumentsRequest(state) {
        state.contractor.loading = true;
      },
      getContractorExpiringDocumentsSuccess(state, action: any) {
        const { payload } = action
        state.contractor.expiring = payload
        state.contractor.loading = false;
        state.contractor.error = initialState.contractor.error
      },
      getContractorExpiringDocumentsFailure(state, action: any) {
        const { payload } = action
        state.contractor.expiring = initialState.contractor.expiring;
        state.contractor.loading = false;
        state.contractor.error = payload;
      },
      getDriverDocumentsRequest(state) {
         state.drivers.loading = true;
      },
      getDriverDocumentsSuccess(state, action: any) {
         const { payload } = action
         state.drivers.data = payload
         state.drivers.loading = false;
         state.drivers.error = initialState.drivers.error
      },
      getDriverDocumentsFailure(state, action: any) {
         const { payload } = action
         state.drivers.data = initialState.drivers.data;
         state.drivers.loading = false;
         state.drivers.error = payload;
      },
      getVehicleDocumentsRequest(state) {
         state.vehicles.loading = true;
      },
      getVehicleDocumentsSuccess(state, action: any) {
         const { payload } = action
         state.vehicles.data = payload
         state.vehicles.loading = false;
         state.vehicles.error = initialState.vehicles.error
      },
      getVehicleDocumentsFailure(state, action: any) {
         const { payload } = action
         state.vehicles.data = initialState.vehicles.data;
         state.vehicles.loading = false;
         state.vehicles.error = payload;
      },
      getDocumentByIdRequest(state) {
         state.loading = true
      },
      getDocumentByIdSuccess(state, action: any) {
         const { payload } = action
         state.activeDocument = payload
         state.loading = false
         state.error = initialState.error
      },
      getDocumentByIdFailure(state, action: any) {
         const { payload } = action
         state.activeDocument = initialState.activeDocument
         state.error = payload
         state.loading = false
      },
      createDocumentRequest(state) {
         state.loading = true;
      },
      createContractorDocumentSuccess(state, action: any) {
         const { payload } = action
         state.contractor.data = ({...state.contractor.data, [payload.id]: {...payload}})
         state.loading = false;
         state.error = initialState.vehicles.error
      },
      createDriverDocumentSuccess(state, action: any) {
         const { payload } = action
         state.drivers.data = ({...state.drivers.data, [payload.id]: {...payload}})
         state.loading = false;
         state.error = initialState.vehicles.error
      },
      createVehiclesDocumentSuccess(state, action: any) {
         const { payload } = action
         state.vehicles.data = ({...state.vehicles.data, [payload.id]: {...payload}})
         state.loading = false;
         state.error = initialState.vehicles.error
      },
      createDocumentFailure(state, action: any) {
         const { payload } = action
         state.loading = false;
         state.error = payload;
      }
   },
});

const {
    getContractorDocumentsSuccess,
    getContractorDocumentsRequest,
    getContractorDocumentsFailure,
    getContractorExpiringDocumentsSuccess,
    getContractorExpiringDocumentsRequest,
    getContractorExpiringDocumentsFailure,
    getDriverDocumentsRequest,
    getDriverDocumentsSuccess,
    getDriverDocumentsFailure,
    getVehicleDocumentsRequest,
    getVehicleDocumentsSuccess,
    getVehicleDocumentsFailure,
    getDocumentByIdRequest,
    getDocumentByIdSuccess,
    getDocumentByIdFailure,
    createDocumentRequest,
    createContractorDocumentSuccess,
    createDriverDocumentSuccess,
    createVehiclesDocumentSuccess,
    createDocumentFailure
} = documentsSlice.actions;


export default documentsSlice.reducer;

export const getContractorDocuments = (contractorId: number|undefined): AppThunk => async (dispatch) => {
   dispatch(getContractorDocumentsRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/documents?entityId=${contractorId}&entityType=2`);
      const documents = _.mapKeys(response.data, 'id')
      
      dispatch(getContractorDocumentsSuccess(documents));
   }
   catch(error){
      dispatch(getContractorDocumentsFailure(error.response.data));
   }
};

export const getDriverDocuments = (driverId: number|undefined): AppThunk => async (dispatch) => {
   dispatch(getDriverDocumentsRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/documents?entityId=${driverId}&entityType=1`);
      const documents = _.mapKeys(response.data, 'id')
      
      dispatch(getDriverDocumentsSuccess(documents));
   }
   catch(error){
      dispatch(getDriverDocumentsFailure(error.response.data));
   }
};

export const getContractorExpiringDocuments = (contractorId: number|undefined): AppThunk => async (dispatch) => {
  dispatch(getContractorExpiringDocumentsRequest())
  try {
    const before = moment().add(7, 'days');
    const response: AxiosResponse = await Axios.get(`/documents?entityId=${contractorId}&entityType=2&before=${before.format()}`)
    const documents = _.mapKeys(response.data, 'id')

    dispatch(getContractorExpiringDocumentsSuccess(documents));
  } catch (error) {
    dispatch(getContractorExpiringDocumentsFailure(error.response.data));
  }
}

export const getVehicleDocuments = (driverId: number|undefined): AppThunk => async (dispatch) => {
   dispatch(getVehicleDocumentsRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/documents?entityId=${driverId}&entityType=6`);
      const documents = _.mapKeys(response.data, 'id')
      
      dispatch(getVehicleDocumentsSuccess(documents));
   }
   catch(error){
      dispatch(getVehicleDocumentsFailure(error.response.data));
   }
};



export const getDocumentById = (documentId: number): AppThunk => async (dispatch) => {
   dispatch(getDocumentByIdRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/documents/${documentId}`);
      dispatch(getDocumentByIdSuccess(response.data));
   }
   catch(error){
      dispatch(getDocumentByIdFailure(error.response.data));
   }
};

export const createDocument = (
      expirationDate: moment.Moment,
      type: number,
      entityType: number,
      entityId: number,
      images: string[]
   ): AppThunk => async (dispatch) => {
   dispatch(createDocumentRequest());
   try{
      const response: AxiosResponse = await Axios.post('/documents',{
         expirationDate,
         state: 1,
         type,
         entityId,
         entityType,
         photos: images
      });
      
      switch(getRolName(entityType)){
         case contractor: {
            dispatch(createContractorDocumentSuccess(response.data));
            break;
         }
         case driver: {
            dispatch(createDriverDocumentSuccess(response.data));
            break;
         }
         case vehicle: {
            dispatch(createVehiclesDocumentSuccess(response.data));
            break
         }
         default: createDocumentFailure({code: 400, message: 'Entidad no encontrada'})
      }
   }
   catch(error){
      dispatch(createDocumentFailure(error.response.data));
   }
}