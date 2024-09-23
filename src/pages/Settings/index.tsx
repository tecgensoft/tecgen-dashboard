/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import {
    Box,
    Button,
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import SettingsModal from '../../components/modals/SettingsModal'
// import {
//   setMessage,
//   setOpen,
// } from '../../redux/feature/notification/notificationSlice'
import TableLoader from '../../components/table/TableLoader'
import { SUCCESS } from '../../constant/constant'
import { setNotification } from '../../redux/feature/notification/notificationSlice'
import {
    useAddCompanyMutation,
    useGetCompanyMetaInfoQuery,
    useUpdateCompanyMutation,
} from '../../redux/feature/settings/settingsApi'
import { clearMetaInfo } from '../../utils/clearData'
import SettingInput from './_components/SettingsInput'
import { validate } from './validation'

interface ICompanyMetaInfo {
  title: string
  keywords: string
  description: string
  company_name: string
  address: string
  phone: string
  fax: string
  email: string
  icon: File | null
  logo: File | null
  facebook: string
  instagram: string
  twitter: string
  youtube: string
  aboutus: string
  contact: string
  reference: string
}
export default function Settings() {
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const { data: companyInfo, isLoading } = useGetCompanyMetaInfoQuery(undefined)
  const [addCompany] = useAddCompanyMutation()
  const [updateCompany] = useUpdateCompanyMutation()
  const [edit, setEdit] = useState({
    id: null,
    isUpdate: false,
  })
  const [metaInfo, setMetaInfo] = useState<ICompanyMetaInfo>({
    title: '',
    keywords: '',
    description: '',
    company_name: '',
    address: '',
    phone: '',
    fax: '',
    email: '',
    icon: null,
    logo: null,
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    aboutus: '',
    contact: '',
    reference: '',
  })
  const [errors, setErrors] = useState<{
    [key: string]: string | null | undefined
  }>({})

  const [searchTerm, setSearchTerm] = useState('')
  const [isSettingModalOpen, setSettingModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredData = companyInfo?.data.filter(
    (item: { company_name: string }) =>
      item.company_name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMetaInfo({ ...metaInfo, [name]: value })
    setErrors({
      ...errors,
      [e.target.id]: '',
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files.length > 0) {
      setMetaInfo({ ...metaInfo, [name]: files[0] })
    }
  }
  const handleEditCompany = async (id: string | number) => {
    if (id) {
      const item = await currentItems.find((item: any) => item.id === id)
      setEdit((prev: any) => ({ ...prev, id: id, isUpdate: true }))
      setMetaInfo(prev => ({ ...prev, ...item }))
      setSettingModalOpen(true)
    }
  }

  const handleSubmit = async () => {
    const { isValid, errors } = validate(metaInfo)
    if (!isValid) {
      const formData = new FormData()
      formData.append('title', metaInfo.title)
      formData.append('keywords', metaInfo.keywords)
      formData.append('description', metaInfo.description)
      formData.append('company_name', metaInfo.company_name)
      formData.append('address', metaInfo.address)
      formData.append('phone', metaInfo.phone)
      formData.append('fax', metaInfo.fax)
      formData.append('email', metaInfo.email)
      formData.append('facebook', metaInfo.facebook)
      formData.append('instagram', metaInfo.instagram)
      formData.append('twitter', metaInfo.twitter)
      formData.append('youtube', metaInfo.youtube)
      formData.append('aboutus', metaInfo.aboutus)
      formData.append('contact', metaInfo.contact)
      formData.append('reference', metaInfo.reference)

      // Append files
      const isFileOrUrl = (value: any) => {
        if (value instanceof File) {
          return true
        }
        return false
      }
      if (isFileOrUrl(metaInfo.icon)) {
        if (metaInfo.icon) {
          formData.append('icon', metaInfo.icon)
        }
      }
      if (isFileOrUrl(metaInfo.logo)) {
        if (metaInfo.logo) {
          formData.append('logo', metaInfo.logo)
        }
      }
      try {
        if (edit.id) {
          await updateCompany({ id: edit.id, formData: formData }).then(() => {
            setMetaInfo(clearMetaInfo(metaInfo))
            setSettingModalOpen(false)
            dispatch(
              setNotification({
                open: true,
                message: 'Company meta data updated',
                type: SUCCESS,
              }),
            )
            // dispatch(setOpen(true))
            // dispatch(setMessage('Company meta data updated'))
          })
        } else {
          await addCompany(formData)
            .unwrap()
            .then(() => {
              setSettingModalOpen(false)
              setMetaInfo(clearMetaInfo(metaInfo))
              dispatch(
                setNotification({
                  open: true,
                  message: 'Company meta data created',
                  type: SUCCESS,
                }),
              )
              // dispatch(setOpen(true))
              // dispatch(setMessage('Company meta data created'))
            })
        }
      } catch (error: any) {
        const errors = error.data.details
        setErrors(errors)
      }
    } else {
      setErrors(errors)
    }
  }

  return (
    <Box
      component="section"
      sx={{
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? 'rgba(32, 32, 32, 1)' : ' white',
        padding: { xs: '16px', sm: '16px', md: '32px 24px' },
        height: `calc(100vh - ${140}px)`,
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="h1"
        mb={{ xs: 5, sm: 6, md: 8 }}
        sx={{
          fontSize: { xs: '14px', sm: '16px' },
          fontWeight: '500',
        }}
      >
        Company Meta Info List
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          gap: { xs: '8px', lg: '16px' },
        }}
      >
        <SettingInput
          placeholder="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button
          variant="contained"
          color="secondary"
          sx={{
            height: '42px',
          }}
          onClick={() => {
            setEdit((prev: any) => ({ ...prev, id: null, isUpdate: false }))
            setMetaInfo(clearMetaInfo(metaInfo))
            setSettingModalOpen(true)
          }}
        >
          Create
        </Button>
      </div>
      {isLoading ? (
        <TableLoader />
      ) : (
        <TableContainer component={Paper}>
          <Table
            aria-label="simple table"
            sx={{
              bgcolor: theme =>
                theme.palette.mode === 'dark' ? '#2D2D2D' : ' white',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems?.map((row: any, index: number) => {
                return (
                  <TableRow
                    sx={{
                      bgcolor: theme =>
                        `${index % 2 === 0 ? `${theme.palette.mode === 'light' ? '#EFF3F4' : '#202020'}` : ''}`,
                      height: '60px',
                    }}
                    key={row.id}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell>{row.company_name}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit Company Info">
                        <IconButton
                          onClick={() => handleEditCompany(row.id)}
                          color="primary"
                        >
                          <ModeEditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Pagination
        count={Math.ceil(filteredData?.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: 'flex', justifyContent: 'end', marginTop: 2 }}
      />
      <SettingsModal
        metaInfo={metaInfo}
        isOpen={isSettingModalOpen}
        handleClose={() => {
          setEdit((prev: any) => ({ ...prev, id: null, isUpdate: false }))
          setSettingModalOpen(false)
        }}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        errors={errors}
        edit={edit}
      />
    </Box>
  )
}
