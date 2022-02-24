import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, onSnapshot, querySnapshot } from "firebase/firestore";
import { db } from "../firebase"


export const CrudRead = () => {
      const [postsArray, setPostsArray] = useState([])

      const getData = () => {



            db.collection("posts")
            .onSnapshot((resultados) => {
            const datos = resultados.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
            }));
            console.log("Todos los datos de la colección 'posts'", datos);
            });

      }

      useEffect(() => {
            getData();
      }, []);

      return(
            <div>
                  <div>
                  </div>
                  <h1>News Feed Here!</h1>
                  
            </div>
      )
}