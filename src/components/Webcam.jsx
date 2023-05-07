import React, { useState, forwardRef} from "react";
import { runDetector } from "../mediaPipe/faceDetection";
import Webcam from "react-webcam";


export const inputResolution = {
  width: 1080,
  height: 900,
};
const videoConstraints = {
  width: inputResolution.width,
  height: inputResolution.height,
  facingMode: "user",
};

export const WebcamDetect = forwardRef((_, {boxRef, cameraRef}) => {
  const [loaded, setLoaded] = useState(false);

  const handleVideoLoad = ({ target }) => {
    const video = target;
    if (video.readyState !== 4 || loaded) return;
    
    runDetector(video, boxRef.current, cameraRef.current);
    setLoaded(true);
  };

    return (
        <div>
            <Webcam
                width={inputResolution.width}
                height={inputResolution.height}
                style={{ visibility: "hidden", position: "absolute" }}
                // style={{ position: "absolute", left: "0", top: "0" , width: "200px", height: "200px"}}
                videoConstraints={videoConstraints}
                onLoadedData={handleVideoLoad}
                mirrored={true}
            />
        </div>
    )
})