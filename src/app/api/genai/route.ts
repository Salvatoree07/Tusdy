import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

type main = {
    title:string,
    topic: string,
    style: string,
    palette: string,
    extraDetails:string,
    sources: string,
    type:string,
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINIAPI!});

export async function POST(req: Request) {
    //creazione dell'oggetto master che contiene tutte le informazioni inserite dall'utente
    const master: main = await req.json();
    console.log(master);

    //modello utilizzato
    const modello: string  = "gemini-2.0-flash";

    //generazione del promt in base al tipo di mappa
    if(master.type=='concettuale'){
        const response = await ai.models.generateContent({
        model: modello,
        contents: "Genera una mappa concettuale in formato JSON senza usare sul tema "+master.topic+"Inserendo i seguenti dettagli"+master.extraDetails+" e prendendo in considerazione le seguenti fonti"+master.sources+"Usa questo schema ricorsivo:  {    'title': 'string',    'children': [      { 'title': 'string', 'children': [ ... ] }    ]  }  Limita i titoli a max 5 parole. Nessun testo fuori dal JSON.",
        });
        console.log(response.text);
        return NextResponse.json(response.text);
    } else if (master.type=='lineare'){
        const response = await ai.models.generateContent({
            model:modello,
            contents:"Genera uno schema lineare sul tema "+master.topic+"Inserendo i seguenti dettagli"+master.extraDetails+" e prendendo in considerazione le seguenti fonti"+master.sources+"il testo dovrà contenre titolo, luogo, data, summary, paragrafo1, paragrafo2 tutti separati dal ; (punto e virogola): il testo non dove essere inserito in grassetto e deve essere formattato solo in una sola riga. INoltre non deve esse suddiviso in paragrafi titolati devono essere presenti solo i contenuti del punto e virgola"
        })
        console.log(response.text);
        return NextResponse.json(response.text);
    }
    return NextResponse.json("");

    
}
