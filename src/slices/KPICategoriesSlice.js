import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allKpiCategories: [],
  newKpiCategories: [],
  actionStatusCode: 0,
  singleKpiCategories: {},
  manager: {
    kpiCategories: [],
    kpiCategoriesUpdate: {},
  },
  searchKpiCategories: [],
}
const KPICategoriesSlice = createSlice({
  name: 'kpi_categories',
  initialState: initState,
  reducers: {
    setKPICategories: (state, { payload }) => {
      state.allKpiCategories = payload
    },
    setNewKPICate: (state, { payload }) => {
      state.newKpiCategories = payload
    },
    setActionStatus: (state, { payload }) => {
      state.actionStatusCode = payload
    },
    setRoleUpdate: (state, { payload }) => {
      state.manager.kpiCategoriesUpdate = payload;
    },
    setSingleKPICategories: (state, { payload }) => {
      state.singleKpiCategories = payload;
    },
    setSearchKPICategories: (state, { payload }) => {
      state.searchKpiCategories = payload;
    },
  },
})

export const {
  setKPICategories,
  setNewKPICate,
  setActionStatus,
  setRoleUpdate,
  setSingleKPICategories,
  setSearchKPICategories
} = KPICategoriesSlice.actions

export default KPICategoriesSlice.reducer
