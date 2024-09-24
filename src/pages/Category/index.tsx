import { Box } from '@mui/material'
import ModalView from '../../components/modals/Modal'
import Table from '../../components/table/Table'
import TableHeader from '../../components/table/TableHeader'
import CategoryColumn from './_components/CategoryColumn'
import CategoryCreateANDUpdate from './_components/CategoryCreateANDUpdate'
export default function Category() {
  return (
    <Box
      sx={{
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? 'rgba(32, 32, 32, 1)' : ' white',
        padding: '16px',
      }}
    >
      <TableHeader tableTitle="Category List" />
      <Table  columns={CategoryColumn()}/>
      <ModalView headerTitle='Create category'>
        <CategoryCreateANDUpdate />
      </ModalView>
    </Box>
  )
}
