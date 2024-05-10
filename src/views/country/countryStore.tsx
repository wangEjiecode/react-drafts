import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCountryList } from './countryService'

export const fetchCountry = createAsyncThunk(
  'country/fetchCountry',
  async () => {
    const response = await getCountryList()
    return response.data
  }
)

interface ICountryState {
  country: any[]
}
const initialState: ICountryState = {
  country: [],
}
const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCountry.fulfilled, (state, { payload }) => {
      state.country = payload
    })
  },
})

export default countrySlice.reducer
