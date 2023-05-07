import React, {useRef, useEffect} from 'react'
import {
  Engine,
  Scene,
} from 'react-babylonjs'
import { Vector3 } from '@babylonjs/core';
import { WebcamDetect } from './Webcam';


export const Babylon = () => {
  const cameraRef = useRef(null)
  const boxRef = useRef(null)
  
  return(
  <div>
    <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
      <Scene>
        <freeCamera
          name='camera1'
          ref={cameraRef}
          target={Vector3.Zero()}
          position={new Vector3(0, 0, -10)}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={Vector3.Up()}
        />
        <box
          ref={boxRef}
          name='box'
          size={2}
          position={new Vector3(0, 0, 0)}
          scaling={new Vector3(1, 1, 1)}
        />
      </Scene>
    </Engine>
    <WebcamDetect ref={{boxRef, cameraRef}}/>
  </div>
)}