// import React from "react";
// import { Button } from "@/components/ui/button"
// import { Bold } from "lucide-react"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

// import { Separator } from "@/components/ui/separator";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// import { Toggle } from "@/components/ui/toggle"

// export default function Crea (){
//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//         <Button variant="outline">Genera mappa</Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px] ">
//                 <DialogHeader>
//                 <DialogTitle>Genera una nuova mappa</DialogTitle>
//                 <DialogDescription>
                    
//                 </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="titolo" className="text-right">Titolo</Label>
//                         <Input id="titolo" value="La bomba atomica" className="col-span-3" />
//                     </div>
//                     <p>Seleziona materia</p>
//                     <div className="flex flex-wrap ">
//                         <Toggle size={'lg'} variant={'outline'} className="m-1">La bomba atomica</Toggle>
//                         <Toggle size={'lg'} variant={'outline'} className="m-1">La bomba atomica</Toggle>
//                         <Toggle size={'lg'} variant={'outline'} className="m-1">La bomba atomica</Toggle>
//                     </div>
//                     <Separator className="bg-gray-300"/>
//                     <p>Scegli stile</p>
//                     <div className="flex flex-wrap ">
//                         <Toggle size={'lg'} variant={'outline'} className="m-1">Stile moderno</Toggle>
//                         <Toggle size={'lg'} variant={'outline'} className="m-1">Stile antico</Toggle>
//                         <Toggle size={'lg'} variant={'outline'} className="m-1">Stile contemporaneo </Toggle>
//                     </div>
//                     <Separator className="bg-gray-300"/>
//                     <p>Scegli palette</p>
//                     <div className="flex flex-wrap ">
//                         <Toggle size={'lg'} variant={'outline'} className="m-1">im1 1</Toggle>
//                         <Toggle size={'lg'} variant={'outline'} className="m-1">img2</Toggle>
//                         <Toggle size={'lg'} variant={'outline'} className="m-1">img3 </Toggle>
//                     </div>
//                     <Separator className="bg-gray-300"/>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="dettagli" className="text-right">Dettagli</Label>
//                         <Input id="dettagli" value="" className="col-span-3" />
//                     </div>

//                     INserisci fonti
//                     Inserisci link

//                     Stiamo preparandi la magia


//                 </div>
//                 <DialogFooter>
//                 <Button type="submit">Continua</Button>
//                 </DialogFooter>
//             </DialogContent>
//     </Dialog>

//     )
// }


"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import React from "react"
import "@excalidraw/excalidraw/index.css";

import ExcalidrawClient from "@/components/ExcalidrawClient";

type Dato = {
  type: boolean;
  body: string;
}


var dati : Dato = {
  type: false,
  body: "errore"
};

export default function MapDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    style: "",
    palette: "",
    extraDetails: "",
    sources: "",
    type: "",
  })
  const [clicked, setClicked] = useState(true);
  const next = () => setStep((s) => Math.min(s + 1, 3))
  const prev = () => setStep((s) => Math.max(s - 1, 1))
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async () => {
    // invia il prompt all'AI o salva
    setOpen(false);
    console.log("Invio dati:", formData);
    const res = await fetch('/api/genai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    dati.body = data;
    if(formData.type=="concettuale"){
      dati.type = true
    } else if (formData.type=="lineare"){
      dati.type = false
    }

    setClicked(false);

    router.push('/dashboard/crea');
  }

  if(clicked == false){
    return <ExcalidrawClient initArgs={dati}/>;
  } else {
    return (
      <Dialog  open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild>
          <Button>Genera Mappa</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Generazione mappa – Step {step}/3</DialogTitle>
          </DialogHeader>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <Input name="title" placeholder="Titolo della mappa" value={formData.title} onChange={handleChange} />
              <Input name="type" placeholder="tipo di mamma (concettuale o lineare)" value={formData.type} onChange={handleChange} />
              <Input name="topic" placeholder="Argomento principale" value={formData.topic} onChange={handleChange} />
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <Input name="style" placeholder="Stile (es. scientifico, umanistico...)" value={formData.style} onChange={handleChange} />
              <Input name="palette" placeholder="Palette colori (es. chiara, scura, vivace...)" value={formData.palette} onChange={handleChange} />
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <Textarea name="extraDetails" placeholder="Dettagli aggiuntivi" value={formData.extraDetails} onChange={handleChange} />
              <Textarea name="sources" placeholder="Fonti o link utili" value={formData.sources} onChange={handleChange} />
            </div>
          )}

          {/* Navigazione */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={prev} disabled={step === 1}>
              Indietro
            </Button>
            {step < 3 ? (
              <Button onClick={next}>Avanti</Button>
            ) : (
              <Button onClick={handleSubmit}>Genera Mappa</Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
  )
  }
  
}


