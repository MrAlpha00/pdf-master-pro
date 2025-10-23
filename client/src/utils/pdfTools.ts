import { PDFTool } from '../types';

export const pdfTools: PDFTool[] = [
  {
    id: 'camera-capture',
    title: 'Capture & Convert',
    description: 'Take photos and convert to PDF',
    icon: 'camera',
    category: 'organize',
    route: 'CameraCapture'
  },
  {
    id: 'image-to-pdf',
    title: 'Images to PDF',
    description: 'Upload images and create PDF',
    icon: 'image',
    category: 'convert-to',
    route: 'ImageToPDF'
  },
  {
    id: 'merge-pdf',
    title: 'Merge PDFs',
    description: 'Combine multiple PDFs into one',
    icon: 'merge-type',
    category: 'organize',
    route: 'MergePDF'
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    description: 'Extract pages from PDF',
    icon: 'call-split',
    category: 'organize',
    route: 'SplitPDF'
  },
  {
    id: 'rotate-pdf',
    title: 'Rotate PDF',
    description: 'Rotate pages in PDF',
    icon: 'rotate-right',
    category: 'edit',
    route: 'RotatePDF'
  },
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    description: 'Reduce PDF file size',
    icon: 'compress',
    category: 'organize',
    route: 'CompressPDF'
  },
  {
    id: 'protect-pdf',
    title: 'Protect PDF',
    description: 'Add password to PDF',
    icon: 'lock',
    category: 'security',
    route: 'ProtectPDF'
  },
  {
    id: 'unlock-pdf',
    title: 'Unlock PDF',
    description: 'Remove password from PDF',
    icon: 'lock-open',
    category: 'security',
    route: 'UnlockPDF'
  },
  {
    id: 'watermark-pdf',
    title: 'Add Watermark',
    description: 'Add text watermark to PDF',
    icon: 'water-drop',
    category: 'edit',
    route: 'WatermarkPDF'
  },
  {
    id: 'page-numbers-pdf',
    title: 'Add Page Numbers',
    description: 'Number pages in PDF',
    icon: 'format-list-numbered',
    category: 'edit',
    route: 'PageNumbersPDF'
  },
  {
    id: 'pdf-to-image',
    title: 'PDF to Images',
    description: 'Convert PDF pages to images',
    icon: 'image-multiple',
    category: 'convert-from',
    route: 'PDFToImage'
  },
  {
    id: 'sign-pdf',
    title: 'Sign PDF',
    description: 'Add signature to PDF',
    icon: 'draw',
    category: 'security',
    route: 'SignaturePDF'
  }
];

export const getToolsByCategory = (category: string) => {
  return pdfTools.filter(tool => tool.category === category);
};

export const getAllCategories = () => {
  const categories = [
    { id: 'organize', title: 'Organize PDF', icon: 'file-document-multiple' },
    { id: 'convert-to', title: 'Convert to PDF', icon: 'file-pdf-box' },
    { id: 'convert-from', title: 'Convert from PDF', icon: 'file-export' },
    { id: 'edit', title: 'Edit PDF', icon: 'pencil' },
    { id: 'security', title: 'PDF Security', icon: 'shield-check' },
    { id: 'advanced', title: 'Advanced', icon: 'cog' }
  ];
  return categories;
};
