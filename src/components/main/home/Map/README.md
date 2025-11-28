# Google Maps Integration

This directory contains all the components and utilities for Google Maps integration in the pharmacy delivery service.

## Setup Instructions

### 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Places API** (for address autocomplete)
   - **Geocoding API** (for converting addresses to coordinates)
   - **Directions API** (optional, for route display)
4. Create credentials (API Key)
5. Restrict the API key (recommended):
   - Application restrictions: HTTP referrers
   - API restrictions: Select only the APIs you need

### 2. Add API Key to Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

**Important:**

- The `NEXT_PUBLIC_` prefix is required for Next.js to expose the variable to the browser
- Never commit `.env.local` to version control (it's already in `.gitignore`)
- Restart your development server after adding the environment variable

### 3. Install Dependencies

The required package `@react-google-maps/api` should already be installed. If not, run:

```bash
npm install @react-google-maps/api
```

## Component Structure

### Main Components

- **`index.tsx`** - Main map component that handles all map logic
- **`GoogleMapsProvider.tsx`** - Wraps the map with Google Maps script loader
- **`PharmacyMap.tsx`** - Core map component with markers and routes
- **`PharmacyMarker.tsx`** - Individual pharmacy marker with info window
- **`AddressAutocomplete.tsx`** - Address input with Google Places autocomplete

### Utilities

- **`useGeocode.ts`** - Hook for geocoding addresses and reverse geocoding
- **`usePharmacySearch.ts`** - Hook for searching pharmacies near a location
- **`types.ts`** - TypeScript type definitions

## Usage

### Basic Map Component

```tsx
import MapComponent from "@/components/main/home/Map";

<MapComponent
  pickupAddress="123 Main St, Newark, NJ"
  dropoffAddress="456 Broad St, Newark, NJ"
  zipCode="07102"
  city="Newark"
  state="NJ"
  onPharmacyClick={(pharmacy) => console.log(pharmacy)}
  showRoute={true}
  height="600px"
/>;
```

### With Address Autocomplete

```tsx
import GoogleMapsProvider from "@/components/main/home/Map/GoogleMapsProvider";
import AddressAutocomplete from "@/components/main/home/Map/AddressAutocomplete";

<GoogleMapsProvider>
  <AddressAutocomplete
    value={address}
    onChange={setAddress}
    onSelect={(location, address) => {
      console.log("Selected:", location, address);
    }}
    placeholder="Enter address"
  />
</GoogleMapsProvider>;
```

## Features

### ✅ Implemented

- ✅ Pickup and dropoff address input with autocomplete
- ✅ Map displays pickup and dropoff locations
- ✅ Map updates when zipcode, city, or state changes
- ✅ Pharmacy markers displayed on map
- ✅ Clickable pharmacy markers with info windows
- ✅ Route display between pickup and dropoff
- ✅ Automatic bounds calculation to fit all markers

### 🔄 To Customize

1. **Pharmacy Data**: Update `usePharmacySearch.ts` to connect to your actual pharmacy database/API
2. **Pharmacy Info**: Customize the info window content in `PharmacyMarker.tsx`
3. **Styling**: Adjust marker colors, sizes, and map styles
4. **Pharmacy Selection**: Implement the `onPharmacyClick` handler in your parent component

## API Costs

Google Maps API is billed per request. Be aware of:

- **Maps JavaScript API**: Free tier includes 28,000 map loads/month
- **Places API**: Free tier includes $200 credit/month
- **Geocoding API**: Free tier includes $200 credit/month

Monitor your usage in the Google Cloud Console.

## Troubleshooting

### Map not showing

- Check that `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set in `.env.local`
- Verify the API key is valid and has the required APIs enabled
- Check browser console for errors
- Ensure you've restarted the dev server after adding the env variable

### Autocomplete not working

- Ensure Places API is enabled in Google Cloud Console
- Check that the API key has Places API access
- Verify the API key restrictions allow your domain

### Markers not appearing

- Check that pharmacy data is being loaded correctly
- Verify coordinates are valid (lat: -90 to 90, lng: -180 to 180)
- Check browser console for errors
