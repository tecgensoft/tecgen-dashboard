import { createSlice } from '@reduxjs/toolkit';
import { roles } from '../../../layout/constant/roles';


const rolePermissions = roles;

const searchSlice = createSlice({
  name: 'role',
  initialState: rolePermissions,
  reducers: {

  },
})

// export const { } = searchSlice.actions
export default searchSlice.reducer
