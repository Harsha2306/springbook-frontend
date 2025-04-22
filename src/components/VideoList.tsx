import React, { useEffect, useState } from "react";
import NewVideo from "./NewVideo";
import axios from "axios";

type Video = {
  name: string;
};

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [refecth, setRefetch] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8080");
        setVideos(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (refecth) fetchVideos();
    return () => setRefetch(false);
  }, [refecth]);

  return (
    <>
      <NewVideo setRefetch={setRefetch} />
      <ul>
        {videos.map((video) => (
          <li>{video.name}</li>
        ))}
      </ul>
    </>
  );
};

export default VideoList;
