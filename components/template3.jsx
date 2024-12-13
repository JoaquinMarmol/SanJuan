import React from "react";
import Link from "next/link";
import formatCustomDate from "../helpers/formatCustomDate"; // Asegúrate de que esta función exista
import AddCart from "./addCart"; // Asegúrate de que este componente exista
import Carrusel from "./carruselGalery"; // Asegúrate de que este componente exista

const Template3 = ({
  Informacion,
  Section,
  Eventos,
  ImagenArr,
  Social,
  UrlBase,
}) => {
  return (
    <main className="relative bg-gradient-to-r from-[#7f7f7f] to-[#2a2a2a] text-white">
      {/* Header Section */}
      <header className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${UrlBase}${Informacion?.backgroundImage})` }}>
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4">{Informacion?.name}</h1>
            <p className="text-lg md:text-2xl mb-8">{Informacion?.description}</p>
            <Link href="#events" className="bg-[#ff6f61] text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#ff4f3b] transition-colors duration-300">
              ¡Únete a la fiesta!
            </Link>
          </div>
        </div>
      </header>

      {/* Sección de Descubre {Informacion.name} */}
      {Informacion?.sections?.length > 0 && (
        <section className="py-20 px-6 sm:px-12">
          <div className="max-w-7xl m-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Descubre {Informacion?.name}</h2>
            <p className="text-lg text-gray-300 mb-10">{Informacion?.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Section.map((item) => (
                <div key={item.id} className="bg-[#1f1f1f] rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sección de Eventos */}
      {Eventos && Eventos.length > 0 && (
        <section id="events" className="py-20 px-6 sm:px-12 bg-[#1f1f1f]">
          <div className="max-w-7xl m-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-white">Próximos Eventos</h2>
            <p className="text-lg text-gray-300 mb-6">Descubre los próximos eventos en {Informacion.name}, ¡no te los puedes perder!</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Eventos.map((evento) => (
              <div key={evento.id} className="bg-[#2d2d2d] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-all duration-300">
                <img
                  src={evento.image_url}
                  alt={evento.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{evento.name}</h3>
                  <p className="text-gray-400 mb-6">{evento.description}</p>
                  <span className="block text-gray-500">{formatCustomDate(evento?.start_date, evento.id)}</span>
                  <AddCart event={evento} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Galería de Eventos Anteriores */}
      {ImagenArr?.length > 0 && (
        <section className="py-20 px-6 sm:px-12">
          <div className="max-w-7xl m-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Eventos Anteriores</h2>
            <Carrusel imagenes={ImagenArr} urlBase={UrlBase} />
          </div>
        </section>
      )}

      {/* Redes Sociales */}
      {Social?.length > 0 && (
        <section className="py-20 px-6 sm:px-12 bg-[#2b2d42]">
          <div className="max-w-7xl m-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Síguenos en Redes Sociales</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {Social.map((platform) => (
                <div key={platform.platform} className="flex items-center justify-center bg-[#1f1f1f] p-6 rounded-lg">
                  <img
                    src={platform.icon_url || "/default-social-icon.png"}
                    alt={`${platform.platform} icon`}
                    className="w-12 h-12 mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{platform.platform}</h3>
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ff6f61] hover:text-[#ff4f3b] transition-colors duration-300"
                    >
                      Síguenos en {platform.platform}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Template3;
