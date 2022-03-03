import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import { IDocumentType } from '../../utils/interfaces';
import { AppThunk } from '../store';
var _ = require('lodash');

interface IError {
    code: string
    message: string
}

interface IDocumentTypes {
    data: IDocumentType[]
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

export const getDocumentTypesByEntity = (entityType: number): AppThunk => async (dispatch) => {
   dispatch(getDocumentTypesByEntityRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/types/${entityType}`);
      const documentTypes = _.mapKeys(response.data, 'id') 
      dispatch(getDocumentTypesByEntitySuccess(documentTypes));
   }
   catch(error: any){
      dispatch(getDocumentTypesByEntityFailure(error.response.data));
   }
};
