import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// CSS
import "swiper/css";
import "swiper/css/navigation";

// Módulos
import { Navigation, A11y } from "swiper/modules";

// Componentes
import Slide from "./Slide";

// Env
const urlGet = import.meta.env.VITE_API_GET_QUIZZES;

const Carrusel = ({ children, id }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlGet); // Hacer el GET a la URL de la API
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener los quizzes", error); // Manejo de errores
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="w-screen">
        <div className="text-2xl font-bold tracking-tight ml-[50px] relative select-none">
          {children}
        </div>

        <div className=" py-5 relative">
          <Swiper
            modules={[Navigation, A11y]}
            navigation={{
              nextEl: `.swiper-button-next-${id}`,
              prevEl: `.swiper-button-prev-${id}`,
            }}
            grabCursor={true}
            slidesPerView={7}
            spaceBetween={0}
            slidesOffsetBefore={50}
            slidesOffsetAfter={50}
            className="mySwiper"
          >
            {Array(10)
              .fill([...data])
              .flat()
              .map((item, index) => (
                <SwiperSlide key={item._id + index}>
                  <Slide
                    index={item._id}
                    authorData={item.author}
                    bannerData={item.mainContent}
                  />
                </SwiperSlide>
              ))}
          </Swiper>

          <span className="h-full w-20 absolute left-0 top-0 z-10 bg-swiper-shadow-l rounded-r-3xl "></span>
          <span className="h-full w-20 absolute right-0 top-0 z-10 bg-swiper-shadow-r rounded-l-3x1"></span>

          <div className={`swiper-button-prev-${id} swiper-button-prev`}></div>
          <div className={`swiper-button-next-${id} swiper-button-next`}></div>
        </div>
      </div>
    </>
  );
};

export default Carrusel;
