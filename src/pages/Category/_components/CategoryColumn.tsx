/* eslint-disable @typescript-eslint/no-explicit-any */

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import ConfirmDeleteModal from '../../../components/modals/ConfirmDeleteModal'
import { SUCCESS } from '../../../constant/constant'
import { setNotification } from '../../../redux/feature/notification/notificationSlice'
import { useDeleteCategoryMutation } from '../../../redux/feature/productManagement/productManagementApi'

export default function CategoryColumn(handleEdit: { (editValue: any): void; (arg0: any): void }) {
  const [categoryId, setCategoryId] = useState(null)
  const [deleteCategory, {isLoading}] = useDeleteCategoryMutation()
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const dispatch = useDispatch()
  
const handleView = (row: { id: SetStateAction<null> }) => {
  if(row) setCategoryId(row.id)
}
  const handleDelete = async (deleteValue: string|null) => {
    
    if(deleteValue){
      
      try {
        await deleteCategory({id: deleteValue}).then((res) => {
          setDeleteModalOpen(false)
          if(res.data){
            dispatch(
              setNotification({
                open: true,
                message: 'Category Deleted Successfully!',
                type: SUCCESS,
              }),
            )
          } else if(res.error){
            dispatch(
              setNotification({
                open: true,
                message: 'Category not deleted. Something went wrong!',
                type: SUCCESS,
              }),
            )
          }
          
        })
      } catch (error) {
        console.log(error)
        setDeleteModalOpen(false)
        dispatch(
          setNotification({
            open: true,
            message: 'Category not deleted. Something went wrong!',
            type: SUCCESS,
          }),
        )
      }
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'icon',
      headerName: 'Icon',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 80,
      flex: 0.2,
      renderCell: value => {
        return (
          <Box sx={{ display: 'flex', py: '4px' }}>
            {value.value.length > 0 && (
              <img src={value.value} alt="Icon" height={'40px'} />
            )}
          </Box>
        )
      },
    },
    {
      field: 'logo',
      headerName: 'Logo',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 80,
      flex: 0.2,
      renderCell: value => {
        return (
          <Box sx={{ display: 'flex', py: '4px' }}>
            {value.value.length > 0 && (
              <img src={value.value} alt="Icon" height={'40px'} />
            )}
          </Box>
        )
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 300,
      flex: 1,
    },
    {
      field: 'show_in_ecommerce',
      headerName: 'Show in Ecommerce',
      minWidth: 180,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (value: any) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {value.value ? (
            <Typography sx={{ color: 'rgb(2, 191, 108)' }}>Yes</Typography>
          ) : (
            <Typography sx={{ color: 'rgb(238, 72, 92)' }}>No</Typography>
          )}
        </Box>
      ),
    },
    {
      field: 'is_active',
      headerName: 'Is Active',
      flex: 0.2,
      minWidth: 70,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (value: any) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {value.value ? (
            <Typography sx={{ color: 'rgb(2, 191, 108)' }}>Yes</Typography>
          ) : (
            <Typography sx={{ color: 'rgb(238, 72, 92)' }}>No</Typography>
          )}
        </Box>
      ),
    },
    {
      field: 'created_by',
      headerName: 'Created By',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
      flex: 0.5,
      valueGetter: (value: any) => value?.username,
    },
    {
      field: 'ordering',
      headerName: 'Ordering',
      sortable: false,
      disableColumnMenu: true,
      minWidth: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      minWidth: 150,
      disableColumnMenu: true,
      flex: 0.2,
      renderCell: params => {
        // console.log(params)
        const row = params.row
        return (
          <Box>
            <Tooltip title={`Edit`}>
              <IconButton
                color="primary"
                aria-label="edit"
                onClick={() => handleEdit(row)}
                sx={{
                  borderRadius: '8px',
                  padding: '8px',
                  background: '#32976a0a',
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                sx={{
                  borderRadius: '8px',
                  padding: '8px',
                  background: '#0000000a',
                  mx: '4px',
                }}
                onClick={() => {
                  setDeleteModalOpen(!deleteModalOpen)
                  handleView(row)
                }}
                aria-label="delete"
              >
                <DeleteIcon color="secondary" />
              </IconButton>
            </Tooltip>
            <ConfirmDeleteModal
              title={'Are you sure you want to delete this Category?'}
              open={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              onConfirm={() => handleDelete(categoryId)}
              isLoading={isLoading}
            ></ConfirmDeleteModal>
          </Box>
        )
      },
    },
  ]

  return columns
}