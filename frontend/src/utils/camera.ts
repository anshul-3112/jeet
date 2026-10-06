/**
 * Camera utility functions for Jeet Kendra document uploads.
 */

export const generateCameraPhotoFilename = (): string => {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  return `camera-photo-${year}-${month}-${day}-${hours}${minutes}${seconds}.jpg`;
};

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';

  // Explicit mobile OS check
  const isMobileOS = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  // iPads with iPadOS reporting as Macintosh with multi-touch
  const isIPad = /Macintosh/i.test(ua) && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1;

  // Android tablets
  const isAndroidTablet = /Android/i.test(ua) && !/Mobile/i.test(ua);

  return isMobileOS || isIPad || isAndroidTablet;
};
