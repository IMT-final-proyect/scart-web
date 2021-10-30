import { PENDING, VALID, REJECTED, EXPIRED } from '../constants'
import globalColors from '../styles/globalColors'

export const getStateName = (stateNumber: number): string => {
    switch(stateNumber){
        case (0): return PENDING 
        case (1): return VALID
        case (2): return REJECTED
        case (3): return EXPIRED
        default: return ''
    }
}

export const getStatesNumber = (stateName: string): number => {
    switch(stateName){
        case (PENDING ): return 0
        case (VALID): return 1
        case (REJECTED): return 2
        case (EXPIRED): return 3
        default: return -1
    }
}

export const getStateColor = (stateName: string): string => {
    switch(stateName){
        case (PENDING ): return globalColors.yellow
        case (VALID): return globalColors.green
        case (REJECTED): return globalColors.red
        case (EXPIRED): return globalColors.red
        default: return globalColors.white
    }
}
