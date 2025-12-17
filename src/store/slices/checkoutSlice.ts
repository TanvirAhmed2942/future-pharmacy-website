import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

export interface CheckoutData {
  pickupAddress: string;
  dropoffAddress: string;
  pickupLocation: { lat: number; lng: number } | null;
  dropoffLocation: { lat: number; lng: number } | null;
  selectedDate: string | null; // ISO string format
  selectedTime: string | null;
  distance: string;
  duration: string;
  zipCode: string;
  city: string;
  state: string;
  // Contact Details
  email: string;
  contactNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO string format
  // Pharmacy
  selectedPharmacyId: string | null;
  isPartnerPharmacy: boolean;
}

export interface CheckoutState {
  checkoutData: CheckoutData;
}

const initialState: CheckoutState = {
  checkoutData: {
    pickupAddress: "",
    dropoffAddress: "",
    pickupLocation: null,
    dropoffLocation: null,
    selectedDate: null,
    selectedTime: null,
    distance: "",
    duration: "",
    zipCode: "",
    city: "",
    state: "",
    // Contact Details
    email: "",
    contactNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    // Pharmacy
    selectedPharmacyId: null,
    isPartnerPharmacy: false,
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutData: (state, action: PayloadAction<Partial<CheckoutData>>) => {
      state.checkoutData = {
        ...state.checkoutData,
        ...action.payload,
      };
    },
    clearCheckoutData: (state) => {
      state.checkoutData = initialState.checkoutData;
    },
  },
});

export const { setCheckoutData, clearCheckoutData } = checkoutSlice.actions;

// Selectors
export const selectCheckoutData = (state: RootState) =>
  state.checkout.checkoutData;
export const selectPickupAddress = (state: RootState) =>
  state.checkout.checkoutData.pickupAddress;
export const selectDropoffAddress = (state: RootState) =>
  state.checkout.checkoutData.dropoffAddress;
export const selectSelectedDate = (state: RootState) =>
  state.checkout.checkoutData.selectedDate;
export const selectSelectedTime = (state: RootState) =>
  state.checkout.checkoutData.selectedTime;
export const selectEmail = (state: RootState) =>
  state.checkout.checkoutData.email;
export const selectContactNumber = (state: RootState) =>
  state.checkout.checkoutData.contactNumber;
export const selectFirstName = (state: RootState) =>
  state.checkout.checkoutData.firstName;
export const selectLastName = (state: RootState) =>
  state.checkout.checkoutData.lastName;
export const selectDateOfBirth = (state: RootState) =>
  state.checkout.checkoutData.dateOfBirth;

export default checkoutSlice.reducer;
