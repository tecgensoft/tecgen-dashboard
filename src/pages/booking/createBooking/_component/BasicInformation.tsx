/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import ReceiverInformation from './ReceiverInformation';
import SenderInformation from './SenderInformation';


export default function BasicInformation({ formik }: { formik:any }) {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Grid container spacing={isXs ? 2 : 4}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
                <SenderInformation formik={formik} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
                <ReceiverInformation formik={formik} />
            </Grid>
        </Grid>
    )
}
