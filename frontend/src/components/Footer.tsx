export const Footer = () => {
  return (
    <div className=" text-primary  w-full">   
        <nav className="flex justify-center items-center max-w-7xl mx-auto">
            <div>
                <h1 className="text-title p-4 font-">MangaApp</h1>
            </div>

            <div>
                <ul className=" flex justify-around p-4 space-x-6">

                    <li className="hover:text-accent hover:text-secondary"><a href="/biblioteca">Biblioteca</a></li>

                </ul>
            </div>
        </nav>

        <div className=" text-center p-2 text-note">
            Todos los derechos reservados &copy; 2025
        </div>
    </div>  
  )
}