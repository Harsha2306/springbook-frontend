import axios from "axios";
import React, { useState } from "react";

type NewVideoProps = {
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};

type VideoRequest = {
  name: string;
  description: string;
};

const initalForm: VideoRequest = { name: "", description: "" };

const NewVideo: React.FC<NewVideoProps> = ({ setRefetch }) => {
  const [video, setVideo] = useState<VideoRequest>(initalForm);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo((prev) => ({ ...prev, description: e.target.value }));
  };

  const postNewVideo = async () => {
    try {
      await axios.post("http://localhost:8080", video);
      setVideo(initalForm);
      setRefetch(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        postNewVideo();
      }}
    >
      <p>Name</p>
      <input
        onChange={(e) => handleNameChange(e)}
        value={video.name}
        type="text"
      />
      <p>Description</p>
      <input
        onChange={(e) => handleDescChange(e)}
        value={video.description}
        type="text"
      />
      <br />
      <button type="submit">Add</button>
    </form>
  );
};

export default NewVideo;
