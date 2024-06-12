import { createSlice } from "@reduxjs/toolkit";

export const ThemeColorSlice = createSlice({
  name: "counter",
  initialState: {
    themeColor: "#0521f5",
    chartColor: "#a367dc",
  },
  reducers: {
    themeColor: (state, action) => {
      state.themeColor = action.payload;
    },
    chartColor: (state, action) => {
      state.chartColor = action.payload;
    },
  },
});

export const { themeColor, chartColor } =
  ThemeColorSlice.actions;

export default ThemeColorSlice.reducer;
