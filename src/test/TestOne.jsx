import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TestOne(){
    const [members,setMembers]=useState([]);
    const [loaded,SetLoaded]=useState("loading");

    /* const params = useParams();   
    const key=params.key; */
    const key="001";         //test key value ,used testing purpose

    const token=localStorage.getItem('token');

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BackEndURL}/api/customer/${key}`, {headers: { Authorization: `Bearer ${token}` }})
        .then((res)=>{
            setMembers(res.data.groupRows);
            SetLoaded("Loaded");
        })
        .catch((error)=>{
            console.log(error?.response?.data?.error || "ERROR‼️ ")
            SetLoaded("Error");
        })
    })
    return
    (
        <div></div>

    );
}