import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/**
 * TASK 6.7 - A second slice proves the architecture scales.
 * No token code here either - the cookie rides along automatically.
 */

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/appointments");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg ?? "Failed to load");
    }
  }
);

export const addAppointment = createAsyncThunk("appointments/add",async(body,{rejectWithValue})=>{
  try{
    const {data} = await api.post("/appointments",body);
    return data;
  }catch (err){
    return rejectWithValue( err.response?.data?.msg??"Failed to create appointment");
  }
});
export const cancelAppointment = createAsyncThunk("appointments/cancel",async(id , {rejectWithValue})=>{
  try{
    await api.delete(`/appointments/${id}`);
    return id;

  }catch(err){
    return rejectWithValue(
      err.response?.data?.msg??"Failed to cancel appointment"
    );
  }
});

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    .addCase(addAppointment.fulfilled,(state,action)=>{
      state.items.unshift(action.payload);
    })
    .addCase(cancelAppointment.fulfilled,(state,action)=>{
state.items = state.items.filter((appointment)=>appointment._id!==action.payload);
    }
)}
});

export default appointmentsSlice.reducer;
