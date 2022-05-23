import { admin, AllowedRol, auditor, contractor, driver, expedition, manager, security, vehicle } from "../constants"
import { ROUTES as AdminRoutes } from "../../screens/admin/navigation/routes"
import { ROUTES as ContractorRoutes } from "../../screens/contractor/navigation/routes"
import { ROUTES as AuditorRoutes } from "../../screens/auditor/navigation/routes"
import { ROUTES as ManagerRoutes } from "../../screens/manager/navigation/routes"
import { ROUTES as SecurityRoutes } from "../../screens/security/navigation/routes"
import { ROUTES as DriverRoutes } from "../../screens/driver/navigation/routes"
import { ROUTES as ExpeditionRoutes } from "../../screens/expedition/navigation/routes"
import { ROUTES as defaultRoutes } from "../../routes/routes"

export const getRolPath = (rol?: number) => {
    switch(rol){
        case (AllowedRol.admin): return AdminRoutes.root
        case (AllowedRol.contractor): return ContractorRoutes.root+ContractorRoutes.home
        case (AllowedRol.manager): return ManagerRoutes.root+ManagerRoutes.exceptions
        case (AllowedRol.auditor): return AuditorRoutes.root+AuditorRoutes.home
        case (AllowedRol.security): return SecurityRoutes.root
        case (AllowedRol.driver): return DriverRoutes.root
        case (AllowedRol.expedition): return ExpeditionRoutes.root
        default: return defaultRoutes.login
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
        case (expedition): return AllowedRol.expedition
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
        case (AllowedRol.expedition): return expedition
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
        case ('Expedicion'): return AllowedRol.expedition
        default: return -1
    }
}

export const capitalize = (s: string) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }