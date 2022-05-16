export const headerSize = 40;


export const contractor = 'Contratista'
export const auditor = 'Auditor'
export const manager = 'Encargado'
export const driver = 'Conductor'
export const vehicle = 'Vehiculo'
export const security = 'Seguridad'
export const admin = 'Administrador'
export const expedition = 'Expedicion'

export const PENDING = 'Pendiente'
export const VALID = 'Vigente'
export const REJECTED = 'Rechazado'
export const EXPIRED = 'Vencido'

export const HIGH = 'Alta'
export const MEDIUM = 'Media'
export const LOW = 'Baja'

export const APPROVED = 'Aprobado'

export enum AllowedRol{
    admin,
    driver,
    contractor,
    auditor,
    manager,
    security,
    vehicle,
    expedition
}

export enum States {
    PENDING,
    VALID,
    REJECTED,
    EXPIRED,
}

export enum Severities {
    HIGH,
    MEDIUM,
    LOW,
}

export enum Results {
    APPROVED,
    REJECTED
  }
  
export enum ExceptionResults {
    APPROVED,
    REJECTED
}
