import React from "react";
import { updateDoc, doc, getDoc, setDoc} from "firebase/firestore"
import { db } from "../firebase"
// READ
export const ReadPost = ( {arrayPublicaciones, correoUsuario, setArrayPublicaciones, publicaciones} ) => {

      async function eliminarPublicacion(idPublicacionAEliminar){
            //crear nuevo Array de tareas
            const newArrayPublicaciones = arrayPublicaciones.filter(
                  (objetoPublicacion)=> objetoPublicacion.id !== idPublicacionAEliminar
            );
            //actualizar base de datos
            const docuRef = doc(db, `social/${correoUsuario}`);
            updateDoc(docuRef, { publicaciones: [...newArrayPublicaciones]});
            //actualizar state
            setArrayPublicaciones(newArrayPublicaciones);
      }

      async function editarPublicacion(idPublicacionAEditar, title, story){
            // obtener ID 

            
            const docuRef = doc(db, `social/${idPublicacionAEditar}`)

            //////////////////////////////////////
            //buscar documento
            const consulta = await getDoc(docuRef);
            //revisar si existe 
            if (consulta.exists()) {
            //Si existe:
            const infoDocu = consulta.data()
            console.log(infoDocu.publicaciones)}
            console.log(consulta.data())
      }

      return(
            <div>
                  <h1>Hola, estás leyendo el feed</h1>
                  <div>
                        {arrayPublicaciones.map((objetoPublicacion) => {
                              return (
                                    <div key={objetoPublicacion.id}> 
                                          <div key={objetoPublicacion.id}>{objetoPublicacion.title}</div>
                                          <div>{objetoPublicacion.story}</div>
                                          <button onClick={()=> eliminarPublicacion(objetoPublicacion.id)}>Delete</button>
                                          <button onClick={()=> editarPublicacion(objetoPublicacion.id)}>Edit</button>
                                                <div>      
                                                      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>

                                                            <input type="text" id="title" placeholder="título" className='shadow appareance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                                                            <input type="text" id="story" placeholder="Escribe tu historia" className='shadow appareance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>

                                                            <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Guardar edición</button>
                                                </form> 
                                          </div>
                                    </div>

                              )
                        })}
                  </div>
            </div>
      )
}