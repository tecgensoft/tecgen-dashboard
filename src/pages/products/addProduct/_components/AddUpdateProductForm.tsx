/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material'
import AutoSearchSelect from '../../../../components/AutoSearchSelect'
import ImageField from '../../../../components/ImageField'
import InputField from '../../../../components/InputField'
import InputLabel from '../../../../components/InputLabel'
import TinyEditor from '../../../../components/TinyEditor'
import SwitchField from '../../../../components/modals/Switch'

export default function AddUpdateProductForm({ setProductInfo }:{ setProductInfo:  React.Dispatch<React.SetStateAction<any>>}) {
  return (
    <Box component="form">
      <InputField
        name="name"
        label="Product Name"
        required
        placeholder="Enter Product Name"
      />
      <Box sx={{ display: 'flex', width: '100%', gap: '16px', mt: '16px' }}>
        <AutoSearchSelect
          options={[]}
          placeholder="Select Category"
          required
          label="Category"
        />
        <AutoSearchSelect
          options={[]}
          placeholder="Select Sub Category"
          required
          label="Sub Category"
        />

      </Box>
      <Box sx={{ display: 'flex', width: '100%', gap: '16px', mt: '16px' }}>
        <AutoSearchSelect
          options={[]}
          placeholder="Select Brand"
          required
          label="Brand"
        />
        <AutoSearchSelect
          options={[]}
          placeholder="Select Store"
          required
          label="Store"
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '16px',  mt: '16px' }}>
        <SwitchField
          // onChange={handleChecked}
          name="is_active"
          labelOfChecked="Is Active"
        // value={brandInfo.is_active}
        // required
        />
        <SwitchField
          // onChange={handleChecked}
          name="show_in_ecommerce"
          labelOfChecked="Show In Ecommerce"
        // value={brandInfo.is_active}
        // required
        />
        <SwitchField
          // onChange={handleChecked}
          name="is_featured"
          labelOfChecked="Is Featured"
        // value={brandInfo.is_active}
        // required
        />
        <SwitchField
          // onChange={handleChecked}
          name="is_top_sale"
          labelOfChecked="Is Top Sale"
        // value={brandInfo.is_active}
        // required
        />
        <SwitchField
          // onChange={handleChecked}
          name="is_upcoming"
          labelOfChecked="Is Upcoming"
        // value={brandInfo.is_active}
        // required
        />
        <SwitchField
          // onChange={handleChecked}
          name="free_delivery"
          labelOfChecked="Free Delivery"
        // value={brandInfo.is_active}
        // required
        />
      </Box>
      <Box>
      <InputLabel label={'Product Images'} required={true} />
      <Box
        sx={{
          bgcolor: '#eff3f4',
          px: '16px',
          py: '16px',
          borderRadius: '16px',
          
        }}
      >
        <ImageField tagName="icon_images" setParentInfo={setProductInfo} isMultiple={true} />
      </Box>
      </Box>
      <Box sx={{ mt: '16px' }}>
        <TinyEditor label="Description" required />
      </Box>
      <Box sx={{ display: 'flex', width: '100%', gap: '16px', mt: '16px' }}>
      <InputField
      type="number"
        name="weight"
        label="Product Weight"
        required
        placeholder="Enter Product weight"
      />
      <InputField
      type='number'
        name="minimum_stock_quantity"
        label="Available Stock"
        required
        placeholder="Enter minimum stock quantity"
      />
      </Box>
    </Box>
  )
}
