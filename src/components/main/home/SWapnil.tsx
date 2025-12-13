// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//   MapPin,
//   Navigation,
//   Clock,
//   Trash2,
//   MousePointerClick,
// } from "lucide-react";

// const InteractiveRouteMap = () => {
//   const [directionsRenderer, setDirectionsRenderer] =
//     useState<google.maps.DirectionsRenderer | null>(null);
//   const [routeInfo, setRouteInfo] = useState<{
//     distance: string;
//     distanceValue: number;
//     duration: string;
//     durationValue: number;
//     startAddress: string;
//     endAddress: string;
//     alternativeRoutes: number;
//     allRoutes: google.maps.DirectionsResult["routes"];
//   } | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
//   const [destination, setDestination] =
//     useState<google.maps.LatLngLiteral | null>(null);
//   const [originMarker, setOriginMarker] = useState<google.maps.Marker | null>(
//     null
//   );
//   const [destinationMarker, setDestinationMarker] =
//     useState<google.maps.Marker | null>(null);

//   const mapRef = useRef<google.maps.Map | null>(null);
//   const clickListenerRef = useRef<google.maps.MapsEventListener | null>(null);

//   // Initialize map
//   const initMap = useCallback(() => {
//     if (!window.google) return;
//     const mapEl = document.getElementById("map");
//     if (!mapEl) return;

//     const defaultCenter: google.maps.LatLngLiteral = {
//       lat: 40.7128,
//       lng: -74.006,
//     };

//     const mapInstance = new window.google.maps.Map(mapEl as HTMLElement, {
//       zoom: 15,
//       center: defaultCenter,
//       mapTypeControl: true,
//       streetViewControl: true,
//       fullscreenControl: true,
//       clickableIcons: false,
//     });

//     const renderer = new window.google.maps.DirectionsRenderer({
//       map: mapInstance,
//       suppressMarkers: false,
//       polylineOptions: {
//         strokeColor: "#4285F4",
//         strokeWeight: 5,
//       },
//     });

//     mapRef.current = mapInstance;
//     setDirectionsRenderer(renderer);

//     // Add click listener to map
//     const listener = mapInstance.addListener(
//       "click",
//       (event: google.maps.MapMouseEvent) => {
//         if (event.latLng) {
//           handleMapClick(event.latLng);
//         }
//       }
//     );
//     clickListenerRef.current = listener;
//   }, []);

//   useEffect(() => {
//     const loadGoogleMaps = () => {
//       if (window.google && window.google.maps) {
//         initMap();
//         return;
//       }

//       if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
//         const script = document.createElement("script");
//         script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA32BfdWG2D3Qo-kMz9AbTON0PDnx1H-8Y`;
//         script.async = true;
//         script.defer = true;
//         script.onload = initMap;
//         script.onerror = () =>
//           setError("Failed to load Google Maps. Please check your API key.");
//         document.head.appendChild(script);
//       }
//     };

//     loadGoogleMaps();
//   }, [initMap]);

//   const handleMapClick = useCallback(
//     (latLng: google.maps.LatLng) => {
//       const position: google.maps.LatLngLiteral = {
//         lat: latLng.lat(),
//         lng: latLng.lng(),
//       };

//       if (!origin) {
//         // Set origin (first click)
//         setOrigin(position);

//         // Remove old origin marker if exists
//         if (originMarker) {
//           originMarker.setMap(null);
//         }

//         // Create new origin marker
//         const marker = new window.google.maps.Marker({
//           position: position,
//           map: mapRef.current,
//           title: "Origin (Drag to adjust)",
//           label: {
//             text: "A",
//             color: "white",
//             fontWeight: "bold",
//           },
//           icon: {
//             path: window.google.maps.SymbolPath.CIRCLE,
//             scale: 12,
//             fillColor: "#10B981",
//             fillOpacity: 1,
//             strokeColor: "#059669",
//             strokeWeight: 3,
//           },
//           draggable: true,
//           animation: window.google.maps.Animation.DROP,
//         });

//         marker.addListener("dragend", (event: google.maps.MapMouseEvent) => {
//           if (!event.latLng) return;
//           const newPos: google.maps.LatLngLiteral = {
//             lat: event.latLng.lat(),
//             lng: event.latLng.lng(),
//           };
//           setOrigin(newPos);
//         });

//         setOriginMarker(marker);
//       } else if (!destination) {
//         // Set destination (second click)
//         setDestination(position);

//         // Remove old destination marker if exists
//         if (destinationMarker) {
//           destinationMarker.setMap(null);
//         }

//         // Create new destination marker
//         const marker = new window.google.maps.Marker({
//           position: position,
//           map: mapRef.current,
//           title: "Destination (Drag to adjust)",
//           label: {
//             text: "B",
//             color: "white",
//             fontWeight: "bold",
//           },
//           icon: {
//             path: window.google.maps.SymbolPath.CIRCLE,
//             scale: 12,
//             fillColor: "#EF4444",
//             fillOpacity: 1,
//             strokeColor: "#DC2626",
//             strokeWeight: 3,
//           },
//           draggable: true,
//           animation: window.google.maps.Animation.DROP,
//         });

//         marker.addListener("dragend", (event: google.maps.MapMouseEvent) => {
//           if (!event.latLng) return;
//           const newPos: google.maps.LatLngLiteral = {
//             lat: event.latLng.lat(),
//             lng: event.latLng.lng(),
//           };
//           setDestination(newPos);
//         });

//         setDestinationMarker(marker);
//       }
//     },
//     [origin, destination, originMarker, destinationMarker]
//   );

//   const calculateRoute = useCallback(() => {
//     if (!window.google || !directionsRenderer || !origin || !destination) {
//       console.log("Missing requirements:", {
//         google: !!window.google,
//         directionsRenderer: !!directionsRenderer,
//         origin: !!origin,
//         destination: !!destination,
//       });
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     // Hide the custom markers when showing route
//     if (originMarker) originMarker.setVisible(false);
//     if (destinationMarker) destinationMarker.setVisible(false);

//     const directionsService = new window.google.maps.DirectionsService();

//     const request = {
//       origin: new window.google.maps.LatLng(origin.lat, origin.lng),
//       destination: new window.google.maps.LatLng(
//         destination.lat,
//         destination.lng
//       ),
//       travelMode: window.google.maps.TravelMode.DRIVING,
//       optimizeWaypoints: true,
//       provideRouteAlternatives: true,
//       avoidHighways: false,
//       avoidTolls: false,
//       unitSystem: window.google.maps.UnitSystem.METRIC,
//     };

//     console.log("Calculating route with request:", request);

//     directionsService.route(request, (result, status) => {
//       setLoading(false);
//       console.log("Route calculation result:", status, result);

//       if (status === "OK" && result) {
//         directionsRenderer.setDirections(result);

//         const route = result.routes[0];
//         const leg = route.legs[0];

//         setRouteInfo({
//           distance: leg.distance?.text || "",
//           distanceValue: leg.distance?.value || 0,
//           duration: leg.duration?.text || "",
//           durationValue: leg.duration?.value || 0,
//           startAddress: leg.start_address || "",
//           endAddress: leg.end_address || "",
//           alternativeRoutes: result.routes.length,
//           allRoutes: result.routes,
//         });

//         // Fit bounds to show entire route
//         const bounds = new window.google.maps.LatLngBounds();
//         bounds.extend(origin);
//         bounds.extend(destination);
//         if (mapRef.current) {
//           mapRef.current.fitBounds(bounds);
//         }
//       } else {
//         setError(
//           `Could not calculate route: ${status}. Please check if both points are accessible by road.`
//         );
//         // Show markers again if route fails
//         if (originMarker) originMarker.setVisible(true);
//         if (destinationMarker) destinationMarker.setVisible(true);
//       }
//     });
//   }, [
//     directionsRenderer,
//     origin,
//     destination,
//     originMarker,
//     destinationMarker,
//   ]);

//   // Auto-calculate route when both points are selected
//   useEffect(() => {
//     if (origin && destination && directionsRenderer) {
//       console.log("Triggering route calculation", { origin, destination });
//       // Small delay to ensure markers are set
//       const timer = setTimeout(() => {
//         calculateRoute();
//       }, 300);
//       return () => clearTimeout(timer);
//     }
//   }, [origin, destination, directionsRenderer, calculateRoute]);

//   const clearAll = () => {
//     if (originMarker) originMarker.setMap(null);
//     if (destinationMarker) destinationMarker.setMap(null);
//     if (directionsRenderer)
//       directionsRenderer.setDirections({
//         routes: [],
//       } as unknown as google.maps.DirectionsResult);

//     setOrigin(null);
//     setDestination(null);
//     setOriginMarker(null);
//     setDestinationMarker(null);
//     setRouteInfo(null);
//     setError(null);
//   };

//   const switchToAlternativeRoute = (routeIndex: number) => {
//     if (!routeInfo || !routeInfo.allRoutes || !routeInfo.allRoutes[routeIndex])
//       return;

//     const selectedRoute = routeInfo.allRoutes[routeIndex];
//     const leg = selectedRoute.legs[0];

//     // Create new result with only selected route
//     const newResult: google.maps.DirectionsResult = {
//       routes: [selectedRoute],
//       geocoded_waypoints: [],
//       request: {} as any,
//     };

//     directionsRenderer?.setDirections(newResult);

//     setRouteInfo({
//       distance: leg.distance?.text || "",
//       distanceValue: leg.distance?.value || 0,
//       duration: leg.duration?.text || "",
//       durationValue: leg.duration?.value || 0,
//       startAddress: leg.start_address || "",
//       endAddress: leg.end_address || "",
//       alternativeRoutes: routeInfo.allRoutes.length,
//       allRoutes: routeInfo.allRoutes,
//     });
//   };

//   const getStatusMessage = () => {
//     if (!origin && !destination) {
//       return "👆 Click on the map to set your starting point (Origin A)";
//     }
//     if (origin && !destination) {
//       return "👆 Click on the map again to set your destination (Destination B)";
//     }
//     if (origin && destination && !routeInfo && !loading) {
//       return "⏳ Calculating route...";
//     }
//     if (routeInfo) {
//       return "✅ Route calculated! Drag markers to adjust or clear to start over.";
//     }
//     return "";
//   };

//   return (
//     <div className="w-full h-screen flex flex-col bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b border-gray-200 p-4">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//             <Navigation className="text-blue-600" size={28} />
//             Interactive Route Planner
//           </h1>
//           <p className="text-sm text-gray-600 mt-1">
//             Click on the map to select origin and destination points
//           </p>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
//         {/* Sidebar */}
//         <div className="w-full lg:w-96 bg-white shadow-lg overflow-y-auto">
//           <div className="p-4 space-y-4">
//             {/* Status Card */}
//             <div
//               className={`border-2 rounded-lg p-4 transition-colors ${
//                 !origin
//                   ? "border-green-400 bg-green-50"
//                   : origin && !destination
//                   ? "border-red-400 bg-red-50"
//                   : "border-blue-400 bg-blue-50"
//               }`}
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <MousePointerClick
//                   size={20}
//                   className={
//                     !origin
//                       ? "text-green-600"
//                       : origin && !destination
//                       ? "text-red-600"
//                       : "text-blue-600"
//                   }
//                 />
//                 <span className="font-semibold text-gray-900">
//                   {!origin
//                     ? "Step 1 of 2"
//                     : !destination
//                     ? "Step 2 of 2"
//                     : "Ready!"}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-700">{getStatusMessage()}</p>
//             </div>

//             {/* Progress Indicators */}
//             <div className="flex gap-2">
//               <div
//                 className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium text-center transition-colors ${
//                   origin
//                     ? "bg-green-600 text-white"
//                     : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 <MapPin size={16} className="inline mr-1" />
//                 Origin {origin ? "✓" : ""}
//               </div>
//               <div
//                 className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium text-center transition-colors ${
//                   destination
//                     ? "bg-red-600 text-white"
//                     : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 <MapPin size={16} className="inline mr-1" />
//                 Destination {destination ? "✓" : ""}
//               </div>
//             </div>

//             {/* Loading/Error States */}
//             {loading && (
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                 <div className="flex items-center gap-2">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
//                   <span className="text-blue-800">
//                     Calculating shortest route...
//                   </span>
//                 </div>
//               </div>
//             )}

//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                 <p className="text-red-800 text-sm font-medium">⚠️ {error}</p>
//                 <button
//                   onClick={calculateRoute}
//                   className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
//                 >
//                   Try again
//                 </button>
//               </div>
//             )}

//             {/* Selected Points */}
//             {(origin || destination) && (
//               <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
//                 {origin && (
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                       <span className="text-xs font-semibold text-gray-600 uppercase">
//                         Origin (A)
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-600 ml-5 font-mono">
//                       Lat: {origin.lat.toFixed(6)}, Lng: {origin.lng.toFixed(6)}
//                     </p>
//                   </div>
//                 )}

//                 {destination && (
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                       <span className="text-xs font-semibold text-gray-600 uppercase">
//                         Destination (B)
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-600 ml-5 font-mono">
//                       Lat: {destination.lat.toFixed(6)}, Lng:{" "}
//                       {destination.lng.toFixed(6)}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Route Information */}
//             {routeInfo && (
//               <div className="space-y-3">
//                 <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 rounded-lg p-4">
//                   <div className="flex items-center gap-2 mb-3">
//                     <Navigation className="text-green-600" size={22} />
//                     <span className="font-bold text-green-900 text-lg">
//                       Shortest Route
//                     </span>
//                   </div>

//                   <div className="space-y-3">
//                     <div className="bg-white rounded-lg p-3">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <MapPin size={18} className="text-blue-600" />
//                           <span className="text-gray-600 font-medium">
//                             Distance
//                           </span>
//                         </div>
//                         <span className="text-xl font-bold text-gray-900">
//                           {routeInfo.distance}
//                         </span>
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1 text-right">
//                         {(routeInfo.distanceValue / 1000).toFixed(2)} km
//                       </p>
//                     </div>

//                     <div className="bg-white rounded-lg p-3">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <Clock size={18} className="text-orange-600" />
//                           <span className="text-gray-600 font-medium">
//                             Duration
//                           </span>
//                         </div>
//                         <span className="text-xl font-bold text-gray-900">
//                           {routeInfo.duration}
//                         </span>
//                       </div>
//                       <p className="text-xs text-gray-500 mt-1 text-right">
//                         {Math.round(routeInfo.durationValue / 60)} minutes
//                       </p>
//                     </div>

//                     {routeInfo.alternativeRoutes > 1 && (
//                       <div className="mt-3 pt-3 border-t border-green-200">
//                         <p className="text-gray-700 font-semibold mb-2 text-sm">
//                           📍 {routeInfo.alternativeRoutes} alternative routes
//                           found
//                         </p>
//                         <div className="flex flex-wrap gap-2">
//                           {[
//                             ...Array(Math.min(routeInfo.alternativeRoutes, 3)),
//                           ].map((_, i) => (
//                             <button
//                               key={i}
//                               onClick={() => switchToAlternativeRoute(i)}
//                               className="flex-1 px-3 py-2 bg-white border-2 border-green-300 rounded-lg text-sm font-medium text-green-700 hover:bg-green-100 hover:border-green-400 transition-all"
//                             >
//                               Route {i + 1}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Full Addresses */}
//                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                       <span className="text-xs font-semibold text-gray-600 uppercase">
//                         From
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-800 ml-5 leading-relaxed">
//                       {routeInfo.startAddress}
//                     </p>
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                       <span className="text-xs font-semibold text-gray-600 uppercase">
//                         To
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-800 ml-5 leading-relaxed">
//                       {routeInfo.endAddress}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="space-y-2">
//               {origin && destination && !routeInfo && !loading && (
//                 <button
//                   onClick={calculateRoute}
//                   className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
//                 >
//                   <Navigation size={18} />
//                   Calculate Route
//                 </button>
//               )}

//               {(origin || destination) && (
//                 <button
//                   onClick={clearAll}
//                   className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
//                 >
//                   <Trash2 size={18} />
//                   Clear All & Start Over
//                 </button>
//               )}
//             </div>

//             {/* Tips */}
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//               <h3 className="font-semibold text-blue-900 mb-2 text-sm">
//                 💡 How to Use
//               </h3>
//               <ul className="text-xs text-blue-800 space-y-1">
//                 <li>
//                   • <strong>First click:</strong> Sets origin (green marker A)
//                 </li>
//                 <li>
//                   • <strong>Second click:</strong> Sets destination (red marker
//                   B)
//                 </li>
//                 <li>
//                   • <strong>Drag markers:</strong> Adjust positions anytime
//                 </li>
//                 <li>
//                   • Route calculates automatically when both points are set
//                 </li>
//                 <li>• Compare alternative routes if available</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Map Container */}
//         <div className="flex-1 relative">
//           <div id="map" className="w-full h-full"></div>
//           {!window.google && (
//             <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//               <div className="text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                 <p className="text-gray-600 font-medium">
//                   Loading Google Maps...
//                 </p>
//                 <p className="text-gray-500 text-sm mt-2">
//                   Make sure your API key is valid
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InteractiveRouteMap;
