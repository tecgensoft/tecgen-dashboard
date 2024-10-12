import { Box, Button, CircularProgress, Divider } from '@mui/material'
import { useDispatch } from 'react-redux'

import AutoSearchSelect from '../../../../components/AutoSearchSelect'
import ImageField from '../../../../components/ImageField'
import InputField from '../../../../components/InputField'
import SwitchField from '../../../../components/modals/Switch'
import { setOpen } from '../../../../redux/feature/open/openSlice'
import { IBrand, ICategoryInfoError,  } from '../types/types'

interface BrandCreateAndUpdateInterface {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChecked: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeSelect: (
    event: React.SyntheticEvent,
    newValue: { label: string; value: number } | null
  ) => void
  brandInfo: IBrand
  setbrandInfo: React.Dispatch<React.SetStateAction<IBrand>>
  errors: ICategoryInfoError
  buttonValue?: string
  btnLoading: boolean
  categories: { label: string; value: number }[]
}

export default function BrandCreateANDUpdate({
  handleSubmit,
  handleChange,
  handleChecked,
  handleChangeSelect,
  brandInfo,
  setbrandInfo,
  errors,
  buttonValue = 'Create',
  btnLoading,
  categories,
}: BrandCreateAndUpdateInterface) {
  const dispatch = useDispatch()
  // console.log(brandInfo)

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
      onSubmit={handleSubmit}
    >
      <InputField
        name="name"
        label="Name"
        placeholder="Enter brand name"
        required
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        value={brandInfo.name}
      />
      <AutoSearchSelect
        options={categories}
        handleChange={handleChangeSelect}
        placeholder="Select Category"
        label="Category"
        required
        value={brandInfo.subcategory}
        error={errors.subcategory}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
        }}
      >
        <SwitchField
          onChange={handleChecked}
          name="is_active"
          labelOfChecked="Is Active"
          value={brandInfo.is_active}
          // required
        />
        <Divider />
        <SwitchField
          onChange={handleChecked}
          name="show_in_ecommerce"
          labelOfChecked="Show in Ecommerce"
          value={brandInfo.show_in_ecommerce}
        />
      </Box>
      <ImageField
        label="Upload Icon"
        setParentInfo={setbrandInfo}
        tagName="icon_images"
        initialImage={brandInfo.icon_images}
        required
      />
      <Divider />
      <Box
        pl={4}
        pr={4}
        pb={4}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px',
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(setOpen(!open))}
        >
          Close
        </Button>
        {
          <Button type="submit" variant="contained" color="primary">
            {btnLoading ? (
              <CircularProgress size={'16px'} sx={{ color: 'white' }} />
            ) : (
              buttonValue
            )}
          </Button>
        }
      </Box>
    </Box>
  )
}
