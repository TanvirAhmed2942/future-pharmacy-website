import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location, Pharmacy } from "@/components/main/home/Map/types";

interface MapState {
  pickupAddress: string;
  dropoffAddress: string;
  pickupLocation: Location | null;
  dropoffLocation: Location | null;
  zipCode: string;
  city: string;
  state: string;
  currentLocation: string;
  selectedPharmacy: Pharmacy | null;
}

const initialState: MapState = {
  pickupAddress: "",
  dropoffAddress: "",
  pickupLocation: null,
  dropoffLocation: null,
  zipCode: "",
  city: "",
  state: "",
  currentLocation: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
  selectedPharmacy: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setPickupAddress: (state, action: PayloadAction<string>) => {
      state.pickupAddress = action.payload;
    },
    setDropoffAddress: (state, action: PayloadAction<string>) => {
      state.dropoffAddress = action.payload;
    },
    setPickupLocation: (state, action: PayloadAction<Location | null>) => {
      state.pickupLocation = action.payload;
    },
    setDropoffLocation: (state, action: PayloadAction<Location | null>) => {
      state.dropoffLocation = action.payload;
    },
    setZipCode: (state, action: PayloadAction<string>) => {
      state.zipCode = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setCurrentLocation: (state, action: PayloadAction<string>) => {
      state.currentLocation = action.payload;
    },
    setSelectedPharmacy: (state, action: PayloadAction<Pharmacy | null>) => {
      state.selectedPharmacy = action.payload;
    },
    resetMapState: (state) => {
      state.pickupAddress = "";
      state.dropoffAddress = "";
      state.pickupLocation = null;
      state.dropoffLocation = null;
    },
  },
});

export const {
  setPickupAddress,
  setDropoffAddress,
  setPickupLocation,
  setDropoffLocation,
  setZipCode,
  setCity,
  setState,
  setCurrentLocation,
  setSelectedPharmacy,
  resetMapState,
} = mapSlice.actions;

export default mapSlice.reducer;
