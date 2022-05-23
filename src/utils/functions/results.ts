import { APPROVED, REJECTED, PENDING, Results } from "../constants"
import globalColors from "../styles/globalColors"

export const getResultName = (resultNumber: any): string => {
    switch(resultNumber){
        case (Results.APPROVED): return APPROVED
        case (Results.REJECTED): return REJECTED
        default: return PENDING
    }
}

export const getResultColor = (resultNumber: any): string => {
    switch(resultNumber){
        case (Results.APPROVED): return globalColors.green
        case (Results.REJECTED): return globalColors.red
        default: return globalColors.yellow
    }
}