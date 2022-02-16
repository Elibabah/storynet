import React, { useState, useEffect } from "react";
import { app, auth, db } from "../firebase"
import { signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { Crud } from "./Crud"

export const Home = ({correoUsuario}) => {
      console.log(correoUsuario)


      return (
      <div>
            <h1>Welcome, {correoUsuario}</h1>
            <button onClick={()=> signOut(auth)} >LogOut</button>
            <Crud/>
      </div>
      )}
