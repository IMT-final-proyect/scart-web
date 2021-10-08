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

export const contractor = 'contractor'
export const auditor = 'auditor'
export const manager = 'manager'
export const driver = 'driver'
export const vehicle = 'vehicle'
export const security = 'security'
export const admin = 'admin'

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