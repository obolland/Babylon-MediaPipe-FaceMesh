import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/face_mesh";
import "@tensorflow/tfjs-converter";
import { getCameraPosFromKeypoints } from "../utils/getCameraPosFromKeypoints";

export const runDetector = async (video, boxRef, cameraRef) => {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const detectorConfig = {
    runtime: "tfjs",
    maxFaces: 1,
    shouldLoadIrisModel: false,
  };
  const detector = await faceLandmarksDetection.createDetector(
    model,
    detectorConfig
  );
  const detect = async (net) => {
    const estimationConfig = { flipHorizontal: false };
    const faces = await net.estimateFaces(video, estimationConfig);
    
    const {cameraPos, boxRotation} = getCameraPosFromKeypoints(faces);
    cameraRef.position = cameraPos;
    boxRef.rotation = boxRotation;

    detect(detector);
  };
  detect(detector);
};