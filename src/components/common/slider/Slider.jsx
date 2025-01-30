import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import styles from "./Slider.module.css";
import noImage from "../../../assets/img/noImage.jpg";

const Slider = ({ sliderNews }) => {
  if (!sliderNews || sliderNews.length === 0) {
    return <p>Keine Nachrichten für den Slider verfügbar.</p>;
  }

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.swiper}>
        {sliderNews.map((article, index) => (
          <SwiperSlide key={index}>
            <div className={styles.slide}>
              <img
                loading="lazy"
                src={article.urlToImage || noImage}
                alt={article.title || "News Image"}
                className={styles.image}
              />
              <div className={styles.textOverlay}>
                <h3>{article.title}</h3>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer">
                  Read more ➡️
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
