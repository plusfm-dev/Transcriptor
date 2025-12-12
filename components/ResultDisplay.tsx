import React from 'react';

interface ResultDisplayProps {
  text: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ text }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('DADOS COPIADOS!');
  };

  const downloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "CN7_TRANSCRICAO.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-cyber-dark border border-slate-800 border-l-4 border-l-cyber-yellow mt-8 animate-fade-in relative overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: 'linear-gradient(to right, #facc15 1px, transparent 1px), linear-gradient(to bottom, #facc15 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      <div className="bg-cyber-gray/50 px-6 py-4 border-b border-slate-800 flex justify-between items-center flex-wrap gap-4 relative z-10">
        <h3 className="text-lg font-display font-bold text-cyber-yellow flex items-center gap-2 uppercase tracking-wide">
          <span className="w-2 h-2 bg-cyber-yellow animate-pulse"></span>
          TRANSCRIÇÃO COMPLETA
        </h3>
        <div className="flex gap-3">
          <button 
            onClick={copyToClipboard}
            className="text-sm font-bold font-mono text-black bg-cyber-yellow hover:bg-yellow-300 px-6 py-3 transition-all uppercase shadow-md flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            COPIAR
          </button>
          <button 
            onClick={downloadTxt}
            className="text-sm font-bold font-mono text-black bg-cyber-yellow hover:bg-yellow-300 px-6 py-3 transition-all uppercase shadow-md flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            BAIXAR
          </button>
        </div>
      </div>
      <div className="p-8 overflow-auto max-h-[600px] bg-white relative z-10">
        <pre className="whitespace-pre-wrap font-mono text-black text-sm md:text-base leading-relaxed border-l-4 border-cyber-yellow pl-6">
          {text}
        </pre>
      </div>
    </div>
  );
};

export default ResultDisplay;