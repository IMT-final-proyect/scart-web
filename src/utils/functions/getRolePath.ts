import { admin, AllowedRol, auditor, contractor, driver, manager, security } from "../constants"
import { ROUTES as AdminRoutes } from "../../screens/admin/navigation/routes"
import { ROUTES as ContractorRoutes } from "../../screens/contractor/navigation/routes"
import { ROUTES as AuditorRoutes } from "../../screens/auditor/navigation/routes"
import { ROUTES as ManagerRoutes } from "../../screens/manager/navigation/routes"

export const getRolPath = (rol?: number) => {
    switch(rol){
        case (AllowedRol.ADMIN): return AdminRoutes.root+AdminRoutes.contractors
        case (AllowedRol.CONTRACTOR): return ContractorRoutes.root+ContractorRoutes.home
        case (AllowedRol.MANAGER): return ManagerRoutes.root+ManagerRoutes.exceptions
        case (AllowedRol.AUDITOR): return AuditorRoutes.root
        default: return '/login'
    }
}

export const getRolNumber = (rolName: string): number => {
    switch(rolName){
        case (admin): return AllowedRol.ADMIN
        case (contractor): return AllowedRol.CONTRACTOR
        case (manager): return AllowedRol.MANAGER
        case (auditor): return AllowedRol.AUDITOR
        case (driver): return AllowedRol.DRIVER
        case (security): return AllowedRol.SECURITY
        default: return -1
    }
}

export const getRolName = (rolNumber: number): string => {
    switch(rolNumber){
        case (AllowedRol.ADMIN): return admin
        case (AllowedRol.CONTRACTOR): return contractor
        case (AllowedRol.MANAGER): return manager
        case (AllowedRol.AUDITOR): return auditor
        case (AllowedRol.DRIVER): return driver
        case (AllowedRol.SECURITY): return security
        default: return ''
    }
}