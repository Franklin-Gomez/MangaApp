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
        <h1 className=" text-subtitle my-2 p-2"> Mangas Populares </h1>
      </div>

      <div className=" grid grid-cols-3 gap-4 ">
        <div>
          <img src="./public/portada/Gachiakuta.jpg"/>
        </div>

        <div>
          <img src="./public/portada/Gachiakuta.jpg"/>
        </div>

        <div>
          <img src="./public/portada/Gachiakuta.jpg"/>
        </div>

        <div>
          <img src="./public/portada/Gachiakuta.jpg"/>
        </div>

      </div>

      <div>
        <h1 className=" text-subtitle"> Ultimpos Agregados </h1>
      </div>

      <div className=" grid grid-cols-3 gap-4 ">
        <div>
          <img src="./public/portada/Gachiakuta.jpg"/>
        </div>

        <div>
          <img src="./public/portada/Gachiakuta.jpg"/>
        </div>

        <div>
          <img src="./public/portada/Gachiakuta.jpg"/>
        </div>

        <div>
          <img src="./public/portada/Gachiakuta.jpg"/>
        </div>

      </div>

      <div>
        <h1 className="text-subtitle"> Ultimos subidos </h1>
      </div>

      <div className=" grid grid-cols-3 gap-4 ">
        <div>
          <img src="./public/portada/Gachiakuta.jpg"/>
        </div>

        <div>
          <img src="./public/portada/Gachiakuta.jpg"/>
        </div>

        <div>
          <img src="./public/portada/Gachiakuta.jpg"/>
        </div>

        <div>
          <img src="./public/portada/Gachiakuta.jpg"/>
        </div>

      </div>

    </div>

    </>

  )
}