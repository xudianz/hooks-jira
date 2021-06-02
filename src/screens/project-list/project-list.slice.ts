import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"

export interface State {
  projectModelOpen: boolean
}

const initialState: State = {
  projectModelOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    openProjectModel(state) {
      // 内置了immer 返回了新对象
      state.projectModelOpen = true
    },
    closeProjectModel(state) {
      state.projectModelOpen = false
    }
  }
})

export const projectListActions = projectListSlice.actions
export const selectProjectModelOpen = (state: RootState) => state.projectList.projectModelOpen
