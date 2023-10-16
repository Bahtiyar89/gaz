import MapContainer from "../features/map";
import * as React from "react";


export default function MapPage() {
  return <div className={`w-screen h-[calc(100vh-4.5rem)]`}>
    <MapContainer/>
  </div>
}