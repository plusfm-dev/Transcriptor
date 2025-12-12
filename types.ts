export interface TranscriptionState {
  isLoading: boolean;
  error: string | null;
  text: string | null;
}

export enum MediaType {
  AUDIO = 'audio',
  VIDEO = 'video',
}

export interface FileData {
  file: File;
  previewUrl: string;
  type: MediaType;
}