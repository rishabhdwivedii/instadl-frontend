"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await axios.get(`${baseURL}//profile-pic-proxy`, {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const imageUrl = URL.createObjectURL(response.data);
        setProfilePicUrl(imageUrl);
      } catch (error) {
        setError("Failed to fetch profile picture");
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePic();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Instagram Profile Picture</h1>
      {error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        profilePicUrl && (
          <img
            src={profilePicUrl}
            alt="Instagram Profile"
            style={styles.image}
          />
        )
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  error: {
    color: "red",
  },
};
