import React, { useRef, useState } from 'react';
import { ALLOWED_MIME_TYPES } from '../constants';
import { FileData, MediaType } from '../types';
import Button from './Button';

interface FileUploaderProps {
  onFileSelected: (fileData: FileData) => void;
  disabled?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelected, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndProcessFile = (file: File) => {
    if (ALLOWED_MIME_TYPES.includes(file.type)) {
      const type = file.type.startsWith('video') ? MediaType.VIDEO : MediaType.AUDIO;
      const previewUrl = URL.createObjectURL(file);
      onFileSelected({ file, previewUrl, type });
    } else {
      alert("ERRO DE PROTOCOLO: Formato de arquivo não suportado.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;

    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`relative w-full p-8 border-2 border-dashed transition-all duration-200 
        ${dragActive 
          ? 'bg-yellow-400 border-black' 
          : 'bg-cyber-yellow border-black hover:bg-yellow-400'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={!disabled ? onButtonClick : undefined}
      style={{
        // Subtle pattern to give it texture, but black instead of transparent/gray
        backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05)), linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05))',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={ALLOWED_MIME_TYPES.join(',')}
        onChange={handleChange}
        disabled={disabled}
      />
      
      <div className="flex flex-col items-center justify-center gap-6 z-10 relative">
        <div className={`p-4 border-2 border-black text-black bg-yellow-300/50`}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
        </div>
        
        <div className="space-y-1 text-center">
          <p className="text-lg font-display font-bold text-black uppercase tracking-wider">
            UPLOAD DE DADOS
          </p>
          <p className="text-xs text-black/70 font-mono font-bold">
            [FORMATOS ACEITOS: MP3, WAV, MP4, MOV]
          </p>
        </div>

        {/* Using the new inverse variant for Black button on Yellow background */}
        <Button type="button" variant="inverse" onClick={(e) => { e.stopPropagation(); onButtonClick(); }} disabled={disabled}>
          SELECIONAR_ARQUIVO
        </Button>
      </div>
    </div>
  );
};

export default FileUploader;