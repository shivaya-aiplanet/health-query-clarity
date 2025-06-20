
import React, { useCallback, useState } from 'react';
import { File, X, AlertCircle } from 'lucide-react';

interface DocumentUploadProps {
  onFileUpload: (file: File | null) => void;
  uploadedFile: File | null;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onFileUpload, uploadedFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (file.type !== 'application/pdf') {
      return 'Only PDF files are supported';
    }
    if (file.size > 100 * 1024 * 1024) {
      return 'File size must be less than 100MB';
    }
    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onFileUpload(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const removeFile = () => {
    onFileUpload(null);
    setError(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!uploadedFile && (
        <div
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
            isDragOver
              ? 'border-[#10B981] bg-emerald-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <p className="text-lg font-medium text-[#111827] mb-2">
                Drag and drop your medical document (PDF) here (optional)
              </p>
              <button className="text-[#10B981] font-medium hover:underline">
                Browse Files
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Size and Type Limit */}
      <div className="text-center text-sm text-[#6B7280]">
        Limit 100MB per file • Supported format: PDF
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Uploaded File Display */}
      {uploadedFile && (
        <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#10B981] rounded-lg">
              <File className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-[#111827]">{uploadedFile.name}</p>
              <p className="text-sm text-[#6B7280]">{formatFileSize(uploadedFile.size)}</p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
