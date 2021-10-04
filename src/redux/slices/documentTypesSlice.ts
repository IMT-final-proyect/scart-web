import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import moment from 'moment';
import { contractor, driver, vehicle } from '../../utils/constants';
import { getRolName } from '../../utils/functions/getRolePath';
import { IDocument } from '../../utils/interfaces';
import { AppThunk } from '../store';
var _ = require('lodash');

interface IError {
    code: string
    message: string
}

interface IDocumentTypes {
    data: IDocument[]
    loading: boolean
    error: IError|null
}

const initialState: IDocumentTypes = {
    data: [],
    loading: false,
    error: null
};

const documentTypesSlice = createSlice({
   name: 'documentTypes',
   initialState,
   reducers: {
      getDocumentTypesByEntityRequest(state){
        state.loading = true;
      },
      getDocumentTypesByEntitySuccess(state, action){
        const { payload } = action
        state.data = payload
        state.loading = false
        state.error = initialState.error
      },
      getDocumentTypesByEntityFailure(state, action){
        const { payload } = action
        state.loading = false;
        state.error = payload;
      },
      createDocumentRequest(state) {
         state.loading = true;
      },
   },
});

const {
    getDocumentTypesByEntityRequest,
    getDocumentTypesByEntitySuccess,
    getDocumentTypesByEntityFailure,
} = documentTypesSlice.actions;


export default documentTypesSlice.reducer;

export const getDocumentTypesByEntity = (entityType: string): AppThunk => async (dispatch) => {
   dispatch(getDocumentTypesByEntityRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/types/${entityType}`);
      const documentTypes = _.mapKeys(response.data, 'id') 
      console.log(documentTypes);
      dispatch(getDocumentTypesByEntitySuccess(documentTypes));
   }
   catch(error){
      dispatch(getDocumentTypesByEntityFailure(error.response.data));
   }
};
