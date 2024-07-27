"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`${baseURL}/instagram-post`);
        const mediaUrl = response.data.url;

        if (response.data.type === "image" || response.data.type === "video") {
          const mediaResponse = await axios.get(`${baseURL}/media-proxy`, {
            params: { url: mediaUrl },
            responseType: "blob",
          });
          const mediaBlob = URL.createObjectURL(mediaResponse.data);
          setMedia({ type: response.data.type, url: mediaBlob });
        } else {
          setError("Unsupported media type");
        }
      } catch (error) {
        console.error("Error fetching media:", error);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [baseURL]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (media?.type === "video") {
    return (
      <div>
        <video controls width="100%">
          <source src={media.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  } else if (media?.type === "image") {
    return (
      <div>
        <img
          src={media.url}
          alt="Instagram post"
          style={{ maxWidth: "100%" }}
        />
      </div>
    );
  } else {
    return <p>No content available</p>;
  }
}
