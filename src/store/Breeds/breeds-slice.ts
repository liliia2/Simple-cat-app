import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { Breed } from "../../models/breed";

export interface BreedsState {
  breeds: Breed[] | null;
  count: string | null;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: BreedsState = {
  breeds: [],
  count: null,
  error: null,
  status: "idle",
};

export const breedsSlice = createSlice({
  name: "breeds",
  initialState,
  reducers: {
    setBreeds: (state, action) => {
      state.breeds = action.payload.breeds ?? [];
      state.error = action.payload.error ?? null;
      state.count = action.payload.count ?? null;
      state.status = action.payload.status;
    },
  },
});

export const breedsActions = breedsSlice.actions;

export const breeds = (state: RootState) => state.breeds;

export default breedsSlice.reducer;
