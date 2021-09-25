import { AllowedRol } from "../constants"
import { ROUTES as AdminRoutes } from "../../screens/admin/navigation/routes"
import { ROUTES as ContractorRoutes } from "../../screens/contractor/navigation/routes"
import { ROUTES as AuditorRoutes } from "../../screens/auditor/navigation/routes"
import { ROUTES as ManagerRoutes } from "../../screens/manager/navigation/routes"

const getRolPath = (rol?: number) => {
    if(rol){
        switch(rol){
            case (AllowedRol.ADMIN): return AdminRoutes.root+AdminRoutes.home
            case (AllowedRol.CONTRACTOR): return ContractorRoutes.root+ContractorRoutes.home
            case (AllowedRol.MANAGER): return ManagerRoutes.root+ManagerRoutes.exceptions
            case (AllowedRol.AUDITOR): return AuditorRoutes.root+AuditorRoutes.documentDetails
            default: return '/login'
        }
    }
} 
export default getRolPath