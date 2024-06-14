import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../constants/helper";


export const initialState =  {
    ResourcesMenu: {
        loading: true,
        data: [],
        error: null,
        msg: null,
    }
}


const slice_base_url = API_BASE_URL();


// Request Api name
let ResourcesMenuReq = `${slice_base_url}/Resources`;


export const ResourcesMenuApi =  createAsyncThunk(
    "resourcesMenu",
      async()=> {
        const response = await axios.get(`${ResourcesMenuReq}`)
        return response?.data
      }
)

const ExtraSlice = createSlice({
    name: "ExtraApi", 
    initialState,
    reducers : {},
    extraReducers: (builder)=> {
        builder.addCase(ResourcesMenuApi.pending, (state)=> {
            state.ResourcesMenu.loading = true,
            state.ResourcesMenu.error = false,
            state.ResourcesMenu.msg = null
        });
        builder.addCase(ResourcesMenuApi.fulfilled, (state, action)=> {
            state.ResourcesMenu.loading = false,
            state.ResourcesMenu.data = action.payload.Data
            state.ResourcesMenu.error = null
            state.ResourcesMenu.msg = "success"
        });
        builder.addCase(ResourcesMenuApi.rejected, (state, action)=> {
            state.ResourcesMenu.loading = false,
            state.ResourcesMenu.data = action.payload.Data
            state.ResourcesMenu.error = action.payload?.error
            state.ResourcesMenu.msg = action.payload?.msg
        });
    }
})


export default ExtraSlice.reducer;