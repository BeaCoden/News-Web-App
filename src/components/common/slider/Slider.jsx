import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { styled } from "../../../styles/globalStyles";
import noImage from "../../../assets/img/noImage.jpg";

// **Slider Container**
const SliderContainer = styled("div", {
  width: "100%",
  maxWidth: "900px",
  margin: "0 auto",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  position: "relative",
  zIndex: 0, // **Stellt sicher, dass es unter dem Dropdown bleibt**
});

// **Swiper-Styling**
const StyledSwiper = styled(Swiper, {
  width: "100%",
});

// **Slide-Container**
const Slide = styled("div", {
  position: "relative",
  overflow: "hidden",
});

// **Bild-Styling**
const Image = styled("img", {
  width: "100%",
  height: "280px",
  objectFit: "cover",
  borderRadius: "10px",
  transition: "transform 0.3s ease-in-out",

  "&:hover": {
    transform: "scale(1.05)",
  },

  "@media (max-width: 1024px)": {
    height: "250px",
  },

  "@media (max-width: 768px)": {
    height: "200px",
  },
});

// **Text Overlay**
const TextOverlay = styled("div", {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  background: "rgba(0, 0, 0, 0.6)",
  color: "#fff",
  padding: "12px",
  textAlign: "left",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
  zIndex: 1,
});

// **Titel-Styling**
const Title = styled("h3", {
  fontSize: "1rem",
  marginBottom: "8px",
  fontWeight: "bold",
});

// **Read More Button**
const ReadMore = styled("a", {
  fontSize: "0.85rem",
  fontWeight: "bold",
  textDecoration: "none",
  color: "#fff",
  background: "rgba(255, 255, 255, 0.2)",
  padding: "5px 10px",
  borderRadius: "5px",
  transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",

  "&:hover": {
    background: "rgba(255, 255, 255, 0.4)",
    color: "#ffdd57",
  },
});

const Slider = ({ sliderNews }) => {
  if (!sliderNews || sliderNews.length === 0) {
    return <p>Keine Nachrichten für den Slider verfügbar.</p>;
  }

  return (
    <SliderContainer>
      <StyledSwiper
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
        modules={[Autoplay, Pagination, Navigation]}>
        {sliderNews.map((article, index) => (
          <SwiperSlide key={index}>
            <Slide>
              <Image
                loading="lazy"
                src={article.urlToImage || noImage}
                alt={article.title || "News Image"}
              />
              <TextOverlay>
                <Title>{article.title}</Title>
                <ReadMore
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer">
                  Read more ➡️
                </ReadMore>
              </TextOverlay>
            </Slide>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </SliderContainer>
  );
};

export default Slider;
