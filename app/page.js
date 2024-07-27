"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState("");
  useEffect(async () => {
    const fetchData = await axios
      .get(`${baseURL}/instagram-post`)
      .then((response) => setData(response.data));
  }, []);

  return (
    <div>
      <img src={data} alt="instagram-post"></img>
    </div>
  );
}
