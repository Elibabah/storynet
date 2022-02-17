import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"


export const CrudRead = () => {
      const [postsArray, setPostsArray] = useState([])

      const getData = async() => {
            const querySnapshot = await getDocs(collection(db, "posts"));
            console.log(querySnapshot)

            querySnapshot.forEach((doc) => {
            console.log(doc.id, doc.data())
            let post = doc.data()
            post.id = doc.id
            postsArray.push(post)
            });
            console.log(postsArray)
            return postsArray
      }
      
      useEffect(() => {
            async function traerColl() {
                  const postsObtenidos = await getData();
                  console.log(postsObtenidos)
                  setPostsArray(postsObtenidos);
            }
            traerColl();
      }, []);

      return(
            <div>
                  <h1>News Feed</h1>
                  {console.log(postsArray)}
                  {postsArray.map((post) => {
                        return(
                        <div key={post.id}>
                              <h3>{post.title}</h3>
                              <p>{post.story}</p>
                              <button>Editar</button>
                              <button>Eliminar</button>
                        </div>
                  )})}
            </div>
      )
}