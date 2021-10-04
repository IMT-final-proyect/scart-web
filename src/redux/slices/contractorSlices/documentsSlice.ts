import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import moment from 'moment';
import { contractor, driver, vehicle } from '../../../utils/constants';
import { getRolName } from '../../../utils/functions/getRolePath';
import { IDocument } from '../../../utils/interfaces';
import { AppThunk } from '../../store';
var _ = require('lodash');


interface IContractorDocuments {
    data: IDocument[]
    loading: boolean
    error: IError|null
}

interface IDriverDocuments {
    data: IDocument[]
    loading: boolean
    error: IError|null
}

interface IVehicleDocuments {
    data: IDocument[]
    loading: boolean
    error: IError|null
}

interface IEntitiesDocuments {
    contractor: IContractorDocuments
    drivers: IDriverDocuments
    vehicles: IVehicleDocuments
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
        loading: false,
        error: null
    },
    drivers: {
        data: [],
        loading: false,
        error: null
    },
    vehicles: {
        data: [],
        loading: false,
        error: null
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
      createDocumentRequest(state) {
         state.loading = true;
      },
      createContractorDocumentSuccess(state, action: any) {
         const { payload } = action
         state.contractor.data = ({...state.vehicles.data, [payload.id]: {...payload}})
         state.loading = false;
         state.error = initialState.vehicles.error
      },
      createDriverDocumentSuccess(state, action: any) {
         const { payload } = action
         state.drivers.data = ({...state.vehicles.data, [payload.id]: {...payload}})
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
      const response: AxiosResponse = await Axios.get(`/documents/entity/${contractorId}/type/2`);
      const documents = _.mapKeys(response.data, 'id') 
      console.log(documents);
      
      dispatch(getContractorDocumentsSuccess(documents));
   }
   catch(error){
      dispatch(getContractorDocumentsFailure(error.response.data));
   }
};

export const createDocument = (
   expirationDate: moment.Moment,
   type: number,
   entityType: number,
   entityId: number): AppThunk => async (dispatch) => {
   dispatch(createDocumentRequest());
   try{
      const response: AxiosResponse = await Axios.post('/documents',{
         expirationDate,
         state: 1,
         type,
         entityId,
         entityType
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