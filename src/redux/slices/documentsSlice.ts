import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import moment from 'moment';
import { AllowedRol, contractor, driver, vehicle } from '../../utils/constants';
import { getRolName } from '../../utils/functions/roles';
import { IContractor, IDocument, IDriver, IVehicle, IMissingDocument } from '../../utils/interfaces';
import { AppThunk } from '../store';
var _ = require('lodash');


interface IContractorDocuments {
    data: IDocument[]
    expiring: IDocument[]
    loading: boolean
    error: IError|null
    success: boolean
}

interface IDriverDocuments {
    data: IDocument[]
    expiring: IDocument[]
    loading: boolean
    error: IError|null
    success: boolean
}

interface IVehicleDocuments {
    data: IDocument[]
    expiring: IDocument[]
    loading: boolean
    error: IError|null
    success: boolean
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
    evaluationSuccess: boolean
    error: IError|null
    success: boolean
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
        error: null,
        success: false
    },
    drivers: {
        data: [],
        expiring: [],
        loading: false,
        error: null,
        success: false
    },
    vehicles: {
        data: [],
        expiring: [],
        loading: false,
        error: null,
        success: false
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
    evaluationSuccess: false,
    error: null,
    success: false
};

const documentsSlice = createSlice({
   name: 'documents',
   initialState,
   reducers: {
      getContractorDocumentsRequest(state) {
         state.contractor.loading = true;
         state.error = initialState.error
         state.success = initialState.success
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
         state.error = initialState.error
         state.success = initialState.success
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
         state.error = initialState.error
         state.success = initialState.success
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
         state.success = initialState.success
         state.error = initialState.error
      },
      createDocumentSuccess(state) {
         state.loading = false;
         state.error = initialState.error
         state.success = true
      },
      createDocumentFailure(state, action: any) {
         const { payload } = action
         state.loading = false;
         state.error = payload;
      },
      getDocumentByStateRequest(state) {
         state.loading = true
         state.error = initialState.error
         state.evaluationSuccess = initialState.evaluationSuccess
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
         state.success = false
         state.evaluationSuccess = false
      },
      postDocumentEvaluationSuccess(state) {
         state.evaluationLoading = false
         state.error = initialState.error
         state.success = true
         state.evaluationSuccess = true
      },
      postDocumentEvaluationFailure(state, action: any) {
         const { payload } = action
         state.evaluationLoading = false
         state.error = payload
      },
      cleanSnackbar(state) {
         state.error = initialState.error
         state.success = initialState.success
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
    postDocumentEvaluationFailure,
    cleanSnackbar
} = documentsSlice.actions;


export default documentsSlice.reducer;

export const getContractorDocuments = (contractorId: number|undefined): AppThunk => async (dispatch) => {
   dispatch(getContractorDocumentsRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/documents?entityId=${contractorId}&entityType=2`);
      const documents = _.mapKeys(response.data, 'id')
      
      dispatch(getContractorDocumentsSuccess(documents));
   }
   catch(error: any){
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
   catch(error: any){
      dispatch(getDriverDocumentsFailure(error.response.data));
   }
};

export const getContractorExpiringDocuments = (contractorId: number|undefined, date?: moment.Moment | null): AppThunk => async (dispatch) => {
  dispatch(getContractorExpiringDocumentsRequest())
  try {
    let before
    if(!!date) before = date
    else before = moment().add(7, 'days');
    const response: AxiosResponse = await Axios.get(`/documents?entityId=${contractorId}&entityType=2&before=${before.format()}`)
    const documents = _.mapKeys(response.data, 'id')

    dispatch(getContractorExpiringDocumentsSuccess(documents));
  } catch (error) {
    dispatch(getContractorExpiringDocumentsFailure(error.response.data));
  }
}

export const getVehicleDocuments = (vehicleId: number|undefined): AppThunk => async (dispatch) => {
   dispatch(getVehicleDocumentsRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/documents?entityId=${vehicleId}&entityType=6`);
      const documents = _.mapKeys(response.data, 'id')
      
      dispatch(getVehicleDocumentsSuccess(documents));
   }
   catch(error: any){
      dispatch(getVehicleDocumentsFailure(error.response.data));
   }
};



export const getDocumentById = (documentId: number): AppThunk => async (dispatch) => {
   dispatch(getDocumentByIdRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/documents/${documentId}`);
      dispatch(getDocumentByIdSuccess(response.data));
   }
   catch(error: any){
      dispatch(getDocumentByIdFailure(error.response.data));
   }
};

export const createDocument = (
      expirationDate: moment.Moment,
      type: number,
      entityType: number,
      entityId: number,
      images: string[],
      contractorId: number
   ): AppThunk => async (dispatch) => {
   dispatch(createDocumentRequest());
   try{      
      await Axios.post('/documents',{
         expirationDate,
         state: 0,
         type,
         entityId,
         entityType,
         photos: images,
         contractorId
      });
      dispatch(createDocumentSuccess());
      
      switch(entityType){
         case AllowedRol.contractor: {
            dispatch(getContractorDocuments(entityId));
            break;
         }
         case AllowedRol.driver: {
            dispatch(getDriverDocuments(entityId));
            break;
         }
         case AllowedRol.vehicle: {
            dispatch(getVehicleDocuments(entityId));
            break
         }
         default: createDocumentFailure({code: 400, message: 'Entidad no encontrada'})
      }
   }
   catch(error: any){
      dispatch(createDocumentFailure(error.response.data));
   }
}

export const getDocumentByState = (state: number): AppThunk => async (dispatch) => {
   dispatch(getDocumentByStateRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/documents?state=${state}&expand[]=contractor`);
      dispatch(getDocumentByStateSuccess(response.data));
   }
   catch(error: any){
      dispatch(getDocumentByStateFailure(error?.response?.data));
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
   catch(error: any){
      dispatch(getOwnerFailure(error.response.data));
   }
};

export const postDocumentEvaluation = (id: number, isApprovation: boolean, comment: string, uuid?: string): AppThunk => async (dispatch) => {
   dispatch(postDocumentEvaluationRequest());
   try{
      
      if(uuid){
         let nextState
         if(isApprovation) nextState = 1
         else nextState = 2
         await Axios.post(`/documents/${id}`,
         { 
            state: nextState.toString(), 
            comment, 
            auditorUuid: uuid,
         });
         dispatch(postDocumentEvaluationSuccess());
      }
   }
   catch(error: any){
      dispatch(postDocumentEvaluationFailure(error.response.data));
   }
};


export const _cleanSnackbar = (): AppThunk => async (dispatch) => {
   setTimeout(() => {
      dispatch(cleanSnackbar());
    }, 6000);
};