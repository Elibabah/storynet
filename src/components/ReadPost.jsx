import React from "react";

export const ReadPost = ( {arrayPublicaciones} ) => {
      return(
            <div>
                  <h1>Hola, estás leyendo el feed</h1>
                  <div>
                        {arrayPublicaciones.map((objetoPublicacion) => {
                              return (
                                    <div>
                                          <div>{objetoPublicacion.title}</div>
                                          <div>{objetoPublicacion.story}</div>
                                          <button>Delete</button>
                                    </div>

                              )
                        })}
                        
                  
                  </div>
            </div>
      )
}