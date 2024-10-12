import { Box, Button, CircularProgress, Divider } from '@mui/material'
import { useDispatch } from 'react-redux'

import AutoSearchSelect from '../../../../components/AutoSearchSelect'
import ImageField from '../../../../components/ImageField'
import InputField from '../../../../components/InputField'
import SwitchField from '../../../../components/modals/Switch'
import { setOpen } from '../../../../redux/feature/open/openSlice'
import { ICategoryInfoError, ISubCategoryInfo } from '../types/types'

interface SubCategoryCreateAndUpdateInterface {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChecked: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeSelect: (
    event: React.SyntheticEvent,
    newValue: { label: string; value: number } | null
  ) => void
  subcategoryInfo: ISubCategoryInfo
  setSubCategoryInfo: React.Dispatch<React.SetStateAction<ISubCategoryInfo>>
  errors: ICategoryInfoError
  buttonValue?: string
  btnLoading: boolean
  categories: { label: string; value: number }[]
}

export default function SubCategoryCreateANDUpdate({
  handleSubmit,
  handleChange,
  handleChecked,
  handleChangeSelect,
  subcategoryInfo,
  setSubCategoryInfo,
  errors,
  buttonValue = 'Create',
  btnLoading,
  categories,
}: SubCategoryCreateAndUpdateInterface) {
  const dispatch = useDispatch()
  console.log(subcategoryInfo)

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
        placeholder="Enter Sub category name"
        required
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        value={subcategoryInfo.name}
      />
      <AutoSearchSelect
        options={categories}
        handleChange={handleChangeSelect}
        placeholder="Select Category"
        label="Category"
        required
        value={subcategoryInfo.category}
        error={errors.category}
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
          value={subcategoryInfo.is_active}
          // required
        />
        <Divider />
        <SwitchField
          onChange={handleChecked}
          name="show_in_ecommerce"
          labelOfChecked="Show in Ecommerce"
          value={subcategoryInfo.show_in_ecommerce}
        />
      </Box>
      <ImageField
        label="Upload Icon"
        setParentInfo={setSubCategoryInfo}
        tagName="icon_images"
        initialImage={subcategoryInfo.icon_images}
        required
      />
      <ImageField
        label="Upload Logo"
        setParentInfo={setSubCategoryInfo}
        tagName="logo_images"
        initialImage={subcategoryInfo.logo_images}
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
