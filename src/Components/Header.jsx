import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="w-full h-[100px] shadow-xl flex justify-center items-center relative bg-secoundary">
            
            <Link to="/" className="text-[25px] font-bold m-1">Home</Link>
            <Link to="/contact" className="text-[25px] font-bold m-1">contact</Link>
            <Link to="/gallery" className="text-[25px] font-bold m-1">Gallery</Link>
            <Link to="/item" className="text-[25px] font-bold m-1">Item</Link>
            
            
        </header>
    );
}