import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, RefreshCw, Check, X, AlertCircle, Loader2, FileText } from 'lucide-react';
import { generateCameraPhotoFilename } from '../../utils/camera';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoCaptured: (file: File) => void;
  onFallbackToFilePicker?: () => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onPhotoCaptured,
  onFallbackToFilePicker,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef<boolean>(true);

  const [isLoading, setIsLoading] = useState(true);
  const [cameraReady, setCameraReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [capturedDataUrl, setCapturedDataUrl] = useState<string | null>(null);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);

  const stopStream = useCallback(() => {
    console.log('Camera stream stopped');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      } catch (e) {
        console.error('Error stopping tracks:', e);
      }
      streamRef.current = null;
    }

    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream | null;
      if (stream && typeof stream.getTracks === 'function') {
        try {
          stream.getTracks().forEach((track) => {
            track.stop();
          });
        } catch (e) {
          console.error('Error stopping video.srcObject tracks:', e);
        }
      }
      videoRef.current.srcObject = null;
    }

    setCameraReady(false);
  }, []);

  const handleVideoReady = useCallback(() => {
    if (!isMountedRef.current) return;
    console.log('Camera video stream is ready and playing');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.play().catch((playErr) => {
        console.warn('Video play caught:', playErr);
      });
    }
    setCameraReady(true);
    setIsLoading(false);
  }, []);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setCameraReady(false);
    setErrorMessage(null);
    setCapturedDataUrl(null);
    setCapturedBlob(null);

    console.log('Camera initialization started');
    console.log('mediaDevices:', typeof navigator !== 'undefined' ? navigator.mediaDevices : undefined);
    console.log('isSecureContext:', typeof window !== 'undefined' ? window.isSecureContext : undefined);

    const isLocalhost =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === '[::1]');

    const isSecure = typeof window !== 'undefined' && (window.isSecureContext || isLocalhost);

    if (!isSecure) {
      setIsLoading(false);
      setErrorMessage(
        'Camera access requires browser permission and a secure connection. Please allow camera access or use Select Files.'
      );
      return;
    }

    if (
      typeof navigator === 'undefined' ||
      !navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function'
    ) {
      setIsLoading(false);
      setErrorMessage('Camera access is not supported by this browser. Please use Select Files instead.');
      return;
    }

    // Set 8-second safety timeout to prevent permanent loading spinner
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;
      console.warn('Camera initialization timed out after 8 seconds');
      stopStream();
      setIsLoading(false);
      setErrorMessage(
        'Camera is taking too long to start. Please check browser camera permissions or use Select Files.'
      );
    }, 8000);

    console.log('Requesting camera permission');

    let stream: MediaStream | null = null;

    try {
      // Primary attempt: facingMode: 'user' for laptop/desktop webcams
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
        },
        audio: false,
      });
    } catch (primaryErr: any) {
      console.warn('Primary getUserMedia facingMode: user failed, attempting fallback:', primaryErr);
      try {
        // Fallback attempt: unconstrained video
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      } catch (fallbackErr: any) {
        if (!isMountedRef.current) return;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        console.error('Camera error:', fallbackErr);
        const errName = fallbackErr?.name || primaryErr?.name || '';
        const errMsg = fallbackErr?.message || primaryErr?.message || '';
        console.error('Error details:', { name: errName, message: errMsg });

        setIsLoading(false);

        if (errName === 'NotAllowedError' || errName === 'PermissionDeniedError') {
          setErrorMessage(
            'Camera permission was denied. Please allow camera access in your browser settings and try again.'
          );
        } else if (errName === 'NotFoundError' || errName === 'DevicesNotFoundError') {
          setErrorMessage('No camera was detected on this device.');
        } else if (errName === 'NotReadableError' || errName === 'TrackStartError') {
          setErrorMessage('The camera is currently being used by another application.');
        } else if (errName === 'OverconstrainedError' || errName === 'ConstraintNotSatisfiedError') {
          setErrorMessage('Unable to access the selected camera. Trying another camera...');
        } else if (errName === 'SecurityError') {
          setErrorMessage('Camera access was blocked by browser security settings.');
        } else {
          setErrorMessage('Unable to access the camera. Please use Select Files instead.');
        }
        return;
      }
    }

    if (!isMountedRef.current) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      return;
    }

    console.log('Camera stream received:', stream);
    streamRef.current = stream;

    if (videoRef.current) {
      const video = videoRef.current;
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        handleVideoReady();
      };

      video.oncanplay = () => {
        handleVideoReady();
      };

      if (video.readyState >= 1) {
        handleVideoReady();
      }
    }
  }, [handleVideoReady, stopStream]);

  useEffect(() => {
    isMountedRef.current = true;

    if (isOpen) {
      startCamera();
    } else {
      stopStream();
    }

    return () => {
      isMountedRef.current = false;
      stopStream();
    };
  }, [isOpen, startCamera, stopStream]);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, width, height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedDataUrl(dataUrl);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          setCapturedBlob(blob);
        }
      },
      'image/jpeg',
      0.92
    );
  };

  const handleRetake = () => {
    setCapturedDataUrl(null);
    setCapturedBlob(null);
    if (videoRef.current && streamRef.current) {
      videoRef.current.play().catch(console.warn);
    }
  };

  const handleUsePhoto = () => {
    if (!capturedBlob) return;

    const filename = generateCameraPhotoFilename();
    let file: File;
    try {
      file = new File([capturedBlob], filename, {
        type: 'image/jpeg',
        lastModified: Date.now(),
      });
    } catch {
      file = Object.assign(capturedBlob, {
        name: filename,
        lastModified: Date.now(),
      }) as any;
    }

    stopStream();
    onPhotoCaptured(file);
    onClose();
  };

  const handleClose = () => {
    stopStream();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0B3830] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm font-sans">
                {capturedDataUrl ? 'Photo Preview' : 'Take Photo'}
              </h3>
              <p className="text-[11px] text-emerald-300 font-medium">
                {capturedDataUrl
                  ? 'Review captured image before attaching'
                  : 'Align your document clearly inside the frame'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title="Close Camera"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
          {errorMessage ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs sm:text-sm text-red-800 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-900">Camera Notice</p>
                  <p className="mt-1 leading-relaxed">{errorMessage}</p>
                </div>
              </div>
              {onFallbackToFilePicker && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      onFallbackToFilePicker();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-red-300 hover:bg-red-50 text-red-700 font-bold rounded-full text-xs transition-colors cursor-pointer shadow-2xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Use Select Files Instead</span>
                  </button>
                </div>
              )}
            </div>
          ) : capturedDataUrl ? (
            /* Captured Image Preview */
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[4/3] flex items-center justify-center shadow-inner">
              <img
                src={capturedDataUrl}
                alt="Captured document preview"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Photo Captured</span>
              </div>
            </div>
          ) : (
            /* Live Camera Viewfinder */
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[4/3] flex items-center justify-center shadow-inner">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white bg-slate-950/90 z-10">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
                  <p className="text-xs font-medium text-slate-300">Accessing camera...</p>
                </div>
              )}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                onLoadedMetadata={handleVideoReady}
                onCanPlay={handleVideoReady}
                className={`w-full h-full object-cover ${cameraReady ? 'block' : 'opacity-0'}`}
              />
              {/* Subtle Document Guide Frame */}
              {!isLoading && cameraReady && (
                <div className="absolute inset-4 pointer-events-none border-2 border-white/30 border-dashed rounded-xl flex items-center justify-center">
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400 rounded-tl"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400 rounded-tr"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400 rounded-bl"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400 rounded-br"></div>
                  <span className="text-[11px] font-medium text-white/80 bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                    Hold document steady
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:px-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          {errorMessage ? (
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 text-xs font-bold rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : capturedDataUrl ? (
            <>
              <button
                type="button"
                onClick={handleRetake}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 shadow-2xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                <span>Retake</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 text-xs font-bold rounded-full text-slate-600 hover:bg-slate-200/70 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUsePhoto}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-full bg-[#0B3830] hover:bg-[#072722] text-white shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Use Photo</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 text-xs font-bold rounded-full text-slate-600 hover:bg-slate-200/70 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isLoading || !cameraReady}
                onClick={handleCapture}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-full bg-[#0B3830] hover:bg-[#072722] text-white shadow-xs transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Camera className="w-4 h-4 text-amber-300" />
                <span>Capture Photo</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
