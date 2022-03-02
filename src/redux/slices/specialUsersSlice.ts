import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import { AllowedRol } from '../../utils/constants';
import { IDocument, IException, IMissingDocument } from '../../utils/interfaces';
import { AppThunk } from '../store';
var _ = require('lodash');

interface IError {
    code: string
    message: string
 }

export interface ISpecialUser {
    id: number;
    name: string;
    surname: string;
    rol: number;
    cuit: string;
    username: string;
    email: string;
 }

 interface ISpecialUserState {
     data: {
         managers: ISpecialUser[],
         auditors: ISpecialUser[],
         securities: ISpecialUser[]
     },
     userDetailed: ISpecialUser,
     loading: boolean,
     error: IError | null,
     success: boolean
 }

const initialState: ISpecialUserState = {
    data: {
        managers: [],
        auditors: [],
        securities: []
    },
    userDetailed: {
      id: -1,
      name: '',
      surname: '',
      rol: -1,
      cuit: '',
      username: '',
      email: ''
    },
    loading: false,
    error: null,
    success: false,
};

const specialUsersSlice = createSlice({
  name: 'specialUsers',
  initialState,
  reducers: {
    getSpecialUsersRequest(state) {
        state.loading = true;
        state.error = initialState.error
        state.success = initialState.success
    },
    getSpecialUsersSuccess(state, action: any) {
        const { payload } = action
        state.data.managers = payload.managersById
        state.data.auditors = payload.auditorsById
        state.data.securities = payload.securitiesById
        state.loading = false;
        state.error = initialState.error
    },
    getSpecialUsersFailure(state, action: any) {
        const { payload } = action
        state.loading = false;
        state.error = payload;
    },
    createSpecialUserRequest(state) {
      state.loading = true;
      state.error = initialState.error;
      state.success = initialState.success;
    },
    createManagerSuccess(state, action: any) {
        const { payload } = action
        state.data.managers = ({...state.data.managers, [payload.id]: {...payload}})
        state.loading = false;
        state.success = true;
        state.error = initialState.error
    },
    createAuditorSuccess(state, action: any) {
      const { payload } = action
      state.data.auditors = ({...state.data.auditors, [payload.id]: {...payload}})
      state.loading = false;
      state.success = true;
      state.error = initialState.error
    },
    createSecuritySuccess(state, action: any) {
      const { payload } = action
      state.data.securities = ({...state.data.securities, [payload.id]: {...payload}})
      state.loading = false;
      state.success = true;
      state.error = initialState.error
    },
    createSpecialUserFailure(state, action: any) {
        const { payload } = action
        state.loading = false;
        state.error = payload;
        state.success = initialState.success;
    },
    deleteSpecialUserRequest(state) {
      state.loading = true;
      state.error = initialState.error;
      state.success = initialState.success;
    },
    deleteSpecialUserSuccess(state) {
        state.loading = false;
        state.success = true;
        state.error = initialState.error
    },
    deleteSpecialUserFailure(state, action: any) {
        const { payload } = action
        state.loading = false;
        state.error = payload;
        state.success = initialState.success;
    },
    getSpecialUserRequest(state) {
      state.loading = true;
      state.error = initialState.error;
      state.success = initialState.success;
    },
    getSpecialUserSuccess(state, action: any) {
      const { payload } = action
      state.userDetailed = payload
      state.loading = false;
      state.success = true;
      state.error = initialState.error
    },
    getSpecialUserFailure(state, action: any) {
        const { payload } = action
        state.loading = false;
        state.error = payload;
        state.success = initialState.success;
    },
    editSpecialUserRequest(state) {
      state.loading = true;
      state.error = initialState.error;
      state.success = initialState.success;
    },
    editSpecialUserSuccess(state, action: any) {
        const { payload } = action
        state.userDetailed = payload
        state.loading = false;
        state.success = true;
        state.error = initialState.error
    },
    editSpecialUserFailure(state, action: any) {
        const { payload } = action
        state.loading = false;
        state.error = payload;
        state.success = initialState.success;
    },
  },
});

const {
  getSpecialUsersRequest,
  getSpecialUsersSuccess,
  getSpecialUsersFailure,
  createSpecialUserRequest,
  createManagerSuccess,
  createAuditorSuccess,
  createSecuritySuccess,
  createSpecialUserFailure,
  deleteSpecialUserRequest,
  deleteSpecialUserSuccess,
  deleteSpecialUserFailure,
  getSpecialUserRequest,
  getSpecialUserSuccess,
  getSpecialUserFailure,
  editSpecialUserRequest,
  editSpecialUserSuccess,
  editSpecialUserFailure
} = specialUsersSlice.actions;


export default specialUsersSlice.reducer;

export const getSpecialUsers = (): AppThunk => async (dispatch) => {
   dispatch(getSpecialUsersRequest());
   try{
      const managers: AxiosResponse = await Axios.get(`/managers`);
      const managersById = _.mapKeys(managers.data, 'id')
      Object.keys(managersById).map((key) => {
          _.assign(managersById[key], {rol: AllowedRol.manager})
          return true
      })
      const auditors: AxiosResponse = await Axios.get(`/auditors`);
      const auditorsById = _.mapKeys(auditors.data, 'id')
      Object.keys(auditorsById).map((key) => {
        _.assign(auditorsById[key], {rol: AllowedRol.auditor})
        return true
      })
        const securities: AxiosResponse = await Axios.get(`/securities`);
        const securitiesById = _.mapKeys(securities.data, 'id')
        Object.keys(securitiesById).map((key) => {
          _.assign(securitiesById[key], {rol: AllowedRol.security})
          return true
      })
      
      const data = {
        managersById,
        auditorsById,
        securitiesById
      }
      dispatch(getSpecialUsersSuccess(data));
   }
   catch(error: any){
      dispatch(getSpecialUsersFailure(error.response.data));
   }
};

export const createSpecialUser = (
  name: string,
  surname: string,
  rol: number,
  cuit: string,
  username: string,
  password: string,
  email: string): AppThunk => async (dispatch) => {
    dispatch(createSpecialUserRequest());
    try{
      switch(rol){
        case AllowedRol.manager: {
          const manager: AxiosResponse = await Axios.post(`/register/manager`,
          {
            name,
            surname,
            rol,
            cuit,
            username,
            password,
            email
          })
          dispatch(createManagerSuccess(manager.data.userData))
          break
        }
        case AllowedRol.auditor: {
          const auditor: AxiosResponse = await Axios.post(`/register/auditor`,
          {
            name,
            surname,
            rol,
            cuit,
            username,
            password,
            email
          });
          dispatch(createAuditorSuccess(auditor.data.userData))
          break
        }
        case AllowedRol.security: {
          const security: AxiosResponse = await Axios.post(`/register/security`, 
          {
            name,
            surname,
            rol,
            cuit,
            username,
            password,
            email
          });
          dispatch(createSecuritySuccess(security.data.userData))
          break
        }
      }
    }
    catch(error: any){
       dispatch(createSpecialUserFailure(error.response.data));
    }
 };
 
 export const deleteSpecialUser = (id: number, rol: number): AppThunk => async (dispatch) => {
    dispatch(deleteSpecialUserRequest());
    try{
      switch(rol){
        case AllowedRol.manager: {
          await Axios.put(`/managers/${id}`,{
            active: 0
         });
          break
        }
        case AllowedRol.auditor: {
          await Axios.put(`/auditors/${id}`,{
            active: 0
          });
          break
        }
        case AllowedRol.security: {
          await Axios.put(`/securities/${id}`,{
            active: 0
          });
          break
        }
      }
      dispatch(deleteSpecialUserSuccess())
    }
    catch(error: any){
       dispatch(deleteSpecialUserFailure(error.response.data));
    }
 };
 
 export const getSpecialUser = (id: string, rol: number): AppThunk => async (dispatch) => {
    dispatch(getSpecialUserRequest());
    let response: AxiosResponse
    try{
      switch(rol){
        case AllowedRol.manager: {
          response = await Axios.get(`/managers/${id}`)
          dispatch(getSpecialUserSuccess(response.data))
          break
        }
        case AllowedRol.auditor: {
          response = await Axios.get(`/auditors/${id}`)
          dispatch(getSpecialUserSuccess(response.data))
          break
        }
        case AllowedRol.security: {
          response = await Axios.get(`/securities/${id}`)
          dispatch(getSpecialUserSuccess(response.data))
          break
        }
      }
    }
    catch(error: any){
      dispatch(getSpecialUserFailure(error.response.data));
    }
 };

 export const editSpecialUser = (
  id: number,
  name: string,
  surname: string,
  rol: number,
  cuit: string,
  username: string,
  email: string): AppThunk => async (dispatch) => {
    dispatch(editSpecialUserRequest());
    try{
      const body = {
        name,
        surname,
        rol,
        cuit,
        username,
        email
      }
      switch(rol){
        case AllowedRol.manager: {
          const manager: AxiosResponse = await Axios.put(`/managers/${id}`,body)
          dispatch(editSpecialUserSuccess(manager.data))
          break
        }
        case AllowedRol.auditor: {
          const auditor: AxiosResponse = await Axios.put(`/auditors/${id}`,body);
          dispatch(editSpecialUserSuccess(auditor.data))
          break
        }
        case AllowedRol.security: {
          const security: AxiosResponse = await Axios.put(`/securities/${id}`,body);
          dispatch(editSpecialUserSuccess(security.data))
          break
        }
      }
    }
    catch(error: any){
       dispatch(editSpecialUserFailure(error.response.data));
    }
 };