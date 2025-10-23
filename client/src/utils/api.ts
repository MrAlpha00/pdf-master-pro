import axios from 'axios';
import { API_URL, getFileUrl } from './config';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const normalizeResponse = (data: any) => {
  if (data.url) {
    data.url = getFileUrl(data.url);
  }
  if (data.files) {
    data.files = data.files.map((f: any) => ({
      ...f,
      url: getFileUrl(f.url)
    }));
  }
  return data;
};

export const mergePDFs = async (files: any[]) => {
  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append('files', {
      uri: file.uri,
      type: 'application/pdf',
      name: file.name || `file${index}.pdf`,
    } as any);
  });

  const response = await api.post('/pdf/merge', formData);
  return normalizeResponse(response.data);
};

export const splitPDF = async (file: any, pageRanges: number[][]) => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: 'application/pdf',
    name: file.name || 'file.pdf',
  } as any);
  formData.append('pageRanges', JSON.stringify(pageRanges));

  const response = await api.post('/pdf/split', formData);
  return normalizeResponse(response.data);
};

export const rotatePDF = async (file: any, rotation: number, pages?: number[]) => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: 'application/pdf',
    name: file.name || 'file.pdf',
  } as any);
  formData.append('rotation', rotation.toString());
  if (pages) {
    formData.append('pages', JSON.stringify(pages));
  }

  const response = await api.post('/pdf/rotate', formData);
  return normalizeResponse(response.data);
};

export const compressPDF = async (file: any) => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: 'application/pdf',
    name: file.name || 'file.pdf',
  } as any);

  const response = await api.post('/pdf/compress', formData);
  return normalizeResponse(response.data);
};

export const imagesToPDF = async (images: any[]) => {
  const formData = new FormData();
  images.forEach((image, index) => {
    const fileExtension = image.uri.split('.').pop()?.toLowerCase();
    const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';
    
    formData.append('images', {
      uri: image.uri,
      type: mimeType,
      name: image.name || `image${index}.${fileExtension}`,
    } as any);
  });

  const response = await api.post('/pdf/images-to-pdf', formData);
  return normalizeResponse(response.data);
};

export const protectPDF = async (file: any, password: string) => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: 'application/pdf',
    name: file.name || 'file.pdf',
  } as any);
  formData.append('password', password);

  const response = await api.post('/pdf/protect', formData);
  return normalizeResponse(response.data);
};
