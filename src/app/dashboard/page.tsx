'use-client'
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function dashboard(){
    return (
        <div className="">
            <div className="flex justify-center p-14 mb-10">
                <Image height={278} width={286} src={'/img/logo-max.png'} alt="Logo immagine"></Image>
            </div>
            <div className="flex justify-center">
                <div className="no-underline uppercase flex space-x-64">
                    <div className="bg-gray-300 size-52 flex justify-center items-center rounded-4xl hover:shadow-xl font-bold text-xl">
                        <Link href={"/dashboard/crea"} className=" "> Crea mappa</Link> 
                    </div>
                    <div className="bg-gray-300 size-52 flex justify-center items-center rounded-4xl hover:shadow-xl font-bold text-xl p-4 text-center">
                        <Link href={"/dashboard/visualizza"}>Visualizza mappe esistenti</Link>
                    </div>
                </div>
            </div>
            <div className="p-10">
                <h2  className="text-3xl font-bold">Vedi ultime notizie</h2>
            </div>
            
        </div>
    );
}