import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import moment from 'moment';
import { AppThunk } from '../../store';
var _ = require('lodash');

export interface IDocument {
   id: number;
   entityId: number;
   entityType: number
   type: number;
   state: number;
   expirationDate: moment.Moment;
}

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
    documents: IDriverDocuments
    vehicles: IVehicleDocuments
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
    documents: {
        data: [],
        loading: false,
        error: null
    },
    vehicles: {
        data: [],
        loading: false,
        error: null
    }
};

const documentsSlice = createSlice({
   name: 'documents',
   initialState,
   reducers: {
      getContractorDocumentsRequest(state) {
         state.documents.loading = true;
      },
      getContractorDocumentsSuccess(state, action: any) {
         const { payload } = action
         state.documents.data = payload
         state.documents.loading = false;
         state.documents.error = initialState.documents.error
      },
      getContractorDocumentsFailure(state, action: any) {
         const { payload } = action
         state.documents.data = initialState.documents.data;
         state.documents.loading = false;
         state.documents.error = payload;
      },
      createDocumentRequest(state) {
         state.documents.loading = true;
      },
      createDocumentSuccess(state, action: any) {
         const { payload } = action
         state.documents.data = ({...state.vehicles.data, [payload.id]: {...payload}})
         state.documents.loading = false;
         state.documents.error = initialState.vehicles.error
      },
      createDocumentFailure(state, action: any) {
         const { payload } = action
         state.documents.loading = false;
         state.documents.error = payload;
      }
   },
});

const {
    getContractorDocumentsSuccess,
    getContractorDocumentsRequest,
    getContractorDocumentsFailure,
    createDocumentRequest,
    createDocumentSuccess,
    createDocumentFailure
} = documentsSlice.actions;


export default documentsSlice.reducer;

export const getContractorDocuments = (contractorId: number|undefined): AppThunk => async (dispatch) => {
   dispatch(getContractorDocumentsRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/documents/entity/${contractorId}/type/2`);
      const documents = _.mapKeys(response.data, 'id') 
      dispatch(getContractorDocumentsSuccess(documents));
   }
   catch(error){
      dispatch(getContractorDocumentsFailure(error.response.data));
   }
};

export const createDocument = (
   expirationDate: moment.Moment,
   state: number, 
   type: number, 
   contractorId: number): AppThunk => async (dispatch) => {
   dispatch(createDocumentRequest());
   try{
      const response: AxiosResponse = await Axios.post('/documents',{
         expirationDate,
         state,
         type,
         contractorId,
         entityType: 2
      });
      dispatch(createDocumentSuccess(response.data));
   }
   catch(error){
      dispatch(createDocumentFailure(error.response.data));
   }
}