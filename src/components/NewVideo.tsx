import axios from "axios";
import React, { useState } from "react";

type NewVideoProps = {
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewVideo: React.FC<NewVideoProps> = ({ setRefetch }) => {
  const [video, setVideo] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo(e.target.value);
  };

  const postNewVideo = async () => {
    try {
      await axios.post("http://localhost:8080", { name: video });
      setVideo("");
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
      <input onChange={(e) => handleOnChange(e)} value={video} type="text" />
      <button type="submit">Add</button>
    </form>
  );
};

export default NewVideo;
