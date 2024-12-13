import React from "react";
import Link from "next/link";
import formatCustomDate from '../helpers/formatCustomDate';// Ensure this helper function exists
import CarroFlotante from "./carroFlotante"; // Ensure this component exists
import CarruselEvent from "./carruselEvent"; // Ensure this component exists
import AddCart from "./addCart"; // Ensure this component exists
import Carrusel from "./carruselGalery"; // Ensure this component exists

const Template = ({
  Informacion,
  Section,
  Eventos,
  ImagenArr,
  Social,
  Contacto,
  UrlBase,
}) => {
  return (
    <main className="relative">
      <div className="bg-[#191919]">
        <CarroFlotante />
        <div className="max-w-7xl m-auto text-white md:grid grid-cols-1 md:grid-cols-6 justify-items-center min-h-screen p-8 pb-20 sm:p-20 content-center">
          <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start col-span-2 md:col-span-3 justify-around">
            <h1 className="text-5xl font-black md:text-6xl">
              {Informacion?.name || ""}
            </h1>
            <p className="text-xl">
              {Informacion?.description || ""}
            </p>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <Link
                scroll={true}
                className="items-center font-semibold text-black rounded-md border border-solid border-white/[.08] dark:border-white/[.145] bg-white transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                href="#events"
                rel="noopener noreferrer"
              >
                Compra tu ticket
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start col-span-2 md:col-span-3 md:pt-0 pt-24">
            {Informacion?.logo && (
              <img
                className="w-5/6 m-auto"
                src={`${UrlBase}${Informacion.logo}`}
                alt={`${Informacion.name} ${Informacion.description}`}
              />
            )}
          </div>
        </div>
      </div>

      {Informacion?.sections?.length > 0 && (
        <div className="max-w-7xl m-auto p-8 sm:p-20">
          <div className="flex flex-col gap-5 row-start-2 items-center sm:items-start">
            <h2 className="text-5xl font-black">Descubre {Informacion.name}</h2>
            <p className="text-xl text-gray-600">{Informacion.description}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-8 gap-4 md:gap-8 pt-10 md:pt-16">
            {Section.map((item) => (
              <div
                key={item.id}
                className="col-span-2 bg-[#F8F8F8] rounded-md px-6 py-4"
              >
                <h3 className="text-2xl font-black pb-2">{item.title}</h3>
                <p className="text-gray-600">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {Eventos && Eventos.length > 0 && (
        <>
          <div className="max-w-7xl m-auto p-8 sm:p-20" id="events">
            <div className="flex flex-col gap-5 row-start-2 items-center sm:items-start">
              <h2 className="text-5xl font-black">Proximos Eventos</h2>
              <p className="text-xl text-gray-600 w-full md:w-2/3">
                Descubre los próximos eventos en {Informacion.name}, no te quedes afuera.
              </p>
            </div>
            {Eventos.length > 3 ? (
              <CarruselEvent event={Eventos} />
            ) : (
              <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 md:pt-10">
                {Eventos.map((evento) => (
                  <div key={evento.id} className="grid gap-8">
                    <div className="inline-block hidden md:block">
                      <div className="absolute inset-0 flex justify-center">
                        <div className="top-[50px] z-[-2] absolute hidden md:block h-0.5 bg-black w-full self-center"></div>
                      </div>
                      <span className="bg-[#191919] text-white py-4 px-6 rounded-xl font-bold z-10 relative">
                        {formatCustomDate(evento?.start_date, evento.id)}
                      </span>
                    </div>

                    <div className="z-10">
                      <div className="inline-flex z-20 md:hidden">
                        <span className="bg-[#191919] text-white py-4 px-6 rounded-xl font-bold">
                          {formatCustomDate(evento?.start_date, evento.id)}
                        </span>
                      </div>
                      <div className="col-span-1 bg-[#F8F8F8] rounded-md px-4 py-4">
                        <h3 className="text-2xl font-black pb-4">{evento.name}</h3>
                        <div className="relative group">
                          <img
                            src={evento.image_url}
                            alt={evento.name}
                            className="rounded-md"
                          />
                          <p className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 p-3 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md pointer-events-none">
                            {evento.description}
                          </p>
                        </div>
                        <AddCart event={evento} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {ImagenArr?.length > 0 && (
        <div className="max-w-7xl m-auto p-8 sm:p-20">
          <h2 className="text-5xl font-black mb-4">Eventos Anteriores</h2>
          <Carrusel imagenes={ImagenArr} urlBase={UrlBase} />
        </div>
      )}

      {Social?.length > 0 && (
        <div className="max-w-7xl m-auto p-8 sm:p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex">
              <img
                className="m-auto"
                src={Social[0]?.icon_url || "/default-social-icon.png"}
                alt="Social media icon"
              />
              <div className="flex flex-col justify-center ml-4">
                <h3 className="text-2xl font-bold">{Social[0]?.platform}</h3>
                <a
                  href={Social[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Síguenos en {Social[0]?.platform}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Template;
