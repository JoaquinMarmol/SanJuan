"use client";

import { useEffect, useState } from "react";
import Template from "../components/template";
import Template2 from "../components/template2";
import Template3 from "@/components/template3";

async function getData() {
  try {
    if (typeof window === 'undefined') {
      return null;
    }

    // Obtiene el subdominio de la URL
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];

    // Llama a la API usando el subdominio
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `api/organizations/${subdomain}/`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch organization data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los datos:', error.message);
    return null; // Devuelve null si ocurre un error
  }
}

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
      console.log(result);

    }

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const templateType = data.template_type; // Suponiendo que la API devuelve este campo

  // Asegúrate de que las propiedades están disponibles
  const organizationData = data.organization || {};
  const activeEvents = data.active_events || [];
  const activeImages = data.active_images || [];
  const sections = data.sections || [];
  const socialMedia = data.social_media || [];
  const contact = data.contacts || [];

  return (
    <div>
      <Template
        Informacion={organizationData}
        Section={sections}
        Eventos={activeEvents}
        ImagenArr={activeImages}
        Social={socialMedia}
        Contacto={contact}
        UrlBase={process.env.NEXT_PUBLIC_API_URL}
      />
      {templateType === "template2" && (
        <Template2
          Informacion={organizationData}
          Section={sections}
          Eventos={activeEvents}
          ImagenArr={activeImages}
          Social={socialMedia}
          Contacto={contact}
          UrlBase={process.env.NEXT_PUBLIC_API_URL}
        />
      )}
      {templateType === "template3" && (
        <Template3
          Informacion={organizationData}
          Section={sections}
          Eventos={activeEvents}
          ImagenArr={activeImages}
          Social={socialMedia}
          Contacto={contact}
          UrlBase={process.env.NEXT_PUBLIC_API_URL}
        />)}
      {/* Aquí puedes agregar la lógica para otros templates según el tipo */}
      {/* {templateType === "template2" && <Template2 data={data} />} */}
      {/* {templateType === "template3" && <Template3 data={data} />} */}
    </div>
  );
}
