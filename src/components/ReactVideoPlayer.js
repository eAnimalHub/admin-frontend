import React from "react";
import ReactPlayer from "react-player";

export default function ReactVideoPlayer(props) {
  const calculateHeight = () => {
    if (document.getElementsByClassName("container").length === 0) {
      return 570;
    }
    let height =
      document.getElementsByClassName("container")[0].offsetWidth / 1.7777;

    return height;
  };

  return (
    <ReactPlayer
      controls
      url={props.url}
      width="100%"
      height={calculateHeight()}
      className="custom-video-player"
      pip
      stopOnUnmount
      playsinline
    />
  );
}
