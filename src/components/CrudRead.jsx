import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, onSnapshot, querySnapshot } from "firebase/firestore";
import { db } from "../firebase"


export const CrudRead = () => {
      const [posts, setPosts] = useState([])
      const postsCollectionRef = collection(db, "posts");

      useEffect(() =>{
            const getPosts = async () => {
                  const data = await getDocs(postsCollectionRef);
                  setPosts(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
            };
            console.log(setPosts)
            getPosts();
      }, []);

      /*const getData = () => {
            postsCollectionRef.onSnapshot((resultados) => {
            const datos = resultados.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
            }));
            console.log("Todos los datos de la colección 'posts'", datos);
            });
      }
      useEffect(() => {
            getData();
      }, []);*/

      return(
            <div>
                  {posts.map((post) =>{
                        return(
                              <div key={post.id}>
                                    <h1>Title: {post.title}</h1>
                                    <p>Story: {post.story}</p>
                              </div>
                        )
                  })}
            </div>
      )
}