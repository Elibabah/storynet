import React from "react";
import {app} from "../firebase"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"

export const Home = () => {




      return <div><h1>Home</h1>
      <button onClick={()=> signOut(auth)} >LogOut</button>
      </div>
}
