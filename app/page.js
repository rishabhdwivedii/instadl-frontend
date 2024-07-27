"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/instagram-post`);
        setData(response.data.link);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load image");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseURL]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {data ? <img src={data} alt="Instagram post" /> : <p>No image found</p>}
    </div>
  );
}
