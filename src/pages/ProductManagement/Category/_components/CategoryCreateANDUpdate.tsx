import { Box, Button, CircularProgress, Divider } from '@mui/material';
import { useDispatch } from 'react-redux';

import ImageField from '../../../../components/ImageField';
import InputField from '../../../../components/InputField';
import SwitchField from '../../../../components/modals/Switch';
import { setOpen } from '../../../../redux/feature/open/openSlice';
import { ICategoryInfo, ICategoryInfoError } from '../types/types';

interface CategoryCreateAndUpdateInterface {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChecked: (e: React.ChangeEvent<HTMLInputElement>) => void
  categoryInfo: ICategoryInfo
  setCategoryInfo: React.Dispatch<React.SetStateAction<ICategoryInfo>>
  errors: ICategoryInfoError
  buttonValue?: string
  btnLoading: boolean
}

export default function CategoryCreateANDUpdate({
  handleSubmit,
  handleChange,
  handleChecked,
  categoryInfo,
  setCategoryInfo,
  errors,
  buttonValue = 'Create',
  btnLoading
}: CategoryCreateAndUpdateInterface) {
  const dispatch = useDispatch()
  // console.log(errors)

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
        label="Category Name"
        placeholder="Enter category name"
        required
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        value={categoryInfo.name}
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
          value={categoryInfo.is_active}
          // required
        />
        <Divider />
        <SwitchField
          onChange={handleChecked}
          name="show_in_ecommerce"
          labelOfChecked="Show in Ecommerce"
          value={categoryInfo.show_in_ecommerce}
        />
      </Box>
      <ImageField
        label="Upload Icon"
        setParentInfo={setCategoryInfo}
        tagName="icon_images"
        initialImage={categoryInfo.icon_images}
        required
      />
      <ImageField
        label="Upload Logo"
        setParentInfo={setCategoryInfo}
        tagName="logo_images"
        initialImage={categoryInfo.logo_images}
      />
      <Divider/>
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
            {btnLoading ? <CircularProgress size={'16px'} sx={{ color: 'white' }} />: buttonValue}
          </Button>
        }
      </Box>
    </Box>
  )
}