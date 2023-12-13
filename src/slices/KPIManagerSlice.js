import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allKpiManager: [],
  newKpiManager: [],
  actionStatusCode: 0,
  singleKpiManager: {},
  manager: {
    kpiManager: [],
    kpiManagerUpdate: {},
  },
  searchKpiManager: [],
}
const KPIManagerSlice = createSlice({
  name: 'kpi_manager',
  initialState: initState,
  reducers: {
    setKPIManager: (state, { payload }) => {
      state.allKpiManager = payload
    },
    setNewKPICate: (state, { payload }) => {
      state.newKpiManager = payload
    },
    setActionStatus: (state, { payload }) => {
      state.actionStatusCode = payload
    },
    setRoleUpdate: (state, { payload }) => {
      state.manager.kpiManagerUpdate = payload;
    },
    setSingleKPIManager: (state, { payload }) => {
      state.singleKpiManager = payload;
    },
    setSearchKPIManager: (state, { payload }) => {
      state.searchKpiManager = payload;
    },
  },
})

export const {
  setKPIManager,
  setNewKPICate,
  setActionStatus,
  setRoleUpdate,
  setSingleKPIManager,
  setSearchKPIManager
} = KPIManagerSlice.actions

export default KPIManagerSlice.reducer
