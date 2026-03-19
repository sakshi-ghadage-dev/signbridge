import React, { useEffect, useRef, useState } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import './WebcamFeed.css';
import { classifyGesture } from '../../utils/gestureClassifier';
import { translateToMarathi, speakText } from '../../utils/translationUtils';

function WebcamFeed({ language }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handLandmarkerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);
  const cooldownRef = useRef(0);

  const [cameraOn, setCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detectedText, setDetectedText] = useState('');
  const [marathiText, setMarathiText] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const setupModel = async () => {
      if (handLandmarkerRef.current) return handLandmarkerRef.current;

      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );

      const handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
        },
        runningMode: 'VIDEO',
        numHands: 1,
        minHandDetectionConfidence: 0.6,
        minHandPresenceConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      handLandmarkerRef.current = handLandmarker;
      return handLandmarker;
    };

    const drawLandmarks = (landmarks) => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) return;

      const ctx = canvas.getContext('2d');
      const width = video.videoWidth || 640;
      const height = video.videoHeight || 480;

      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#2c7a7b';
      ctx.fillStyle = '#ff9500';
      ctx.lineWidth = 3;

      const connections = [
        [0, 1], [1, 2], [2, 3], [3, 4],
        [0, 5], [5, 6], [6, 7], [7, 8],
        [5, 9], [9, 10], [10, 11], [11, 12],
        [9, 13], [13, 14], [14, 15], [15, 16],
        [13, 17], [17, 18], [18, 19], [19, 20],
        [0, 17],
      ];

      connections.forEach(([a, b]) => {
        const p1 = landmarks[a];
        const p2 = landmarks[b];
        ctx.beginPath();
        ctx.moveTo(p1.x * width, p1.y * height);
        ctx.lineTo(p2.x * width, p2.y * height);
        ctx.stroke();
      });

      landmarks.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x * width, point.y * height, 5, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const detectLoop = () => {
      if (cancelled || !videoRef.current || !handLandmarkerRef.current) return;

      const video = videoRef.current;
      const handLandmarker = handLandmarkerRef.current;

      if (video.readyState >= 2 && lastVideoTimeRef.current !== video.currentTime) {
        lastVideoTimeRef.current = video.currentTime;

        const results = handLandmarker.detectForVideo(video, performance.now());

        if (results.landmarks && results.landmarks.length > 0) {
          const landmarks = results.landmarks[0];
          drawLandmarks(landmarks);

          const result = classifyGesture(landmarks);
          const now = Date.now();

          if (result && now - cooldownRef.current > 1400) {
            cooldownRef.current = now;
            setDetectedText(result.label);
            setConfidence(result.confidence);
            setMarathiText(translateToMarathi(result.label));
          }
        } else {
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(detectLoop);
    };

    const startCamera = async () => {
      try {
        setLoading(true);
        setError('');
        await setupModel();

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
          audio: false,
        });

        if (!videoRef.current) return;

        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        animationFrameRef.current = requestAnimationFrame(detectLoop);
      } catch (err) {
        console.error(err);
        setError('Unable to access camera or load hand detection.');
      } finally {
        setLoading(false);
      }
    };

    const stopCamera = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    if (cameraOn) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [cameraOn]);

  const speakDetected = () => {
    if (language === 'mr') {
      speakText(marathiText, 'mr-IN');
    } else {
      speakText(detectedText, 'en-US');
    }
  };

  return (
    <div className="webcam-feed">
      <div className="webcam-container">
        <div className="video-wrapper">
          <video ref={videoRef} className="canvas-element live-video" autoPlay muted playsInline />
          <canvas ref={canvasRef} className="canvas-element overlay-canvas" />

          {!cameraOn && (
            <div className="camera-placeholder">
              <div className="placeholder-icon">📷</div>
              <p>{language === 'mr' ? 'कॅमेरा सुरू करा' : 'Start camera to begin detection'}</p>
            </div>
          )}

          {loading && (
            <div className="camera-placeholder">
              <div className="placeholder-icon">⏳</div>
              <p>{language === 'mr' ? 'लोड होत आहे...' : 'Loading hand detection...'}</p>
            </div>
          )}

          {error && (
            <div className="camera-placeholder">
              <div className="placeholder-icon">⚠️</div>
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="controls">
          <button className="btn btn-primary" onClick={() => setCameraOn((prev) => !prev)}>
            {cameraOn
              ? language === 'mr'
                ? 'कॅमेरा बंद करा'
                : 'Stop Camera'
              : language === 'mr'
              ? 'कॅमेरा सुरू करा'
              : 'Start Camera'}
          </button>
        </div>
      </div>

      <div className="translation-panel">
        <div className="panel-header">
          <h3>{language === 'mr' ? 'अनुवाद आउटपुट' : 'Translation Output'}</h3>
          <div className="language-switch">
            <button className={`lang-switch-btn ${language === 'en' ? 'active' : ''}`}>EN</button>
            <button className={`lang-switch-btn ${language === 'mr' ? 'active' : ''}`}>मराठी</button>
          </div>
        </div>

        <div className="output-display">
          {detectedText ? (
            <>
              <div className="detected-sign">
                <span className="label">{language === 'mr' ? 'ओळखलेले जेश्चर' : 'Detected Sign'}</span>
                <span className="text">{detectedText}</span>
              </div>

              <div className="marathi-translation">
                <span className="label">{language === 'mr' ? 'मराठी अनुवाद' : 'Marathi Translation'}</span>
                <span className="text">{marathiText}</span>
              </div>

              <div className="confidence-bar">
                <span className="label">{language === 'mr' ? 'विश्वास पातळी' : 'Confidence'}</span>
                <div className="progress">
                  <div className="progress-fill" style={{ width: `${confidence}%` }}></div>
                </div>
                <span className="percentage">{confidence}%</span>
              </div>

              <button className="btn btn-secondary speak-btn" onClick={speakDetected}>
                {language === 'mr' ? '🔊 आवाजात वाचा' : '🔊 Speak Output'}
              </button>
            </>
          ) : (
            <div className="empty-state">
              <p>{language === 'mr' ? 'जेश्चरची प्रतीक्षा...' : 'Waiting for gesture detection...'}</p>
              <span className="hint">
                {language === 'mr'
                  ? 'हात फ्रेममध्ये स्पष्ट दाखवा'
                  : 'Show your hand clearly inside the frame'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WebcamFeed;