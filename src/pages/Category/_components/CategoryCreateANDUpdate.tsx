import { Box, Divider } from '@mui/material';
import InputField from '../../../components/InputField';
import SwitchField from '../../../components/modals/Switch';

export default function CategoryCreateANDUpdate() {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }}>
      <InputField name='name' label="Category Name" placeholder='Enter category name' />
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        gap: "16px"
      }}>
        <SwitchField value={true} labelOfChecked='Is Active' />
        <Divider/>
        <SwitchField value={true} labelOfChecked='Show in Ecommerce' />
      </Box>
      {/* <ImageField /> */}
    </Box>
  )
}
