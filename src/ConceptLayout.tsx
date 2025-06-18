import { nanoid } from "nanoid";
type ConceptNode = {
  title: string;
  children?: ConceptNode[];
};
//modificare lo stile in base alle scelte dell'utente magari mettere un rtettangolo con un testo 
import type { ExcalidrawElementSkeleton } from "@excalidraw/excalidraw/data/transform";

function createArrowBetween(
  from: { x: number; y: number; id: string },
  to: { x: number; y: number; id: string }
) {
  const x = from.x + 10;
  const y = from.y + 10;
  const deltaX = to.x - x - 10;
  const deltaY = to.y - y - 10;
  console.log("quasta e");
  const arrow: ExcalidrawElementSkeleton = {
    id: nanoid(),
    type: "arrow",
    x:x, // metà del box "da"
    y: y,  // centro verticale del box "da"
    width: deltaX ,
    height: deltaY,
    angle: 0,
    strokeColor: "#1e1e1e",
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 2,
    roughness: 0,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: Math.floor(Math.random() * 99999999),
    version: 1,
    versionNonce: Math.floor(Math.random() * 99999999),
    isDeleted: false,
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
    points: [
      [0, 0],
      [deltaX, deltaY], // distanza finale rispetto a x,y iniziale
    ],
    startBinding: {
      elementId: from.id,
      focus: 0.5,
      gap: 8,
    },
    endBinding: {
      elementId: to.id,
      focus: 0.5,
      gap: 8,
    },
    startArrowhead: null,
    endArrowhead: "arrow",
  };

  return arrow;
}
function buildExcalidrawElementsFromConcepts(
  node: ConceptNode | null,
  startX: number,
  currentY: { value: number },
  depth = 0,
  spacingX = 300,
  spacingY = 150,
  parentId?: string,
  elements: ExcalidrawElementSkeleton[] = [],
  connections: ExcalidrawElementSkeleton[] = [],
  positions: Record<string, { x: number; y: number }>= {}
): { elements: ExcalidrawElementSkeleton[]; connections: ExcalidrawElementSkeleton[] } {
  const x = startX + depth * spacingX;
  const y = currentY.value;
  const nodeId = nanoid();

  // Salva posizione
  positions[nodeId] = { x, y };

  // Nodo
  const box: ExcalidrawElementSkeleton = {
    id: nodeId,
    type: "text",
    x,
    y,
    width: 200,
    height: 50,
    angle: 0,
    strokeColor: "#1e1e1e",
    backgroundColor: "#b2f2bb",
    fillStyle: "solid",
    strokeWidth: 2,
    roughness: 1,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: Math.floor(Math.random() * 99999999),
    version: 1,
    versionNonce: Math.floor(Math.random() * 99999999),
    isDeleted: false,
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
    text: node ? node?.title  : "" ,
    fontSize: 16,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    containerId: null,
    originalText: node ? node?.title  : "",
    autoResize: true,
  };

  elements.push(box);

  // Freccia di connessione
  console.log(parentId);
  if (parentId) {
    const arrow: ExcalidrawElementSkeleton = createArrowBetween({x:positions[parentId].x, y: positions[parentId].y, id:parentId}, {x:x, y:y, id:nodeId});
    // const arrow = {
    //   id: nanoid(),
    //   type: "arrow",
    //   x: 0,
    //   y: 0,
    //   width: 0,
    //   height: 0,
    //   angle: 0,
    //   strokeColor: "#1e1e1e",
    //   backgroundColor: "transparent",
    //   fillStyle: "solid",
    //   strokeWidth: 2,
    //   roughness: 0,
    //   opacity: 100,
    //   groupIds: [],
    //   frameId: null,
    //   roundness: null,
    //   seed: Math.floor(Math.random() * 99999999),
    //   version: 1,
    //   versionNonce: Math.floor(Math.random() * 99999999),
    //   isDeleted: false,
    //   boundElements: [],
    //   updated: Date.now(),
    //   link: null,
    //   locked: false,
    //   points: [
    //     [0, 0],
    //     [0, 1],
    //   ],
    //   startBinding: {
    //     elementId: parentId,
    //     focus: 0.5,
    //     gap: 8,
    //   },
    //   endBinding: {
    //     elementId: nodeId,
    //     focus: 0.5,
    //     gap: 8,
    //   },
    //   startArrowhead: null,
    //   endArrowhead: "arrow",
    //   elbowed: false,

    // };
    connections.push(arrow);
  }

  currentY.value += spacingY;

  // Ricorsione per i figli
  if(node){
    node.children?.forEach((child) => {
    buildExcalidrawElementsFromConcepts(
      child,
      startX,
      currentY,
      depth + 1,
      spacingX,
      spacingY,
      nodeId,
      elements,
      connections,
      positions
    );
  });
  }

  return { elements, connections };
}

// Funzione principale


export function buildConceptMap(root: ConceptNode | null) {

  console.log(root);
  const startX = 100;
  const currentY = { value: 100 };
  
  //console.log(buildExcalidrawElementsFromConcepts(root, startX, currentY));
  return buildExcalidrawElementsFromConcepts(root, startX, currentY);
}


