import {Footer, Header, NewSWP} from "../index"
import React from "react"
import "./restricted.scss"
export const Restricted = () => {
    return <div>
        <Header page={"main"}/>
        <div className="container slider-container" style={{margin:'10px auto',borderRadius:'6px', height:'100%', display:'flex', alignItems:'center',justifyContent:'center'}}>
           <div className={"restricted-text"}>
               <p style={{  fontSize:'16px',color:'white', fontWeight:'bold'}}>
                   Dear visitor,  due to legal reasons, PlanetaX is not available for players residing in this jurisdiction.</p> <br/>

               <span style={{  fontSize:'16px',color:'white', fontWeight:'bold'}}>We apologize for any inconvenience.</span>
           </div>
        </div>

        <Footer/>
    </div>
}
