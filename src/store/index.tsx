import countryReducer from '@/views/country/countryStore'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

const store = configureStore({
  reducer: {
    country: countryReducer,
  },
})

// 推断类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// 函数的类型 变成 RootState
// 传入 state 的类型
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store
