"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import AddCart from "./addCart";
import formatCustomDate from "@/helpers/formatCustomDate";

export default function CarruselEvent({ event }) {
  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {event.map((ev, index) => (
            <CarouselItem key={ev.id} className="md:basis-1/2 lg:basis-1/3 py-4 my-8">
              <div className="grid gap-8">
                <div className="inline-block z-10 hidden md:block">
                  <span className="bg-[#191919] text-white py-4 px-6 rounded-xl font-bold">
                  {formatCustomDate(ev.start_date, ev.id)}
                  </span>
                </div>

                <div>
                  <div className="inline-flex z-10 md:hidden">
                    <span className="bg-[#191919] text-white py-4 px-6 rounded-xl font-bold">
                    {formatCustomDate(ev.start_date, ev.id)}
                    </span>
                  </div>
                  <div className="col-span-1 bg-[#F8F8F8] rounded-md px-6 py-4">
                    <h3 className="text-2xl font-black pb-4">{ev.name}</h3>
                    <p className="text-gray-600 pb-4">
                      Get ready for a night of pure euphoria as our resident DJs
                      take you on a journey through the best electronic music.
                      Dance the night away and experience the energy of Electro
                      Nexus like never before.
                    </p>
                    <AddCart event={ev} />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
          {/* {imagenes && imagenes.length > 0
            ? imagenes.map((imagen, index) => (
                <CarouselItem
                  key={imagen.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-4">
                        <img
                          src={`${urlBase}${imagen.image}`}
                          alt={imagen.title + " " + imagen.description}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            : (
              Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            )} */}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
