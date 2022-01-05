import { getRolNumber } from "./roles"
import jwt_decode from "jwt-decode";
import moment from "moment";

export const isTokenValid = (accessToken: string | null) => {
    if(!!accessToken){
        const decodedToken: any = jwt_decode(accessToken)
        const expirationDate = moment(decodedToken.exp*1000)
        const now = moment()
        if(now < expirationDate)
            return true
        return false
    }
    return false
}

export const isRolAuthored = (rolName: string, accountRol?: number) => {
    if (accountRol !== undefined && (accountRol === getRolNumber(rolName)))
        return true
    else return false
}
