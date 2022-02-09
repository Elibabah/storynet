import React, { useState, useEffect } from "react";
import { app, auth, db } from "../firebase"
import { signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { CreatePost } from "./CreatePost"
import { ReadPost } from "./ReadPost"

export const Home = ({correoUsuario}) => {
      //console.log(correoUsuario)
      const [arrayPublicaciones, setArrayPublicaciones] = useState(null);

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
            await setDoc(docuRef, {publicaciones: []});
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


            <CreatePost arrayPublicaciones ={arrayPublicaciones} setArrayPublicaciones={setArrayPublicaciones} correoUsuario={correoUsuario}/>
            
            { arrayPublicaciones ? <ReadPost arrayPublicaciones ={arrayPublicaciones} setArrayPublicaciones={setArrayPublicaciones} correoUsuario={correoUsuario}/> : null}
      </div>
      )}
