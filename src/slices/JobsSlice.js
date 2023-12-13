import { createSlice } from "@reduxjs/toolkit";

const initState = {
  jobs: [],
  allJob: [],
  singleJob: {},
  listJob: [],
  actionStatusCode: 0,
  manager: {
    jobs: [],
    jobUpdate: {},
  },
  searchJobs: [],
};
const JobsSlice = createSlice({
  name: "job",
  initialState: initState,
  reducers: {
    setJobs: (state, {payload}) => {
      state.jobs = payload;
    },
    setAllJob: (state, { payload }) => {
      state.allJob = payload;
    },
    setSingleJob: (state, { payload }) => {
      state.singleJob = payload;
    },
    setListJob: (state, {payload}) => {
      state.listJob = payload
    },
    setActionStatus: (state, { payload }) => {
      state.actionStatusCode = payload
    },
    setJobUpdate: (state, { payload }) => {
      state.manager.jobUpdate = payload;
    },
    setSearchJob: (state, { payload }) => {
      state.searchJobs = payload;
    },
  },
});

export const { setJobs, setAllJob,setSingleJob, setListJob, setActionStatus, setJobUpdate, setSearchJob } = JobsSlice.actions;

export default JobsSlice.reducer;