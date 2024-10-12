/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


import ModalView from '../../../components/modals/Modal'
import TableHeader from '../../../components/table/TableHeader'
import { CREATE, DANGER, EDIT, SUCCESS } from '../../../constant/constant'
import { setNotification } from '../../../redux/feature/notification/notificationSlice'
import { setOpen, setType } from '../../../redux/feature/open/openSlice'
import { useAddSubCategoryMutation, useGetCategoryQuery, useUpdateSubCategoryMutation } from '../../../redux/feature/productManagement/productManagementApi'
import { useAppSelector } from '../../../redux/hook'
import SubCategoryColumn from './_components/SubCategoryColumn'
import SubCategoryCreateANDUpdate from './_components/SubCategoryCreateANDUpdate'
import Table from './_components/Table'
import { ICategoryInfoError, ISubCategoryInfo } from './types/types'

export default function SubCategory() {
  const { type, open } = useAppSelector(state => state.open)
  const { data } = useGetCategoryQuery({})
  const [addSubCategory] = useAddSubCategoryMutation()
  const [updateSubCategory] = useUpdateSubCategoryMutation()
  const [updateId, setUpdateId] = useState(null)
  const [errors, setErrors] = useState<ICategoryInfoError>({})
  const [subcategoryInfo, setSubCategoryInfo] = useState<ISubCategoryInfo>({
    name: '',
    category: undefined,
    icon_images: [],
    logo_images: [],
    is_active: false,
    show_in_ecommerce: false,
  })
  const [btnLoading, setBtnLoading] = useState(false)
  const dispatch = useDispatch()
  // console.log(isLoading)
  // handle change function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategoryInfo({ ...subcategoryInfo, [e.target.name]: e.target.value })
    setErrors({
      ...errors,
      [e.target.name]: '',
    })
  }
  // handle select function
  const handleChangeSelect = (_event: React.SyntheticEvent,
    newValue: { label: string; value: number } | null) => {
    setSubCategoryInfo({...subcategoryInfo, category: newValue?.value})
  }
  // handle checked function
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategoryInfo({ ...subcategoryInfo, [e.target.name]: e.target.checked })
  }

  const validateForm = () => {
    const errors: {
      name: string | null | undefined,
      category: string | null | undefined
    } = {
      name: undefined,
      category: undefined
    }

    if (!subcategoryInfo.name) {
      errors.name = 'Name is required'
    }
    if (!subcategoryInfo.category) {
      errors.category = 'Category is required'
    }
    setErrors(errors)

    const hasErrors = Object.values(errors).some(error => error !== undefined)
    return !hasErrors
  }

  // handle submit function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      setBtnLoading(true)
      const uploadCategoryDataObj: {
        name: string
        category: number | undefined | null;
        icon?: string | undefined
        logo?: string | undefined
        is_active: boolean
        show_in_ecommerce: boolean
      } = {
        name: subcategoryInfo.name,
        category: subcategoryInfo.category,
        is_active: subcategoryInfo.is_active,
        show_in_ecommerce: subcategoryInfo.show_in_ecommerce,
      }
      if (subcategoryInfo.icon_images.length > 0) {
        uploadCategoryDataObj.icon = subcategoryInfo.icon_images[0]
      } else {
        uploadCategoryDataObj.icon = ''
      }
      if (subcategoryInfo.logo_images.length > 0) {
        uploadCategoryDataObj.logo = subcategoryInfo.logo_images[0]
      } else {
        uploadCategoryDataObj.logo = ''
      }

      if (type === CREATE) {
        addSubCategory(uploadCategoryDataObj)
          .then((res:any) => {
            console.log(res.data)
            if (res.data) {
              setBtnLoading(false)
              dispatch(setOpen(false))
              dispatch(
                setNotification({
                  open: true,
                  message: `Category created successfully!`,
                  type: SUCCESS,
                }),
              )
              setSubCategoryInfo({
                name: '',
                category: undefined,
                icon_images: [],
                logo_images: [],
                is_active: false,
                show_in_ecommerce: false,
              })
            }
            if (res.error) {
              console.log(res?.error?.data?.message)
              setBtnLoading(false)
              dispatch(setOpen(false))
              dispatch(
                setNotification({
                  open: true,
                  message: res.error.data.message,
                  type: DANGER,
                }),
              )
              setSubCategoryInfo({
                name: '',
                category: undefined,
                icon_images: [],
                logo_images: [],
                is_active: false,
                show_in_ecommerce: false,
              })
            }
          })
          .catch(error => {
            setBtnLoading(false)
            console.log(error)
          })
      } else if (type === EDIT && updateId !== null) {
        updateSubCategory({ id: updateId, data: uploadCategoryDataObj })
          .then(res => {
            if (res.data) {              
              setBtnLoading(false)
              dispatch(setOpen(false))
              setSubCategoryInfo({
                name: '',
                category: undefined,
                icon_images: [],
                logo_images: [],
                is_active: false,
                show_in_ecommerce: false,
              })
            }
            if (res.error) {
              console.log(res.error)
              setBtnLoading(false)
              dispatch(setOpen(false))
              setSubCategoryInfo({
                name: '',
                category: undefined,
                icon_images: [],
                logo_images: [],
                is_active: false,
                show_in_ecommerce: false,
              })
            }
          })
          .catch(error => {
            setBtnLoading(false)
            console.log(error)
          })
      }

      // submit function
    }
  }

  const handleEdit = (editValue: any) => {
    // Checking icon & logo type string or array
    const isArray = (value: string | string[]) => {
      if (value === '') return []
      else if (Array.isArray(value) && value.length > 0) {
        return value
      } else if (typeof value === 'string') {
        return [value]
      } else return []
    }

    if (editValue) {
      dispatch(setType(EDIT))
      dispatch(setOpen(true))
      setUpdateId(editValue?.id)
      const updatedInfo = {
        name: editValue.name,
        category: editValue.category,
        is_active: editValue.is_active,
        show_in_ecommerce: editValue.show_in_ecommerce,
        logo_images: isArray(editValue.logo),
        icon_images: isArray(editValue.icon),
      }
      setSubCategoryInfo(prev => ({
        ...prev,
        ...updatedInfo,
      }))
    }
  }


  const categoryOptionsFn = (categories: any[]) => {
    return categories?.map(category => {
      return {
        label: category.name,
        value: category.id,
      }
    })
  }
  const categories = categoryOptionsFn(data?.results)

  // useEffect(() => {
  //   if(type === CREATE){
  //     setCategoryInfo({name: '',
  //       icon_images: [],
  //       logo_images: [],
  //       is_active: false,
  //       show_in_ecommerce: false,})
  //   }
  // }, [type])
  // console.log(categoryInfo)
  // reset error state
  useEffect(() => {
    setErrors({})
  }, [open])



  return (
    <Box
      sx={{
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? 'rgba(32, 32, 32, 1)' : ' white',
        padding: '16px',
      }}
    >
      <TableHeader tableTitle="Sub Category List" />
      <Table columns={SubCategoryColumn(handleEdit)} />
      <ModalView
        headerTitle={type === CREATE ? 'Create Sub category' : 'Update Sub category'}
      >
        <SubCategoryCreateANDUpdate
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleChecked={handleChecked}
          handleChangeSelect={handleChangeSelect}
          subcategoryInfo={subcategoryInfo}
          setSubCategoryInfo={setSubCategoryInfo}
          errors={errors}
          buttonValue={type === CREATE ? 'Create' : 'Update'}
          btnLoading={btnLoading}
          categories={categories}
        />
      </ModalView>
    </Box>
  )
}
