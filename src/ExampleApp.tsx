import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Children,
  cloneElement,
} from "react";
import type * as TExcalidraw from "@excalidraw/excalidraw";
import type {
  NonDeletedExcalidrawElement,
  //Theme,
} from "@excalidraw/excalidraw/element/types";
import { UIOptions } from "@excalidraw/excalidraw/types";
import type {
  BinaryFileData,
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types";

import initialData from "./initialData";
import {
  resolvablePromise,
} from "../utils";


import "./ExampleApp.scss";
import type { ResolvablePromise } from "../utils";
import { buildConceptMap } from "./ConceptLayout";
import { ExcalidrawElementSkeleton } from "@excalidraw/excalidraw/data/transform";
import { buildComponents } from "./initialData";
//export var datiLin = "La bomba atomica: nascita, impatto e conseguenze; Hiroshima e Nagasaki, Giappone; 6 e 9 agosto 1945; La bomba atomica, sviluppata durante la Seconda Guerra Mondiale nel contesto del Progetto Manhattan, fu utilizzata dagli Stati Uniti contro le città giapponesi di Hiroshima e Nagasaki, causando centinaia di migliaia di morti e segnando l'inizio dell'era nucleare; La bomba atomica fu il risultato di una corsa scientifica e militare senza precedenti. Il Progetto Manhattan, avviato nel 1939 e guidato da scienziati come Oppenheimer e Fermi, portò alla creazione di un’arma nucleare capace di sprigionare un’energia distruttiva mai vista. Il 6 agosto 1945, la bomba “Little Boy” fu sganciata su Hiroshima, seguita tre giorni dopo da “Fat Man” su Nagasaki. Gli effetti furono devastanti: decine di migliaia di persone morirono all’istante, e molte altre perirono nei mesi successivi a causa delle radiazioni; L’uso delle bombe atomiche ebbe conseguenze politiche, morali e scientifiche profonde. Se da un lato accelerò la resa del Giappone e la fine del conflitto, dall’altro sollevò dibattiti etici sull’uso di armi di distruzione di massa. Inoltre, aprì la strada alla Guerra Fredda e alla proliferazione nucleare. Il mondo entrò in una nuova fase geopolitica dominata dall’equilibrio del terrore tra le potenze atomiche, che ancora oggi influenza la politica internazionale.";
import type { Dato } from "./app/page";
import { ReactNode } from "react";
import { ReactElement } from "react";
import { ExcalidrawProps } from "@excalidraw/excalidraw/types";

export interface AppProps {
  appTitle: string;
  useCustom: Dato;
  //useCustom: (api: ExcalidrawImperativeAPI | null, customArgs?: any[]) => void;
  children: React.ReactNode;
  excalidrawLib: typeof TExcalidraw;
}




function wrapTextEveryNChars(text: string, maxLength: number): string {
  let result = "";
  let i = 0;
  try{
    while (i < text.length) {
    // Prendi un blocco di massimo maxLength caratteri
    const chunk = text.slice(i, i + maxLength);
    // Cerca l'ultimo spazio nel blocco
    const lastSpace = chunk.lastIndexOf(" ");
    if (lastSpace === -1 || i + maxLength >= text.length) {
      // Nessuno spazio trovato, o fine testo -> aggiungi tutto il blocco
      result += chunk;
      i += maxLength;
    } else {
      // Aggiungi testo fino allo spazio e poi un newline
      result += text.slice(i, i + lastSpace) + "\n";
      i += lastSpace + 1; // Salta anche lo spazio
    }
  }
  } catch {
    return result;
  }
  return result;
}

export function prendiTesto() : string {
  const testo: string = "";
  return testo;
}

export type LayoutLineare = {
  titolo: string;
  luogo: string;
  data: string;
  summary: string;
  paragrafo1: string;
  paragrafo2: string
}
export function trasformaTesto(testo: string) {
  console.log('testofinale', testo);
  const segmentazione: string[] = testo.split(";");
  console.log("contenuto splittato", segmentazione);
  
  //inserimento di una variabile per ogni parametro
  const para1 : string = wrapTextEveryNChars(segmentazione[4], 85);
  const para2 : string = wrapTextEveryNChars(segmentazione[5], 85);
  const sum : string = wrapTextEveryNChars(segmentazione[3], 30);

  const content: LayoutLineare = {titolo: segmentazione[0], luogo: segmentazione[1], data: segmentazione[2], summary:sum, paragrafo1: para1, paragrafo2: para2};
  console.log("hello its me", segmentazione);
  console.log(content);
  return content;
}


export default function ExampleApp({
  useCustom,
  children,
  excalidrawLib,
}: AppProps) {
  const {
    useHandleLibrary,
    MIME_TYPES,
    MainMenu,
    convertToExcalidrawElements,
  } = excalidrawLib;
  const appRef = useRef<HTMLDivElement>(null);
  // const [viewModeEnabled, setViewModeEnabled] = useState(false);
  // const [zenModeEnabled, setZenModeEnabled] = useState(false);
  // const [gridModeEnabled, setGridModeEnabled] = useState(false);
  // const [renderScrollbars, setRenderScrollbars] = useState(false);
  //const [theme, setTheme] = useState<Theme>("light");
  //const [disableImageTool, setDisableImageTool] = useState(false);
  
  const initialStatePromiseRef = useRef<{
    promise: ResolvablePromise<ExcalidrawInitialDataState | null>;
  }>({ promise: null! });
  if (!initialStatePromiseRef.current.promise) {
    initialStatePromiseRef.current.promise =
      resolvablePromise<ExcalidrawInitialDataState | null>();
  }

  const [excalidrawAPI, setExcalidrawAPI] =
  useState<ExcalidrawImperativeAPI | null>(null);

  //useCustom(excalidrawAPI, customArgs);

  useHandleLibrary({ excalidrawAPI });
  
  useEffect(() => {
    if (!excalidrawAPI) {
      return;
    }
    const fetchData = async () => {
      const res = await fetch("/images/rocket.jpeg");
      const imageData = await res.blob();
      const reader = new FileReader();
      reader.readAsDataURL(imageData);

      reader.onload = function () {
        const imagesArray: BinaryFileData[] = [
          {
            id: "rocket" as BinaryFileData["id"],
            dataURL: reader.result as BinaryFileData["dataURL"],
            mimeType: MIME_TYPES.jpg,
            created: 1644915140367,
            lastRetrieved: 1644915140367,
          },
        ];
        
        // if(!tipoMappa){
        //   //@ts-ignore
        //   initialStatePromiseRef.current.promise.resolve({
        //     ...initialData,
        //     elements: convertToExcalidrawElements(initialData.elements),
        //   });
        // } else {
        //   const cleaned = parseJSONFromString(datiConcettuali);
        //   const { elements, connections } = buildConceptMap(cleaned);
        //   const scene : ExcalidrawElementSkeleton[] = [...elements, ...connections];
        //   initialStatePromiseRef.current.promise.resolve({
        //     ...scene,
        //     elements: convertToExcalidrawElements(scene),
        //   });
        // }

        
        // console.log("tesot popolato/",testoLin);
        // console.log('Bibb,Questa è una prova di corretto passaggio di parametri', useCustom);

        // //@ts-ignore
        // initialStatePromiseRef.current.promise.resolve({
        //    ...initialData,
        //    elements: convertToExcalidrawElements(buildComponents(trasformaTesto(prendiTesto()))),
        //  });
        // excalidrawAPI.addFiles(imagesArray);
        // console.log('Questa è una prova di corretto passaggio di parametri', useCustom);

        try {
          console.log("Bibb - dentro try:", useCustom);
          console.log("tipo del dato", typeof useCustom);
          console.log("tipo mappa", useCustom.type);
          //const testo = prendiTesto();
          //console.log("Testo ottenuto:", testo);

          if(useCustom.type){
            const cleaned = parseJSONFromString<ConceptNode>(useCustom.body);
            const { elements, connections } = buildConceptMap(cleaned);
            const scene : ExcalidrawElementSkeleton[] = [...elements, ...connections];
            initialStatePromiseRef.current.promise.resolve({
              ...scene,
              elements: convertToExcalidrawElements(scene),
            });
          } else {
            const dati: LayoutLineare = trasformaTesto(useCustom.body);
            const scene = buildComponents(dati);

            //@ts-expect-error
            //@typescript-eslint/ban-ts-comment
            initialStatePromiseRef.current.promise.resolve({
              ...initialData,
              elements: convertToExcalidrawElements(scene),
            });
          }

          excalidrawAPI.addFiles(imagesArray);
          console.log("Bibb - tutto ok fino a qui:", useCustom);
        } catch (error) {
          console.error(" Errore durante l'inizializzazione:", error);
        }
      };
    };
    fetchData();
  }, [excalidrawAPI, convertToExcalidrawElements, MIME_TYPES]);

  // Type guard per Excalidraw React element
  const renderExcalidraw = (children: React.ReactNode) => {
    const isExcalidrawElement = (
      node: ReactNode
    ): node is ReactElement<ExcalidrawProps> =>
    React.isValidElement(node) &&
    typeof node.type !== "string" &&
    (node.type as any).displayName === "Excalidraw";

    // Trova il figlio Excalidraw
    const Excalidraw = Children.toArray(children).find(isExcalidrawElement);

    // Se non trovato, esci
    if (!Excalidraw) return null;

    // Ora Excalidraw è sicuramente un ReactElement<ExcalidrawProps>
    const newElement = cloneElement(Excalidraw, {
    excalidrawAPI: (api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api),
    initialData: initialStatePromiseRef.current.promise,
    onChange: () => {
      //...
    },
    name: "Custom name of drawing",
    UIOptions: {
      canvasActions: {
        loadScene: false,
      },
    } as Partial<UIOptions>,
    onLinkOpen,
    validateEmbeddable: true,
    }, <>
    {renderMenu()}
    </>);
    return newElement
  };
  // const renderExcalidraw = (children: React.ReactNode) => {
  //   const Excalidraw = Children.toArray(children).find(
  //     (child) =>
  //       React.isValidElement(child) &&
  //       typeof child.type !== "string" &&
  //       //@ts-expect-error
  //       child.type.displayName === "Excalidraw",
  //   );
  //   if (!Excalidraw) {
  //     return;
  //   }
  //   const newElement = cloneElement(
  //     Excalidraw,
  //     {
  //       excalidrawAPI: (api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api),
  //       initialData: initialStatePromiseRef.current.promise,
  //       onChange: (
  //       ) => {
  //         //console.info("Elements :", elements, "State : ", state);
  //       },
  //       // viewModeEnabled,
  //       // zenModeEnabled,
  //       // renderScrollbars,
  //       // gridModeEnabled,
  //       //theme,
  //       name: "Custom name of drawing",
  //       UIOptions: {
  //         canvasActions: {
  //           loadScene: false,
  //         },
  //         //tools: { image: !disableImageTool },
  //       },
        
  //       onLinkOpen,

  //       validateEmbeddable: true,
  //     },
  //     <>
        
        
  //       {renderMenu()}
  //     </>,
  //   );
  //   return newElement;
  // };
  

  // const loadSceneOrLibrary = async () => {

  //   //blob da inserire nei parametri
  //   const data = await loadFromBlob(blob, null, null);
  //   console.log("HEllo world");
  //   console.log(data);

  //   excalidrawAPI?.updateScene(data as any);
  //   // const file = await fileOpen({ description: "Excalidraw or library file" });
  //   // const contents = await loadSceneOrLibraryFromBlob(file, null, null);
  //   // if (contents.type === MIME_TYPES.excalidraw) {
  //   //   excalidrawAPI?.updateScene(contents.data as any);
  //   // } else if (contents.type === MIME_TYPES.excalidrawlib) {
  //   //   excalidrawAPI?.updateLibrary({
  //   //     libraryItems: (contents.data as ImportedLibraryData).libraryItems!,
  //   //     openLibraryMenu: true,
  //   //   });
  //   // }
  // };

  type ConceptNode = {
    title: string;
    children?: ConceptNode[]; // Ricorsivo
  };
  
//aggiungere il range sopo cui mettere lo \n
  // const conceptTree: ConceptNode = {
  //   title: "Cellula",
  //   children: [
  //     {
  //       title: "Nucleo",
  //       children: [{ title: "dsdsdsdd" }, { title: "Controllo" }]
  //     },
  //     {
  //       title: "Citoplasma",
  //       children: [{ title: "Organuli" }]
  //     }
  //   ]
  // };


  // const caricaMappa = () => {
  //   const { elements, connections } = buildConceptMap(conceptTree);
  //   const scene : ExcalidrawElementSkeleton[] = [...elements, ...connections];
  //   //gesire update scene
    
  //   excalidrawAPI?.updateScene({
  //       elements: convertToExcalidrawElements(scene),
  //   });
    
  //     // appState: {
  //     //   viewBackgroundColor: "#fffefc",
  //     // }
  // };

  function parseJSONFromString<T = unknown>(input: string): T | null {
    try {
      // Rimuove eventuali markdown (come ```json ... ```)
      const cleaned = input
        .trim()
        .replace(/^```json\s*/i, "")  // rimuove ```json all'inizio
        .replace(/```$/i, "");        // rimuove ``` alla fine

      // Prova a fare il parsing del JSON
      return JSON.parse(cleaned) as T;
    } catch (error) {
      console.error("Errore nel parsing del JSON:", error);
      return null;
    }
  }

  // const ricaricaNuovo = () =>{
    
  //   const cleaned = parseJSONFromString(useCustom.body);
  //   console.log(cleaned);
  //   console.log(conceptTree);
  //   const { elements, connections } = buildConceptMap(cleaned);
  //   const scene : ExcalidrawElementSkeleton[] = [...elements, ...connections];
  //   //gesire update scene
    
  //   excalidrawAPI?.updateScene({
  //       elements: convertToExcalidrawElements(scene),
  //   });
  // }

  const onLinkOpen = useCallback(
    (
      element: NonDeletedExcalidrawElement,
      event: CustomEvent<{
        nativeEvent: MouseEvent | React.PointerEvent<HTMLCanvasElement>;
      }>,
    ) => {
      const link = element.link!;
      const { nativeEvent } = event.detail;
      const isNewTab = nativeEvent.ctrlKey || nativeEvent.metaKey;
      const isNewWindow = nativeEvent.shiftKey;
      const isInternalLink =
        link.startsWith("/") || link.includes(window.location.origin);
      if (isInternalLink && !isNewTab && !isNewWindow) {
        // signal that we're handling the redirect ourselves
        event.preventDefault();
        // do a custom redirect, such as passing to react-router
        // ...
      }
    },
    [],
  );

  // const onSave = async () => {
  //   if (!excalidrawAPI) {
  //     return false;
  //   }

  //   const jsonScene = {
  //     type: "excalidraw",
  //     version: 2,
  //     source: "my-app", // puoi personalizzare questo campo
  //     elements: excalidrawAPI.getSceneElements(),
  //     appState: excalidrawAPI.getAppState(),
  //     files: excalidrawAPI.getFiles(),
  //   };

  //   blob = new Blob([JSON.stringify(jsonScene)], {
  //     type: "application/json",
  //   });
  //   console.log(blob);

  //   const json = await blob.text();
  //   console.log(json);
  //   const parsed = JSON.parse(json);
  // };



  const renderMenu = () => {
    return (
      <MainMenu>
        <MainMenu.DefaultItems.SaveAsImage />
        <MainMenu.DefaultItems.Export />
        <MainMenu.Separator />
      </MainMenu>
    );
  };
  return (
    <div className="App m-0 p-0" ref={appRef}>
      {/* <h1>{appTitle}</h1> */}
      {/* TODO fix type */}

        <div className="button-wrapper">
          
          {/* <button onClick={onSave}>
              Salva Scena
          </button> 

          <button onClick={loadSceneOrLibrary}>
            Carica la scena
          </button> 

          <button onClick={caricaMappa}>
              Carica mappa
          </button> 

          <button onClick={ricaricaNuovo}>
              Ricarica nuovo
          </button>  */}

          {/* <label className="">
            <input
              type="checkbox"
              checked={viewModeEnabled}
              onChange={() => setViewModeEnabled(!viewModeEnabled)}
            />
            View mode
          </label>
          <label>
            <input
              type="checkbox"
              checked={zenModeEnabled}
              onChange={() => setZenModeEnabled(!zenModeEnabled)}
            />
            Zen Mode
          </label>
          <label>
            <input
              type="checkbox"
              checked={gridModeEnabled}
              onChange={() => setGridModeEnabled(!gridModeEnabled)}
            />
            Grid mode
          </label>
          <label>
            <input
              type="checkbox"
              checked={renderScrollbars}
              onChange={() => setRenderScrollbars(!renderScrollbars)}
            />
            Render scrollbars
          </label>
          <label>
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            />
            Switch to Dark Theme
          </label> */}
        </div>
        <div className="excalidraw-wrapper">
          {renderExcalidraw(children)}
        </div>
    </div>
  );
}
