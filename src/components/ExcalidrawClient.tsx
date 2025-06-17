// 'use client';

// import dynamic from "next/dynamic";
// import Script from "next/script";

// const ExcalidrawWithClientOnly = dynamic(
//   //passaggio di parametri in ingresso a ExcalidrawWrapper
//   () => import("../excalidrawWrapper").then((mod) => mod.default),
//   { ssr: false }
// );

// export default function ExcalidrawClient(props:any) {
//   return (
//     <>
//       <Script id="load-env-variables" strategy="beforeInteractive">
//         {`window["EXCALIDRAW_ASSET_PATH"] = window.origin;`}
//       </Script>
//       <ExcalidrawWithClientOnly />
//     </>
//   );
// }


'use client';

import dynamic from "next/dynamic";
import Script from "next/script";

const ExcalidrawWithClientOnly = dynamic(
  () => import("../excalidrawWrapper").then((mod) => mod.default),
  { ssr: false }
);

export default function ExcalidrawClient(props: any) {
  const initArgs = props.initArgs; // oppure qualsiasi valore tu voglia passare
  console.log("cotenuto", initArgs);

  console.log("tipo di init Args", typeof initArgs);

  return (
    <>
      <Script id="load-env-variables" strategy="beforeInteractive">
        {`window["EXCALIDRAW_ASSET_PATH"] = window.origin;`}
      </Script>
      <ExcalidrawWithClientOnly initArgs={initArgs} />
    </>
  );
}

