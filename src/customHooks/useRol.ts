import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { getRolName } from '../utils/functions/roles';

export const useRol = () => {
  const rol = useSelector((state: RootState) => state.user.accountData?.rol)
  return(rol)
}