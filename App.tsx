import React, { useState, useEffect } from 'react';
import FileUploader from './components/FileUploader';
import ResultDisplay from './components/ResultDisplay';
import Button from './components/Button';
import { transcribeMediaFile } from './services/geminiService';
import { FileData, MediaType, TranscriptionState } from './types';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [transcriptionState, setTranscriptionState] = useState<TranscriptionState>({
    isLoading: false,
    error: null,
    text: null,
  });

  // Clean up object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (selectedFile?.previewUrl) {
        URL.revokeObjectURL(selectedFile.previewUrl);
      }
    };
  }, [selectedFile]);

  const handleFileSelected = (fileData: FileData) => {
    setSelectedFile(fileData);
    setTranscriptionState({ isLoading: false, error: null, text: null });
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setTranscriptionState({ isLoading: false, error: null, text: null });
  };

  const handleStartTranscription = async () => {
    if (!selectedFile) return;

    setTranscriptionState({ isLoading: true, error: null, text: null });

    try {
      const text = await transcribeMediaFile(selectedFile.file);
      setTranscriptionState({
        isLoading: false,
        error: null,
        text: text,
      });
    } catch (err) {
      setTranscriptionState({
        isLoading: false,
        error: err instanceof Error ? err.message : 'FALHA CRÍTICA NO SISTEMA',
        text: null,
      });
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black text-slate-300 pb-20 font-sans relative">
      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0" style={{
        backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Header */}
      <header className="bg-cyber-dark/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="bg-cyber-yellow text-black p-2 shadow-neon">
              {/* Audio Waveform Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-display font-black tracking-tighter text-white uppercase italic">
              CN7 <span className="text-cyber-yellow">Transcriptor</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        
        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-tight">
            Transcrição com <span className="text-cyber-yellow bg-cyber-yellow/10 px-2">Precisão</span>
          </h2>
          <div className="w-24 h-1 bg-cyber-yellow mx-auto mb-6"></div>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-mono">
            Processamento neural avançado para extração de dados de áudio.
          </p>
        </div>

        {/* Input Area */}
        <div className="bg-cyber-dark/50 backdrop-blur-sm p-1 border border-slate-800 mb-8">
          <div className="border border-slate-800 p-6 md:p-8">
            {!selectedFile ? (
              <FileUploader onFileSelected={handleFileSelected} />
            ) : (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-display font-bold text-cyber-yellow uppercase">Arquivo Carregado</h3>
                  <Button 
                    onClick={handleRemoveFile}
                    disabled={transcriptionState.isLoading}
                    variant="danger"
                    className="text-xs py-2 px-4"
                  >
                    CANCELAR / ENVIAR OUTRO ÁUDIO
                  </Button>
                </div>

                <div className="bg-black/40 p-4 border border-slate-700 mb-6 flex items-start gap-4">
                  <div className="flex-shrink-0 bg-cyber-yellow text-black p-3 shadow-neon">
                     {selectedFile.type === MediaType.VIDEO ? (
                       <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                     ) : (
                       <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
                     )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-white truncate font-mono">
                      {selectedFile.file.name}
                    </p>
                    <p className="text-xs text-cyber-yellow/70 font-mono mb-2">
                      DATA_SIZE: {(selectedFile.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    
                    {/* Media Preview */}
                    <div className="mt-3 border border-slate-700 bg-black">
                      {selectedFile.type === MediaType.VIDEO ? (
                        <video 
                          src={selectedFile.previewUrl} 
                          controls 
                          className="w-full max-h-[300px]"
                        />
                      ) : (
                        <audio 
                          src={selectedFile.previewUrl} 
                          controls 
                          className="w-full"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={handleStartTranscription}
                    isLoading={transcriptionState.isLoading}
                    className="w-full sm:w-auto"
                  >
                    INICIAR TRANSCRIÇÃO
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error State */}
        {transcriptionState.error && (
          <div className="bg-red-900/20 border border-red-600 p-4 mb-8 text-red-500 font-mono animate-fade-in flex items-start gap-3">
             <svg className="h-6 w-6 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
             <div>
               <p className="font-bold uppercase text-sm">Erro de Sistema</p>
               <p className="text-sm opacity-80">{transcriptionState.error}</p>
             </div>
          </div>
        )}

        {/* Success State */}
        {transcriptionState.text && (
          <ResultDisplay text={transcriptionState.text} />
        )}
      </main>
    </div>
  );
};

export default App;