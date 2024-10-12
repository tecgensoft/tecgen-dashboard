/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


import ModalView from '../../../components/modals/Modal'
import TableHeader from '../../../components/table/TableHeader'
import { CREATE, DANGER, EDIT, SUCCESS } from '../../../constant/constant'
import { setNotification } from '../../../redux/feature/notification/notificationSlice'
import { setOpen, setType } from '../../../redux/feature/open/openSlice'
import { useAddCategoryMutation, useUpdateCategoryMutation } from '../../../redux/feature/productManagement/productManagementApi'
import { useAppSelector } from '../../../redux/hook'
import CategoryColumn from './_components/CategoryColumn'
import CategoryCreateANDUpdate from './_components/CategoryCreateANDUpdate'
import Table from './_components/Table'
import { ICategoryInfo, ICategoryInfoError } from './types/types'

export default function Category() {
  const { type, open } = useAppSelector(state => state.open)
  const [addCategory] = useAddCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  // const { data: categoryData, isLoading } = useGetCategoryQuery(undefined)
  const [updateId, setUpdateId] = useState(null)
  const [errors, setErrors] = useState<ICategoryInfoError>({})
  const [categoryInfo, setCategoryInfo] = useState<ICategoryInfo>({
    name: '',
    icon_images: [],
    is_active: false,
    show_in_ecommerce: false,
  })
  const [btnLoading, setBtnLoading] = useState(false)
  const dispatch = useDispatch()
  // console.log(isLoading)
  // handle change function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInfo({ ...categoryInfo, [e.target.name]: e.target.value })
    setErrors({
      ...errors,
      [e.target.name]: '',
    })
  }
  // handle checked function
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInfo({ ...categoryInfo, [e.target.name]: e.target.checked })
  }

  const validateForm = () => {
    const errors: {
      name: string | null | undefined
    } = {
      name: undefined,
    }

    if (!categoryInfo.name) {
      errors.name = 'Category name is required'
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
        icon?: string | undefined 
        is_active: boolean
        show_in_ecommerce: boolean
      } = {
        name: categoryInfo.name,
        is_active: categoryInfo.is_active,
        show_in_ecommerce: categoryInfo.show_in_ecommerce,
      }
      if (categoryInfo.icon_images.length > 0) {
        uploadCategoryDataObj.icon = categoryInfo.icon_images[0]
      }else {
        uploadCategoryDataObj.icon = ''
      }

      if(type === CREATE){
        addCategory(JSON.stringify(uploadCategoryDataObj))
        .then(res => {
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
            setCategoryInfo({
              name: '',
              icon_images: [],
              is_active: false,
              show_in_ecommerce: false,
            })
          }
          if(res.error){
            setBtnLoading(false)
            dispatch(setOpen(false))
            dispatch(
              setNotification({
                open: true,
                message: `Category not created`,
                type: DANGER,
              }),
            )
            setCategoryInfo({
              name: '',
              icon_images: [],
              is_active: false,
              show_in_ecommerce: false,
            })
          }
        })
        .catch(error => {
          setBtnLoading(false)
          console.log(error)
        })
      }else if(type === EDIT && updateId !== null){
        updateCategory({id: updateId, data:uploadCategoryDataObj})
        .then(res => {
          if (res.data) {
            setBtnLoading(false)
            dispatch(setOpen(false))
            setCategoryInfo({
              name: '',
              icon_images: [],
              is_active: false,
              show_in_ecommerce: false,
            })
          }
          if(res.error){
            setBtnLoading(false)
            dispatch(setOpen(false))
            setCategoryInfo({
              name: '',
              icon_images: [],
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
      if(value === '') return []
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
        is_active: editValue.is_active,
        show_in_ecommerce: editValue.show_in_ecommerce,
        logo_images: isArray(editValue.logo),
        icon_images: isArray(editValue.icon),
      }
      setCategoryInfo(prev => ({
        ...prev,
        ...updatedInfo,
      }))
    }
  }
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
      <TableHeader tableTitle="Category List" />      
      <Table columns={CategoryColumn(handleEdit)}  />
      <ModalView
        headerTitle={type === CREATE ? 'Create category' : 'Update category'}
      >
        <CategoryCreateANDUpdate
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleChecked={handleChecked}
          categoryInfo={categoryInfo}
          setCategoryInfo={setCategoryInfo}
          errors={errors}
          buttonValue={type === CREATE ? 'Create' : 'Update'}
          btnLoading={btnLoading}
        />
      </ModalView>
    </Box>
  )
}
