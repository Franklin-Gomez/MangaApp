import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { Footer } from "../components/Footer"

export default function ClientDashboard() {
  return (
    <>

      <div className="flex flex-col  min-h-screen  mx-auto ">

        <div className=" bg-muy-oscuro  w-full  "> 
          
          <Header/> 
          
        </div>

        <div className=" container mx-auto">
          <Outlet/>
        </div>
      
        <div className=" bg-muy-oscuro  w-full mt-4 ">

          <Footer/>

        </div>

      </div>


    </>
    
  )
}