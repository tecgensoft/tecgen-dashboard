import { Box, Typography } from '@mui/material'

export default function TrackingCard({icon, title, date}:any) {
   
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", maxWidth:"150px" }}>
            <Typography
                variant="body2"
                sx={{
                    color: theme => theme.palette.mode === 'dark' ? "#fff" : '#434343',
                    fontSize: '14px',
                    fontWeight: '400',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                <img src={icon} alt="dateIcon" /> {title}
            </Typography>
            <Typography variant="body1" color={theme => theme.palette.mode === 'dark' ? "#999999" : '#0D0D0D'} fontSize="14px" fontWeight="500" textAlign={'center'} >{date}</Typography>
        </Box>
    )
}
