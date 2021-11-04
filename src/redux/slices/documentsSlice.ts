import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import moment from 'moment';
import { contractor, driver, vehicle } from '../../utils/constants';
import { getRolName } from '../../utils/functions/roles';
import { IContractor, IDocument, IDriver, IVehicle } from '../../utils/interfaces';
import { AppThunk } from '../store';
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
    activeDocument: IDocument
    pendingDocuments: IDocument[]
    owner: any
    loading: boolean
    evaluationLoading: boolean
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
    activeDocument: {
      id: -1,
      entityId: -1,
      entityType: -1,
      type: {
         id: -1,
         name: '',
         appliesTo: -1,
         severity: -1,
      },
      state: -1,
      expirationDate: moment(1),
      photos: []
    },
    pendingDocuments: [],
    owner: null,
    loading: false,
    evaluationLoading: false,
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
      createDocumentSuccess(state) {
         state.loading = false;
         state.error = initialState.error
      },
      createDocumentFailure(state, action: any) {
         const { payload } = action
         state.loading = false;
         state.error = payload;
      },
      getDocumentByStateRequest(state) {
         state.loading = true
      },
      getDocumentByStateSuccess(state, action: any) {
         const { payload } = action
         state.pendingDocuments = payload
         state.loading = false
         state.error = initialState.error
      },
      getDocumentByStateFailure(state, action: any) {
         const { payload } = action
         state.pendingDocuments = initialState.pendingDocuments
         state.error = payload
         state.loading = false
      },
      getOwnerRequest(state) {
         state.loading = true
      },
      getOwnerSuccess(state, action: any) {
         const { payload } = action
         state.owner = payload
         state.loading = false
         state.error = initialState.error
      },
      getOwnerFailure(state, action: any) {
         const { payload } = action
         state.owner = initialState.owner
         state.error = payload
         state.loading = false
      },
      postDocumentEvaluationRequest(state) {
         state.evaluationLoading = true
      },
      postDocumentEvaluationSuccess(state) {
         state.evaluationLoading = false
         state.error = initialState.error
      },
      postDocumentEvaluationFailure(state, action: any) {
         const { payload } = action
         state.evaluationLoading = false
         state.error = payload
      },
   },
});

const {
    getContractorDocumentsSuccess,
    getContractorDocumentsRequest,
    getContractorDocumentsFailure,
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
    createDocumentSuccess,
    createDocumentFailure,
    getDocumentByStateRequest,
    getDocumentByStateSuccess,
    getDocumentByStateFailure,
    getOwnerRequest,
    getOwnerSuccess,
    getOwnerFailure,
    postDocumentEvaluationRequest,
    postDocumentEvaluationSuccess,
    postDocumentEvaluationFailure
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

export const getVehicleDocuments = (vehicleId: number|undefined): AppThunk => async (dispatch) => {
   dispatch(getVehicleDocumentsRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/documents?entityId=${vehicleId}&entityType=6`);
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
      await Axios.post('/documents',{
         expirationDate,
         state: 0,
         type,
         entityId,
         entityType,
         photos: images
      });
      dispatch(createDocumentSuccess());

      switch(getRolName(entityType)){
         case contractor: {
            dispatch(getContractorDocuments(entityId));
            break;
         }
         case driver: {
            dispatch(getDriverDocuments(entityId));
            break;
         }
         case vehicle: {
            dispatch(getVehicleDocuments(entityId));
            break
         }
         default: createDocumentFailure({code: 400, message: 'Entidad no encontrada'})
      }
   }
   catch(error){
      dispatch(createDocumentFailure(error.response.data));
   }
}

export const getDocumentByState = (state: number): AppThunk => async (dispatch) => {
   dispatch(getDocumentByStateRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/documents?state=${state}`);
      dispatch(getDocumentByStateSuccess(response.data));
   }
   catch(error){
      dispatch(getDocumentByStateFailure(error.response.data));
   }
};


export const getOwner = (entityType: number, entityId: number): AppThunk => async (dispatch) => {
   dispatch(getOwnerRequest());
   try{
      let url
      switch(entityType){
         case(1):{
            url = `/drivers/${entityId}?relations=contractor`
            break;
         }
         case(2): {
            url = `/contractors/${entityId}`
            break;
         }
         case(6): {
            url = `/vehicles/${entityId}?relations=contractor`
            break;
         }
         default: url=''
      }
      const response: AxiosResponse = await Axios.get(url);
      dispatch(getOwnerSuccess(response.data));
   }
   catch(error){
      dispatch(getOwnerFailure(error.response.data));
   }
};

export const postDocumentEvaluation = (id: number, isApprovation: boolean, comment: string, uuid?: string): AppThunk => async (dispatch) => {
   dispatch(postDocumentEvaluationRequest());
   try{
      if(uuid){
         let nextState
         if(isApprovation) 
            nextState = 1
         else
            nextState = 2
         await Axios.post(`/documents/${id}`,{ state: nextState });
         dispatch(postDocumentEvaluationSuccess());
      }
   }
   catch(error){
      dispatch(postDocumentEvaluationFailure(error.response.data));
   }
};