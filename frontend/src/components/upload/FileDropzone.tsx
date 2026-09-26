import React, { useRef, useState } from 'react';
import { UploadCloud, Camera, FileText, X, AlertCircle } from 'lucide-react';

interface FileDropzoneProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  files,
  onChange,
  maxFiles = 5,
  maxSizeMB = 10,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const validateAndAddFiles = (newFiles: FileList | File[]) => {
    setErrorMessage(null);
    const validFiles: File[] = [...files];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];

      if (validFiles.length >= maxFiles) {
        setErrorMessage(`Maximum of ${maxFiles} files allowed.`);
        break;
      }

      if (!allowedTypes.includes(file.type)) {
        setErrorMessage(`"${file.name}" has an invalid file type. Only JPG, PNG, WEBP and PDF are accepted.`);
        continue;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        setErrorMessage(`"${file.name}" exceeds the ${maxSizeMB}MB file size limit.`);
        continue;
      }

      // Avoid duplicates by name + size
      if (!validFiles.some((f) => f.name === file.name && f.size === file.size)) {
        validFiles.push(file);
      }
    }

    onChange(validFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onChange(updated);
    setErrorMessage(null);
  };

  return (
    <div className="w-full space-y-4">
      {/* Drop area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? 'border-brand-500 bg-brand-50/60 scale-[1.01]'
            : 'border-slate-300 hover:border-brand-400 bg-slate-50/80 hover:bg-slate-100/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) validateAndAddFiles(e.target.files);
          }}
        />

        {/* Dedicated camera capture input */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) validateAndAddFiles(e.target.files);
          }}
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 shadow-inner">
            <UploadCloud className="w-7 h-7" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-800">
              Drag &amp; drop files here, or <span className="text-brand-600 hover:underline">browse</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports Aadhaar, PAN, Marksheets (PDF, JPG, PNG up to {maxSizeMB}MB each)
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors active:scale-95"
            >
              <Camera className="w-4 h-4" />
              Take Photo
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm transition-colors"
            >
              <FileText className="w-4 h-4" />
              Select Files
            </button>
          </div>
        </div>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 rounded-xl border border-red-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Uploaded File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 px-1">
            <span>Selected Files ({files.length}/{maxFiles})</span>
            <span className="text-emerald-600 font-semibold">Auto-deleted after 24 hours</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {files.map((file, idx) => {
              const isPdf = file.type === 'application/pdf';
              const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
              return (
                <div
                  key={`${file.name}-${idx}`}
                  className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0 font-bold text-xs uppercase">
                      {isPdf ? 'PDF' : file.type.split('/')[1] || 'IMG'}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-medium text-slate-800 truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-400">{sizeInMB} MB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
