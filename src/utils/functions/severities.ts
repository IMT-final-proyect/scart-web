import { HIGH, LOW, MEDIUM, Severities } from "../constants"
import globalColors from "../styles/globalColors"

export const getSeverityName = (severityNumber: number): string => {
    switch(severityNumber){
        case (Severities.HIGH): return HIGH
        case (Severities.MEDIUM): return MEDIUM
        case (Severities.LOW): return LOW
        default: return ''
    }
}

export const getSeverityNumero = (severityName: string): number => {
    switch(severityName){
        case (HIGH): return Severities.HIGH
        case (MEDIUM): return Severities.MEDIUM
        case (LOW): return Severities.LOW
        default: return -1
    }
}

export const getSeverityColor = (severityName: string): string => {
    switch(severityName){
        case (HIGH): return globalColors.red
        case (MEDIUM): return globalColors.yellow
        case (LOW): return globalColors.green
        default: return globalColors.white
    }
}