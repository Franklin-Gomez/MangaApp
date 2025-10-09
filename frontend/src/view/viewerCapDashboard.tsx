import { Outlet } from "react-router-dom";
import HeaderMangaView  from "../components/MangaView/HeaderMangaView";
import FooterMangaView from "../components/MangaView/FooterMangaView";

export default function ViewerCapDashboard () {
  return (

    <>
        <div className=" min-h-screen flex flex-col ">
            <div className=" bg-muy-oscuro ">
                <div className=" container mx-auto px-4">
                    <HeaderMangaView/>
                </div>
            </div>

            <div className=" container mx-auto flex-grow px-4  "> 
                <Outlet/> 
            </div>

            <div className="bg-muy-oscuro">
                
                <div className=" container mx-auto px-4  ">
                    <FooterMangaView/>
                </div>
                
            </div>
        </div>
        

    </>


  )
}

