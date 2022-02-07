import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import contractorsSlice from './slices/contractorsSlice';
import documentsSlice from './slices/documentsSlice';
import resourcesSlice from './slices/resourcesSlice';
import documentTypesSlice from './slices/documentTypesSlice';
import userReducer, { postLogout } from './slices/userSlice';
import exceptionsSlice from './slices/exceptionsSlice';

export const initialState = {}

const appReducer = combineReducers({
    user: userReducer,
    resources: resourcesSlice,
    documents: documentsSlice,
    documentTypes: documentTypesSlice,
    contractors: contractorsSlice,
    exceptions: exceptionsSlice
});

const rootReducer = (state: any, action: any) => {
    
    if (action.type === postLogout) {
        storage.removeItem(`persist:root`);
        localStorage.removeItem('access_token')
        state = initialState;
    }
    return appReducer(state, action);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;