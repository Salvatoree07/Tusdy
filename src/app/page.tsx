'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { JSX } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import React from "react"
import "@excalidraw/excalidraw/index.css";
import ExcalidrawClient from "@/components/ExcalidrawClient";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
type Dato = {
  type: boolean;
  body: string;
}


var dati : Dato = {
  type: false,
  body: "errore"
};


export default function Page(){
  useEffect(() => {
  }, []);
  const [typeMap, setypeMap] = useState<string | null>(null);
  const [styleMap, setstyleMap] = useState<string | null>(null);
  const [palette, setpalette] = useState<string | null>(null);


  const handleToggleClick = (value: string) => {
    setypeMap(prev => (prev === value ? null : value)); // Deseleziona se cliccato di nuovo, oppure cambia
  };

  const handleStyleClick = (value: string) => {
    setstyleMap(prev => (prev === value ? null : value));
  }

  const handlePalette = (value: string) => {
    setpalette(prev => (prev === value ? null : value));
  }

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

    const updatedFormData = {
      ...formData,
      type: typeMap,
      palette: palette,
      style: styleMap
    }
    console.log("Invio dati: ", updatedFormData);
    console.log(typeMap);
    const res = await fetch('/api/genai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData),
    });
    const data = await res.json();
    dati.body = data;
    if(updatedFormData.type=="concettuale"){
      dati.type = true
    } else if (updatedFormData.type=="lineare"){
      dati.type = false
    }
    setClicked(false);
    router.push('/');
  }
  if(clicked == false){
    return <ExcalidrawClient initArgs={dati}/>;
  } else {
    return(
      <div className="font-body">
        <div className="flex justify-center items-center h-screen relative">
          <Image src={'/img/logo-main.png'} alt="immagine logo centrale" height={338} width={436} className="absolute -z-10"/>
          <div className="text-center">
            <h1 className="text-8xl text-white p-3 bordo font-title">Tusdy</h1>
            <p className="p-3 ">La web application perfetta per <br />generare mappe concettuali</p>
            <button className="underline ">Scopri di più</button>
          </div>
        </div>
        <div className="h-screen">
          <div className="space-y-30 flex justify-around relative top-10 flex-wrap md:space-y-0">
            <div className="relative h-fit">
              <div className="p-5  size-80 rounded-xl bg-[#F29F05] noise">
                <h3 className="text-8xl uppercase text-white font-title relative bottom-[70px] right-[30px]">Scegli</h3>
                <div className="bottom-10 relative text-center">
                  <p className="mb-10 text-lg">Scegli il tipo di mappa</p>
                  <div className="flex relative justify-center  space-x-6">
                    <div className="flex flex-col items-center space-y-2">
                      <Image src={'/img/lineare.png'} alt="img schema lineare" height={112} width={107} />
                      <p className="text-white bg-[#F27B50] rounded-3xl w-fit px-4">Lineare</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Image src={'/img/concettuale.png'} alt="img schema concettuale" height={112} width={110} />
                      <p className="text-white bg-[#F27B50] rounded-3xl w-fit px-4">Concettuale</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-fit">
              <div className="p-5  size-80 rounded-xl bg-[#F29F05] noise">
                <h3 className="text-8xl uppercase text-white font-title relative bottom-[70px] right-[30px]">Spiega</h3>
                <div className="bottom-10 relative text-center">
                  <p className="mb-10 text-lg">Specifica i dettagli</p>
                  <div>
                    <Image src={'/img/form.png'} alt="img form" height={117} width={260} />
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-fit">
              <div className="p-5  size-80 rounded-xl bg-[#F29F05] noise">
                <h3 className="text-8xl uppercase text-white font-title relative bottom-[70px] right-[10px]">Salva</h3>
                <div className="bottom-10 relative text-center flex flex-col items-center">
                  <p className="mb-2">Esporta la tua mappa in diversi formati: <br />png, svg</p>
                  <Image src={'/img/result.png'} alt="img risultato mappa" height={176} width={212} />

                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center  top-20 relative ">
            <Dialog  open={open} onOpenChange={setOpen}  >
                <DialogTrigger asChild>
                  <Button className="mb-30 mt-70 uppercase tracking-widest text-white  bg-[#03658C] px-6 py-3 rounded-2xl">Genera Mappa</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Generazione mappa – Step {step}/3</DialogTitle>
                  </DialogHeader>
        
                  {/* Step 1 */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <Input name="title" placeholder="Titolo della mappa" value={formData.title} onChange={handleChange}  />
                      <Input name="topic" placeholder="Argomento principale" value={formData.topic} onChange={handleChange} />
                      <div className="space-x-3 flex justify-center">
                        <Toggle 
                          pressed={typeMap === "concettuale"}
                          onPressedChange={() => handleToggleClick("concettuale")}
                          className="text-white"
                        >
                          <Image src={"/img/concettuale.svg"} alt="logo lineare" height={30} width={30} className="relative left-1.5" />
                          Concettuale
                        </Toggle>
                        <Toggle
                          pressed={typeMap === "lineare"}
                          onPressedChange={() => handleToggleClick("lineare")}
                          className="text-white"
                        >
                          
                            <Image src={"/img/lineare.svg"} alt="logo lineare" height={30} width={30} className="relative left-1.5"/>
                            Lineare
                        </Toggle>

                      </div>
                    </div>
                  )}
        
                  {/* Step 2 */}
                  {step === 2 && (
                      <div className="space-y-4">
                        <div className="space-x-4">
                          <p className="text-white italic px-3 py-2 ">Stile</p>
                          <Toggle 
                            pressed={styleMap === "formale"}
                            onPressedChange={() => handleStyleClick("formale")}
                            className="text-white size-30"
                          >
                            <div className="flex flex-col">
                              <Image src={"/img/stile-formale.svg"} alt="logo lineare" height={70} width={70} className="relative " />
                              Formale
                            </div>
                          </Toggle>
                          <Toggle
                            pressed={styleMap === "appunti"}
                            onPressedChange={() => handleStyleClick("appunti")}
                            className="text-white size-30"
                          >
                            <div className="flex flex-col ">
                              <Image src={"/img/stile-appunti.svg"} alt="logo lineare" height={70} width={70} className="relative"/>
                              Appunti
                            </div>
                          </Toggle>
                          <Toggle
                            pressed={styleMap === "Rounded"}
                            onPressedChange={() => handleStyleClick("Rounded")}
                            className="text-white size-30"
                          >
                            <div className="flex flex-col">
                              <Image src={"/img/stile-rounded.svg"} alt="logo lineare" height={70} width={70} className="relative"/>
                              Rounded
                            </div>
                          </Toggle>
                        </div>
                        <Separator></Separator>
                        <div className="space-x-4">
                          <p className="text-white italic px-3 py-2 ">Palette</p>
                          <Toggle 
                            pressed={palette === "bianconero"}
                            onPressedChange={() => handlePalette("bianconero")}
                            className="text-white size-30"
                          >
                            <div className="flex flex-col">
                              <Image src={"/img/stile-1.png"} alt="palette bianco nero" height={70} width={70} className="relative " />
                              Classical
                            </div>
                          </Toggle>
                          <Toggle
                            pressed={palette === "light"}
                            onPressedChange={() => handlePalette("light")}
                            className="text-white size-30"
                          >
                            <div className="flex flex-col ">
                              <Image src={"/img/stile-2.png"} alt="palette chiara" height={70} width={70} className="relative"/>
                              Light
                            </div>
                          </Toggle>
                          <Toggle
                            pressed={palette === "dark"}
                            onPressedChange={() => handlePalette("dark")}
                            className="text-white size-30"
                          >
                            <div className="flex flex-col">
                              <Image src={"/img/stile-3.png"} alt="palette scura" height={70} width={70} className="relative"/>
                              Dark
                            </div>
                          </Toggle>
                        </div>

                      </div>
                      
                    // <div className="space-y-4">

                    //   <Input name="style" placeholder="Stile (es. scientifico, umanistico...)" value={formData.style} onChange={handleChange} />
                    //   <Input name="palette" placeholder="Palette colori (es. chiara, scura, vivace...)" value={formData.palette} onChange={handleChange} />
                    // </div>
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
                    <Button variant="outline" onClick={prev} disabled={step === 1} className="bg-white/50">
                    &lt;</Button>
                    {step < 3 ? (
                      <Button onClick={next} className="bg-background hover:bg-white hover:text-black">&gt;</Button>
                    ) : (
                      <Button onClick={handleSubmit} className="bg-background hover:bg-white hover:text-black">Genera Mappa</Button>
                    )}
                  </div>
                </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    )
  }
}