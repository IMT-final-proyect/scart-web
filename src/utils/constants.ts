export const headerSize = 40;

export enum AllowedRol{
    admin,
    driver,
    contractor,
    auditor,
    manager,
    security,
    vehicle
}

export const contractor = 'Contratista'
export const auditor = 'Auditor'
export const manager = 'Encargado'
export const driver = 'Conductor'
export const vehicle = 'Vehiculo'
export const security = 'Seguridad'
export const admin = 'Administrador'

export const PENDING = 'Pendiente'
export const VALID = 'Vigente'
export const REJECTED = 'Rechazado'
export const EXPIRED = 'Vencido'

export enum States {
    PENDING,
    VALID,
    REJECTED,
    EXPIRED,
}