import { Snackbar } from "@material-ui/core"
import { Alert } from "@mui/material"

interface Props {
    open: boolean
    message: string
    type: 'error' | 'success'
    onClose: () => void
}
const CustomSnackbar = ({ open, message, type, onClose }:Props) => {
    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose} >
            <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar