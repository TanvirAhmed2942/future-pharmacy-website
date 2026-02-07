import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location, Pharmacy } from "@/components/main/home/Map/types";

interface MapState {
  pickupAddress: string;
  dropoffAddress: string;
  pickupName: string;
  dropoffName: string;
  pickupLocation: Location | null;
  dropoffLocation: Location | null;
  zipCode: string;
  city: string;
  state: string;
  currentLocation: string;
  selectedPharmacy: Pharmacy | null;
  distance: string | null;
  duration: string | null;
}

const initialState: MapState = {
  pickupAddress: "",
  dropoffAddress: "",
  pickupName: "",
  dropoffName: "",
  pickupLocation: null,
  dropoffLocation: null,
  zipCode: "",
  city: "",
  state: "",
  currentLocation: "",
  selectedPharmacy: null,
  distance: null,
  duration: null,
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
    setPickupName: (state, action: PayloadAction<string>) => {
      state.pickupName = action.payload;
    },
    setDropoffName: (state, action: PayloadAction<string>) => {
      state.dropoffName = action.payload;
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
    setDistance: (state, action: PayloadAction<string | null>) => {
      state.distance = action.payload;
    },
    setDuration: (state, action: PayloadAction<string | null>) => {
      state.duration = action.payload;
    },
    resetMapState: (state) => {
      state.pickupAddress = "";
      state.dropoffAddress = "";
      state.pickupName = "";
      state.dropoffName = "";
      state.pickupLocation = null;
      state.dropoffLocation = null;
      state.distance = null;
      state.duration = null;
      state.selectedPharmacy = null;
    },
  },
});

export const {
  setPickupAddress,
  setDropoffAddress,
  setPickupName,
  setDropoffName,
  setPickupLocation,
  setDropoffLocation,
  setZipCode,
  setCity,
  setState,
  setCurrentLocation,
  setSelectedPharmacy,
  setDistance,
  setDuration,
  resetMapState,
} = mapSlice.actions;

export default mapSlice.reducer;
