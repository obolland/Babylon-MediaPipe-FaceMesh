  import { Vector3 } from '@babylonjs/core';
  
  export const getCameraPosFromKeypoints = (faces) => {
    if(faces.length === 0) return;

    const leftEye = faces[0].keypoints.filter(
        (point) => point?.name === "leftEye"
      );

    const rightEye = faces[0].keypoints.filter(
        (point) => point?.name === "rightEye"
      );

    //  using faceOval[0].z to get the distance from the camera
    //  as it seems to be the most accurate
    const faceOval = faces[0].keypoints.filter(
        (point) => point?.name === "faceOval"
      );

    const midpoints = {
        x: (leftEye[0]?.x + rightEye[0]?.x) / 2 ?? 0,
        y: (leftEye[0]?.y + rightEye[0]?.y) / 2 ?? 0,
      };

    return {
        cameraPos: new Vector3(
            -midpoints.x / 350 + 2,
            -midpoints.y / 350 + 1,
            -faceOval[0]?.z / 100 -10 ?? -10
        ),
        boxRotation: new Vector3(
            midpoints.y / 400,
            0,
            midpoints.x / 400
        )
    }
  }
