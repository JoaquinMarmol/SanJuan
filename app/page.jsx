"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Carrusel from "@/components/carruselGalery";
import { Button } from "@/components/ui/button";
import CarroFlotante from "@/components/carroFlotante";
import AddCart from "@/components/addCart";
import formatCustomDate from "@/helpers/formatCustomDate";
import CarruselEvent from "@/components/carruselEvent";

async function getData() {
  try {
    if (typeof window === 'undefined') {
      return null;
    }

    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `api/organizations/${subdomain}/`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch organization data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}


// // Genera metadatos de manera dinámica
// export async function generateMetadata() {
//   const data = await getData();

//   if (!data) {
//     return {
//       title: "Plantilla - 1 Boliche",
//       description: "Información del boliche",
//       icons: { icon: "/favicon.ico" },
//     };
//   }

//   return {
//     title: data.organization.name || "Plantilla - 1 Boliche",
//     description: data.organization.description || "Información del boliche",
//     icons: {
//       icon:
//         "https://digisoftware.online/" + data.organization.logo /* || "/favicon.ico" */,
//     },
//     openGraph: {
//       title: data.organization.name,
//       description: data.organization.description,
//       images: "https://digisoftware.online/" + data.organization.logo,
//     },
//   };
// }

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const UrlBase = process.env.NEXT_PUBLIC_API_URL;
  const Informacion = data.organization;
  const Eventos = data.active_events;
  const ImagenArr = data.active_images;
  const Social = Informacion.social_media;
  const Section = data.sections;
  const Contacto = Informacion.contacts[0];

  console.log(Contacto);

  return (
    <main className="relative">
      <div className="bg-[#191919]">
        <CarroFlotante />
        <div className="max-w-7xl m-auto text-white md:grid grid-cols-1 md:grid-cols-6 justify-items-center min-h-screen p-8 pb-20 sm:p-20 content-center">
          <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start col-span-2 md:col-span-3 justify-around	">
            <h1 className="text-5xl font-black md:text-6xl">
              {Informacion ? Informacion.name : ""}
            </h1>
            <p className="text-xl">
              {Informacion ? Informacion.description : ""}
            </p>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <Link
                scroll={true}
                className="items-center font-semibold text-black rounded-md border border-solid border-white/[.08] dark:border-white/[.145] bg-white transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                href="#events"
                rel="noopener noreferrer"
              >
                Join the party
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start col-span-2 md:col-span-3 md:pt-0 pt-24">
            {Informacion.logo && (
              <img
                className="w-5/6 m-auto"
                src={`${UrlBase}${Informacion.logo}`}
                alt={Informacion.name + " " + Informacion.description}
              />
            )}
          </div>
        </div>
      </div>

      {Informacion.sections.length > 0 && (
        <div className="max-w-7xl m-auto p-8 sm:p-20">
          <div className="flex flex-col gap-5 row-start-2 items-center sm:items-start">
            <h2 className="text-5xl font-black">Descubre {Informacion.name}</h2>
            <p className="text-xl text-gray-600">{Informacion.description}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-8 gap-4 md:gap-8 pt-10 md:pt-16">
            {Section.map((item, index) => (
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

      {Eventos.length > 0 && (
        <>
          <div className="max-w-7xl m-auto p-8 sm:p-20" id="events">
            <div className="flex flex-col gap-5 row-start-2 items-center sm:items-start">
              <h2 className="text-5xl font-black">Proximos Eventos</h2>
              <p className="text-xl text-gray-600 w-full md:w-2/3">
                Descubre los próximos eventos en {Informacion.name}, no te
                quedes afuera.
              </p>
            </div>
            {Eventos.length > 3 ? (
              <CarruselEvent event={Eventos} />
            ) : (
              <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 md:pt-10">
                <div className="absolute inset-0 flex justify-center">
                  <div className="top-[14%] absolute hidden md:block h-0.5 bg-black w-full self-center"></div>
                </div>
                {Eventos.map((evento) => (
                  <div key={evento.id} className="grid gap-8">
                    <div className="inline-block z-10 hidden md:block">
                      <span className="bg-[#191919] text-white py-4 px-6 rounded-xl font-bold">
                        {formatCustomDate(evento.start_date, evento.id)}
                      </span>
                    </div>

                    <div>
                      <div className="inline-flex z-10 md:hidden">
                        <span className="bg-[#191919] text-white py-4 px-6 rounded-xl font-bold">
                          {formatCustomDate(evento.start_date, evento.id)}
                        </span>
                      </div>
                      <div className="col-span-1 bg-[#F8F8F8] rounded-md px-6 py-4">
                        <h3 className="text-2xl font-black pb-4">
                          {evento.name}
                        </h3>
                        <p className="text-gray-600 pb-4">
                          {evento.description}
                        </p>
                        <AddCart event={evento} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="max-w-7xl m-auto p-8 sm:p-20">
            <div className="flex flex-col gap-5 row-start-2 items-center sm:items-start">
              <h2 className="text-5xl font-black">Interactive Experiences</h2>
              <p className="text-md text-gray-600 w-full md:w-1/2">
                Discover the immersive and interactive experiences at Electro
                Nexus.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 md:pt-16">
              <div className="col-span-1 bg-[#F8F8F8] rounded-md px-6 py-4">
                <h3 className="text-2xl font-black pb-2">
                  Virtual Reality Zones
                </h3>
                <p className="text-gray-600">
                  Step into a virtual world and experience music like never
                  before.
                </p>
              </div>
              <div className="col-span-1 bg-[#F8F8F8] rounded-md px-6 py-4">
                <h3 className="text-2xl font-black pb-2">
                  Interactive Installations
                </h3>
                <p className="text-gray-600">
                  Step into a virtual world and experience music like never
                  before.
                </p>
              </div>
              <div className="col-span-1 bg-[#F8F8F8] rounded-md px-6 py-4">
                <h3 className="text-2xl font-black pb-2">
                  Immersive Light Shows
                </h3>
                <p className="text-gray-600">
                  Step into a virtual world and experience music like never
                  before.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* <div className="max-w-7xl m-auto p-8 sm:p-20">
        <div className="flex flex-col gap-5 row-start-2 items-center sm:items-start">
          <h2 className="text-5xl font-black">Membership and VIP Services</h2>
          <p className="text-md text-gray-600 w-full md:w-1/2">
            Discover the benefits of becoming a member and enjoy exclusive VIP
            services.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 md:pt-16">
          <div className="col-span-1 bg-[#F8F8F8] rounded-md px-6 py-4">
            <h3 className="text-2xl font-black pb-2">Priority Access</h3>
            <p className="text-gray-600">
              Indulge in tailor-made experiences curated just for you, from
              personalized playlists to dedicated VIP areas.
            </p>
          </div>
          <div className="col-span-1 bg-[#F8F8F8] rounded-md px-6 py-4">
            <h3 className="text-2xl font-black pb-2">Exclusive Discounts</h3>
            <p className="text-gray-600">
              Indulge in tailor-made experiences curated just for you, from
              personalized playlists to dedicated VIP areas.
            </p>
          </div>
          <div className="col-span-1 bg-[#F8F8F8] rounded-md px-6 py-4">
            <h3 className="text-2xl font-black pb-2">
              Personalized Experiences
            </h3>
            <p className="text-gray-600">
              Indulge in tailor-made experiences curated just for you, from
              personalized playlists to dedicated VIP areas.
            </p>
          </div>
        </div>
      </div> */}

      {ImagenArr && ImagenArr.length > 0 && (
        <div className="max-w-7xl m-auto p-8 sm:p-20">
          <Carrusel imagenes={ImagenArr} urlBase={UrlBase} />
        </div>
      )}

      {Social && Social.length > 0 && (
        <div className="max-w-7xl m-auto p-8 sm:p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex">
              <img
                className="m-auto"
                src={`${UrlBase}${Informacion.logo}`}
                alt={Informacion.name + " " + Informacion.description}
              />
            </div>
            <div className="flex">
              <div className="m-auto">
                <h2 className="text-5xl font-black">Contact and Location</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
                  <div className="col-span-1">
                    <h4 className="font-bold">Numero</h4>
                    <p className="text-sm text-gray-600">
                      {Contacto.phone}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <h4 className="font-bold">Email</h4>
                    <p className="text-sm text-gray-600">
                      {Contacto.email}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <h4 className="font-bold">Redes Sociales</h4>
                    <p className="text-sm text-gray-600">
                      {" "}
                      <Link href={Social[0]["url"]} target="_blank">
                        {Social[0]["profile_name"]}
                      </Link>
                    </p>
                  </div>
                  <div className="col-span-3">
                    <h4 className="font-bold">Dirección</h4>
                    <p className="text-sm text-gray-600">
                      {Contacto.address}
                    </p>
                  </div>
                </div>
                {/* <div className="flex gap-4 py-4">
                  <Button className="py-4 w-full font-bold text-white border-2 border-black">
                    SUBMIT
                  </Button>
                  <Button className="py-4 w-full bg-white font-bold border-2 border-black hover:text-white text-black">
                    SUBMIT
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
