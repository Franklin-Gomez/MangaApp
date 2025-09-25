import MangaCard from "../../components/lobby/MangaCard";

export default function Lobby () {
  return (
    <>

    <div className=" container  my-8 w-lg">
      <div>
        <h1 className=" text-subtitle my-2 p-2"> Mas Populares </h1>
      </div>

      <div className=" grid grid-cols-3 gap-4 ">
        <MangaCard/>
      </div>

      <div>
        <h1 className=" text-subtitle my-2 p-2"> Mangas Tendencias </h1>
      </div>

      <div className=" grid grid-cols-3 gap-4 ">
        <MangaCard/>
      </div>

      <div>
        <h1 className=" text-subtitle"> Ultimpos grgados </h1>
      </div>

      <div className=" grid grid-cols-3 gap-4 ">
        <MangaCard/>
      </div>

      <div>
        <h1 className="text-subtitle"> Ultimos subidos </h1>
      </div>

      <div className=" grid grid-cols-3 gap-4 ">
        <MangaCard/>
      </div>

    </div>

    </>

  )
}