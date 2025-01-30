import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./Categories.module.css";
import Spinner from "../../components/common/spinner/Spinner";
import NewsCard from "../../components/specific/newsCard/NewsCard";

const Categories = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();

  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

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

  useEffect(() => {
    fetchNews();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("news:", news);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <form>
          <input type="text" />
          <button>Filter Country</button>
        </form>
      </div>
      <div className={styles.right}>
        <div className={styles.newsGrid}></div>
      </div>
    </div>
  );
};

export default Categories;
