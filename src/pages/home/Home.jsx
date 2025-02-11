// Home.js

import { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import Footer from "../../components/common/footer/Footer";
import Spinner from "../../components/common/spinner/Spinner";
import globusVideo from "../../assets/video/Globus.mp4";
import { styled } from "../../styles/globalStyles";

const LatestNews = lazy(() => import("../../components/specific/latestNews/LatestNews"));
const BreakingNewsCarousel = lazy(() => import("../../components/specific/breakingNews/BreakingNewsCarousel"));

const BackgroundVideo = styled("video", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "50vh", // 50% der Viewport-Höhe
  objectFit: "cover",
  zIndex: 1,
});

const HomeContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100vw",
  minHeight: "100vh",
  margin: "0 auto",
  gap: "20px",
  position: "relative",
  backgroundColor: "var(--color-background)",
});

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        setNews(data.articles);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [url]);

  return (
    <>
      <BackgroundVideo
        autoPlay
        loop
        muted
        playsInline>
        <source
          src={globusVideo}
          type="video/mp4"
        />
        Dein Browser unterstützt keine Videos.
      </BackgroundVideo>

      <HomeContainer>
        <Suspense fallback={<Spinner />}>
          <BreakingNewsCarousel news={news} />
          <LatestNews />
        </Suspense>
        <Footer />
      </HomeContainer>
    </>
  );
};

export default Home;
