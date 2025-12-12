import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION_PROMPT } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToInlineData = async (file: File): Promise<{ mimeType: string; data: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g., "data:audio/mp3;base64,")
      const base64Data = base64String.split(',')[1];
      resolve({
        mimeType: file.type,
        data: base64Data,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const transcribeMediaFile = async (file: File): Promise<string> => {
  try {
    const inlineData = await fileToInlineData(file);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_PROMPT,
        temperature: 0.2, // Lower temperature for more accurate transcription
      },
      contents: {
        parts: [
          { inlineData: inlineData },
          { text: "Por favor, transcreva este arquivo seguindo rigorosamente as instruções de formatação fornecidas." }
        ]
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Não foi possível gerar a transcrição. A resposta veio vazia.");
    }
    return text;

  } catch (error) {
    console.error("Gemini Transcription Error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Ocorreu um erro desconhecido durante a transcrição."
    );
  }
};