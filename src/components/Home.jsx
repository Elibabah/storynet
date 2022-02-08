import React, { useState, useEffect } from "react";
import { app, auth, db } from "../firebase"
import { signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { CreatePost } from "./CreatePost"
import { ReadPost } from "./ReadPost"

export const Home = ({correoUsuario}) => {
      //console.log(correoUsuario)

      const [arrayPublicaciones, setArrayPublicaciones] = useState(null);

      const fakeData = [{
            "id": 1, 
            "title": "title fake", 
            "story": "story fake"
      },
      {
            "id": 2, 
            "title": "title fake 2", 
            "story": "story fake 2"
      },
      {
            "id": 3, 
            "title": "title fake 3", 
            "story": "story fake 3"
      }
]

      async function buscarDocumentoOCrearDocumento(idDocumento){
            //Crear referencia al documento
            const docuRef = doc(db, `social/${idDocumento}`)
            //buscar documento
            const consulta = await getDoc(docuRef);
            //revisar si existe 
            if (consulta.exists()) {
            //Si existe:
            const infoDocu = consulta.data()
            return infoDocu.publicaciones
            }else {
            //Si no existe:
            await setDoc(docuRef, {publicaciones: [...fakeData]});
            const consulta = await getDoc(docuRef);
            const infoDocu = consulta.data();
            return infoDocu.publicaciones;
            }




      }

      useEffect(()=>{
            async function fetchPublicaciones() {
                  const publicacionesFetchadas = await buscarDocumentoOCrearDocumento(correoUsuario); 
                  setArrayPublicaciones(publicacionesFetchadas);
            };
            fetchPublicaciones()
      }, [])

      return (
      <div>
            <h1>Welcome, {correoUsuario}</h1>
            <button onClick={()=> signOut(auth)} >LogOut</button>


            <CreatePost/>
            { arrayPublicaciones ? <ReadPost arrayPublicaciones ={arrayPublicaciones} /> : null}


      </div>
      )}
