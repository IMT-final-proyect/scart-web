import { admin, AllowedRol, auditor, contractor, driver, manager, security, vehicle } from "../constants"
import { ROUTES as AdminRoutes } from "../../screens/admin/navigation/routes"
import { ROUTES as ContractorRoutes } from "../../screens/contractor/navigation/routes"
import { ROUTES as AuditorRoutes } from "../../screens/auditor/navigation/routes"
import { ROUTES as ManagerRoutes } from "../../screens/manager/navigation/routes"

export const getRolPath = (rol?: number) => {
    switch(rol){
        case (AllowedRol.admin): return AdminRoutes.root
        case (AllowedRol.contractor): return ContractorRoutes.root+ContractorRoutes.home
        case (AllowedRol.manager): return ManagerRoutes.root+ManagerRoutes.exceptions
        case (AllowedRol.auditor): return AuditorRoutes.root
        default: return '/login'
    }
}

export const getRolNumber = (rolName: string): number => {
    switch(rolName){
        case (admin): return AllowedRol.admin
        case (contractor): return AllowedRol.contractor
        case (manager): return AllowedRol.manager
        case (auditor): return AllowedRol.auditor
        case (driver): return AllowedRol.driver
        case (security): return AllowedRol.security
        default: return -1
    }
}

export const getRolName = (rolNumber: number): string => {
    switch(rolNumber){
        case (AllowedRol.admin): return admin
        case (AllowedRol.contractor): return contractor
        case (AllowedRol.manager): return manager
        case (AllowedRol.auditor): return auditor
        case (AllowedRol.driver): return driver
        case (AllowedRol.security): return security
        case (AllowedRol.vehicle): return vehicle
        default: return ''
    }
}

export const getRolNumero = (rolName: string): number => {
    switch(rolName){
        case ('Admin'): return AllowedRol.admin
        case ('Contratista'): return AllowedRol.contractor
        case ('Manager'): return AllowedRol.manager
        case ('Auditor'): return AllowedRol.auditor
        case ('Conductor'): return AllowedRol.driver
        case ('Seguridad'): return AllowedRol.security
        default: return -1
    }
}