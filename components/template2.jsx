import React from "react";
import Link from "next/link";
import formatCustomDate from '../helpers/formatCustomDate'; // Ensure this helper function exists
import CarroFlotante from "./carroFlotante"; // Ensure this component exists
import CarruselEvent from "./carruselEvent"; // Ensure this component exists
import AddCart from "./addCart"; // Ensure this component exists
import Carrusel from "./carruselGalery"; // Ensure this component exists

const Template2 = ({
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
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#333] text-white py-20">
        <CarroFlotante />
        <div className="max-w-7xl m-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 p-8">
          <div className="text-center sm:text-left">
            <h1 className="text-5xl font-extrabold mb-4">{Informacion?.name || ""}</h1>
            <p className="text-lg mb-6">{Informacion?.description || ""}</p>
            <Link
              scroll={true}
              href="#events"
              className="bg-[#454545] text-white py-3 px-8 rounded-lg text-xl font-semibold transition-transform transform hover:scale-105"
            >
              Compra tu ticket
            </Link>
          </div>
          <div className="flex justify-center md:justify-end">
            {Informacion?.logo && (
              <img
                className="w-3/4 md:w-2/3"
                src={`${UrlBase}${Informacion.logo}`}
                alt={`${Informacion.name} Logo`}
              />
            )}
          </div>
        </div>
      </div>

      {/* Section Highlights */}
      {Informacion?.sections?.length > 0 && (
        <div className="bg-[#f4f4f4] py-16">
          <div className="max-w-7xl m-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Discover {Informacion.name}</h2>
            <p className="text-xl text-gray-600 mb-8">{Informacion.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Section.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Events Section */}
      {Eventos && Eventos.length > 0 && (
        <div className="bg-[#fff] py-16" id="events">
          <div className="max-w-7xl m-auto text-center">
            <h2 className="text-5xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600 mb-10">
              Discover the next events at {Informacion.name}, don't miss out.
            </p>
            {Eventos.length > 3 ? (
              <CarruselEvent event={Eventos} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {Eventos.map((evento) => (
                  <div key={evento.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <img
                        src={evento.image_url}
                        alt={evento.name}
                        className="rounded-t-lg w-full h-56 object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-xl">
                        {formatCustomDate(evento?.start_date, evento.id)}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-4">{evento.name}</h3>
                      <p className="text-gray-600 mb-4">{evento.description}</p>
                      <AddCart event={evento} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Previous Events Carousel */}
      {ImagenArr?.length > 0 && (
        <div className="bg-[#f9f9f9] py-16">
          <div className="max-w-7xl m-auto text-center">
            <h2 className="text-5xl font-bold mb-6">Previous Events</h2>
            <Carrusel imagenes={ImagenArr} urlBase={UrlBase} />
          </div>
        </div>
      )}

      {/* Social Media Section */}
      {Social?.length > 0 && (
        <div className="bg-[#1a1a1a] py-16 text-white">
          <div className="max-w-7xl m-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center">
              <img
                className="w-16 h-16 rounded-full"
                src={Social[0]?.icon_url || "/default-social-icon.png"}
                alt="Social media icon"
              />
              <div className="ml-4">
                <h3 className="text-2xl font-semibold">{Social[0]?.platform}</h3>
                <a
                  href={Social[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff4f00] hover:text-[#e94e00]"
                >
                  Follow us on {Social[0]?.platform}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Template2;
