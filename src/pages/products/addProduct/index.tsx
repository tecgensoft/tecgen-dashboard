/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material'
import { useState } from 'react'

import AddUpdateProductForm from './_components/AddUpdateProductForm'


export default function AddProduct() {
  // const { type, open } = useAppSelector(state => state.open)
  // const { data } = useGetSubCategoryQuery({})
  // const [addBrand] = useAddBrandMutation()
  // const [updateBrand] = useUpdateBrandMutation()
  // const [updateId, setUpdateId] = useState(null)
  // const [errors, setErrors] = useState({})
  const [productInfo, setProductInfo] = useState({
    name: '',
    subcategory: undefined,
    product_images: [],
    is_active: false,
    show_in_ecommerce: false,
  })
  console.log(productInfo)
  // const [btnLoading, setBtnLoading] = useState(false)
  // const dispatch = useDispatch()
  // console.log(isLoading)
  // handle change function
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setbrandInfo({ ...brandInfo, [e.target.name]: e.target.value })
  //   setErrors({
  //     ...errors,
  //     [e.target.name]: '',
  //   })
  // }
  // handle select function
  // const handleChangeSelect = (
  //   _event: React.SyntheticEvent,
  //   newValue: { label: string; value: number } | null,
  // ) => {
  //   setbrandInfo({ ...brandInfo, subcategory: newValue?.value })
  // }
  // handle checked function
  // const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setbrandInfo({
  //     ...brandInfo,
  //     [e.target.name]: e.target.checked,
  //   })
  // }

  // const validateForm = () => {
  //   const errors: {
  //     name: string | null | undefined
  //     subcategory: string | null | undefined
  //   } = {
  //     name: undefined,
  //     subcategory: undefined,
  //   }

  //   if (!brandInfo.name) {
  //     errors.name = 'Name is required'
  //   }
  //   if (!brandInfo.subcategory) {
  //     errors.subcategory = 'Subcategory is required'
  //   }
  //   setErrors(errors)

  //   const hasErrors = Object.values(errors).some(error => error !== undefined)
  //   return !hasErrors
  // }

  // handle submit function
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (validateForm()) {
  //     setBtnLoading(true)
  //     const uploadCategoryDataObj: {
  //       name: string
  //       sub_category: number | undefined | null
  //       icon?: string | undefined
  //       is_active: boolean
  //       show_in_ecommerce: boolean
  //     } = {
  //       name: brandInfo.name,
  //       sub_category: brandInfo.subcategory,
  //       is_active: brandInfo.is_active,
  //       show_in_ecommerce: brandInfo.show_in_ecommerce,
  //     }
  //     if (brandInfo.icon_images.length > 0) {
  //       uploadCategoryDataObj.icon = brandInfo.icon_images[0]
  //     } else {
  //       uploadCategoryDataObj.icon = ''
  //     }

  //     if (type === CREATE) {
  //       addBrand(uploadCategoryDataObj)
  //         .then((res: any) => {
  //           if (res.data) {
  //             setBtnLoading(false)
  //             dispatch(setOpen(false))
  //             dispatch(
  //               setNotification({
  //                 open: true,
  //                 message: `Brand created successfully!`,
  //                 type: SUCCESS,
  //               }),
  //             )
  //             setbrandInfo({
  //               name: '',
  //               subcategory: undefined,
  //               icon_images: [],
  //               is_active: false,
  //               show_in_ecommerce: false,
  //             })
  //           }
  //           if (res.error) {
  //             console.log(res?.error?.data?.message)
  //             setBtnLoading(false)
  //             dispatch(setOpen(false))
  //             dispatch(
  //               setNotification({
  //                 open: true,
  //                 message: res.error.data.message,
  //                 type: DANGER,
  //               }),
  //             )
  //             setbrandInfo({
  //               name: '',
  //               subcategory: undefined,
  //               icon_images: [],
  //               is_active: false,
  //               show_in_ecommerce: false,
  //             })
  //           }
  //         })
  //         .catch(error => {
  //           setBtnLoading(false)
  //           console.log(error)
  //         })
  //     } else if (type === EDIT && updateId !== null) {
  //       updateBrand({ id: updateId, data: uploadCategoryDataObj })
  //         .then((res:any) => {
  //           if (res.data) {
  //             setBtnLoading(false)
  //             dispatch(setOpen(false))
  //             dispatch(
  //               setNotification({
  //                 open: true,
  //                 message: 'Brand updated ',
  //                 type: SUCCESS,
  //               }),
  //             )
  //             setbrandInfo({
  //               name: '',
  //               subcategory: undefined,
  //               icon_images: [],
  //               is_active: false,
  //               show_in_ecommerce: false,
  //             })
  //           }
  //           if (res.error) {
  //             setBtnLoading(false)
  //             dispatch(setOpen(false))
  //             dispatch(
  //               setNotification({
  //                 open: true,
  //                 message: res.error.data.message,
  //                 type: DANGER,
  //               }),
  //             )
  //             setbrandInfo({
  //               name: '',
  //               subcategory: undefined,
  //               icon_images: [],
  //               is_active: false,
  //               show_in_ecommerce: false,
  //             })
  //           }
  //         })
  //         .catch(error => {
  //           setBtnLoading(false)
  //           console.log(error)
  //         })
  //     }

  //     // submit function
  //   }
  // }

  // const handleEdit = (editValue: any) => {
  //   // Checking icon & logo type string or array
  //   const isArray = (value: string | string[]) => {
  //     if (value === '') return []
  //     else if (Array.isArray(value) && value.length > 0) {
  //       return value
  //     } else if (typeof value === 'string') {
  //       return [value]
  //     } else return []
  //   }

  //   if (editValue) {
  //     dispatch(setType(EDIT))
  //     dispatch(setOpen(true))
  //     setUpdateId(editValue?.id)
      
  //     const updatedInfo = {
  //       name: editValue.name,
  //       subcategory: editValue.sub_category,
  //       is_active: editValue.is_active,
  //       show_in_ecommerce: editValue.show_in_ecommerce,
  //       icon_images: isArray(editValue.icon),
  //     }
  //     setbrandInfo(prev => ({
  //       ...prev,
  //       ...updatedInfo,
  //     }))
  //   }
  // }

  // const subcategoryOptionsFn = (subcategories: any[]) => {
  //   return subcategories?.map(subcategory => {
  //     return {
  //       label: subcategory.name,
  //       value: subcategory.id,
  //     }
  //   })
  // }
  // const categories = subcategoryOptionsFn(data?.results)

  // useEffect(() => {
  //   if (type === CREATE) {
  //     setbrandInfo(prev => ({
  //       ...prev,
  //       name: '',
  //       sub_category: undefined,
  //       is_active: false,
  //       show_in_ecommerce: false,
  //       icon_images: [],
  //     }))
  //   }
  // }, [type])
  // console.log(categoryInfo)
  // reset error state
  // useEffect(() => {
  //   setErrors({})
  // }, [open])

  return (
    <Box
      sx={{
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? 'rgba(32, 32, 32, 1)' : ' white',
        padding: '16px',
      }}
    >
      <Box component={'h1'} sx={{fontSize:"20px", }} >Add Product</Box>
        <Box>
          <AddUpdateProductForm setProductInfo={setProductInfo}/>
        </Box>
    </Box>
  )
}
