import React, { useEffect, useState } from "react";
import NewVideo from "./NewVideo";
import axios from "axios";

type VideoResponse = {
  id: number;
  name: string;
  description: string;
};

type VideoItemProps = {
  video: VideoResponse;
};

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<VideoResponse[]>([]);
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
          <VideoItem key={video.id} video={video} />
        ))}
      </ul>
    </>
  );
};

const VideoItem: React.FC<VideoItemProps> = ({ video }) => {
  return (
    <li>
      <h3>{video.name}</h3>
      <p>{video.description}</p>
    </li>
  );
};

export default VideoList;
