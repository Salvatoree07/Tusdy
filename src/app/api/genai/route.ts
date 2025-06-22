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
function componiPromptLineare (content: main): string{
    return "Genera un testo seguendo queste istruzioni. Titolo: "+content.title+". Argomento: "+content.topic+". Dettagli aggiuntivi: "+content.extraDetails+". Fonti da considerare: "+content.sources+". Il testo generato deve contenere le seguenti sezioni, in questo preciso ordine, separate da punto e virgola (;): 1. Titolo; 2. Luogo di nascita, creazione o invenzione, e se necessario anche luogo di morte o fine (esempio: Nascita: Palo Alto (California)); 3. Data di nascita, creazione o invenzione, e se necessario anche data di morte o fine (esempio: Nascita: 30/05/1949 - Morte: 12/07/2022); 4. Due, tre o quattro parole chiave che descrivono l’argomento; 5. Titolo del primo paragrafo; 6. Contenuto del primo paragrafo introduttivo (lunghezza da 51 a 71 parole); 7. Titolo del secondo paragrafo; 8. Contenuto del secondo paragrafo specifico (lunghezza da 51 a 71 parole); 9. Inserisci da due a cinque domande per facilitare la comprensione e stimolare l’active recall. Ogni domanda deve iniziare con il carattere · (punto mediano) e terminare con il simbolo (¶). 10. Inserisci da due a cinque link a siti web utili per approfondire l’argomento. Ogni link deve iniziare con il carattere · (punto mediano), terminare con il simbolo (¶).  Regole obbligatorie: l’output deve essere in plain text, senza alcuna formattazione (niente Markdown, HTML, grassetti, corsivi). Tutte le sezioni devono essere separate da punto e virgola (;) e le singole domande ed i singoli link con (¶), rispettando rigorosamente ordine e limiti minimi/massimi indicati. Requisiti opzionali: i dettagli extra e le fonti servono solo come riferimento per arricchire il testo, non devono essere copiati o citati integralmente. Il tono e lo stile possono essere adattati al contesto."
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
        contents: "Genera una mappa concettuale in formato JSON senza usare sul tema "+master.title+"Inserendo i seguenti dettagli"+master.extraDetails+" e prendendo in considerazione le seguenti fonti"+master.sources+"Usa questo schema ricorsivo:  {    'title': 'string',    'children': [      { 'title': 'string', 'children': [ ... ] }    ]  }  Limita i titoli a max 5 parole. Nessun testo fuori dal JSON.",
        });
        console.log(response.text);
        return NextResponse.json(response.text);
    } else if (master.type=='lineare'){
        const response = await ai.models.generateContent({
            model:modello,
            contents: componiPromptLineare(master),
        })
        console.log(response.text);
        return NextResponse.json(response.text);
    }
    return NextResponse.json("");
}
