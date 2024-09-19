import { Alert, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Toastify({
    isShow,
    message,
    type = "success"
}: {
    isShow: boolean
    message: string
    type?: "success" | "error" | "info" | "warning"
}) {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(isShow)
    }, [isShow])
    return (
        <Snackbar
            autoHideDuration={9000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={() => setOpen(false)}
            color="#333"
        >
            <Alert severity={type} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}
