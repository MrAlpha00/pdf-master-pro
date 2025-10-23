export interface PDFFile {
  id: string;
  name: string;
  uri: string;
  size: number;
  type: string;
  createdAt: Date;
}

export interface RecentFile extends PDFFile {
  operation: string;
}

export interface PDFTool {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  route: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  Tools: undefined;
  Recent: undefined;
  Settings: undefined;
  CameraCapture: undefined;
  ImageToPDF: undefined;
  MergePDF: undefined;
  SplitPDF: undefined;
  RotatePDF: undefined;
  CompressPDF: undefined;
  ProtectPDF: undefined;
  UnlockPDF: undefined;
  WatermarkPDF: undefined;
  PageNumbersPDF: undefined;
  PDFToImage: undefined;
  SignaturePDF: undefined;
};

export type ToolCategory = 'organize' | 'convert-to' | 'convert-from' | 'edit' | 'security' | 'advanced';
