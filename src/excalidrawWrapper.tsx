// "use client";
// import * as excalidrawLib from "@excalidraw/excalidraw";
// import { Excalidraw } from "@excalidraw/excalidraw";

// import "@excalidraw/excalidraw/index.css";

// import App from "./ExampleApp";

// const ExcalidrawWrapper: React.FC = () => {
//   return (
//     <>
//       <App
//         appTitle={"Playground modifica mappa"}
//         useCustom={(api: any, args?: any[]) => {}}
//         excalidrawLib={excalidrawLib}
//       >
//         <Excalidraw />
//       </App>
//     </>
//   );
// };

// export default ExcalidrawWrapper;


"use client";
import React from "react";
 import * as excalidrawLib from "@excalidraw/excalidraw";
 import { Excalidraw } from "@excalidraw/excalidraw";

 import "@excalidraw/excalidraw/index.css";

 import App from "./ExampleApp";

import { Dato } from "./app/page";

type WrapperProps = {
  initArgs: Dato; 
};

const ExcalidrawWrapper: React.FC<WrapperProps> = ({ initArgs }) => {
  React.useEffect(() => {
    if (initArgs) {
      console.log("Inizializzazione con args:", initArgs);
    }
  }, [initArgs]);
  
  return (
    <App
      appTitle={"Playground modifica mappa"}
      // intialText={initArgs}
      //  useCustom={(api: any, args?: any[]) => {
      //  }}
      useCustom={initArgs}
      excalidrawLib={excalidrawLib}
    >
      <Excalidraw />
    </App>
  );
};

export default ExcalidrawWrapper;

