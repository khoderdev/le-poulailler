import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiX, FiImage } from "react-icons/fi";

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageChange: (file: File | null) => void;
  onImageRemove?: () => void;
  disabled?: boolean;
}

const ImageUpload = ({ currentImageUrl, onImageChange, onImageRemove, disabled = false }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when currentImageUrl changes
  useEffect(() => {
    if (currentImageUrl) {
      setPreview(currentImageUrl);
      setImageLoading(true);
      setImageError(false);
    }
  }, [currentImageUrl]);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (!file) {
        setPreview(null);
        onImageChange(null);
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setImageLoading(true);
        setImageError(false);
      };
      reader.readAsDataURL(file);

      onImageChange(file);
    },
    [onImageChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files?.[0] || null;
    handleFileChange(file);
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageChange(null);
    if (onImageRemove) {
      onImageRemove();
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" disabled={disabled} />

      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div key="preview" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative group">
            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
              {imageLoading && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="w-8 h-8 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              )}
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center text-gray-500">
                    <FiImage className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Failed to load image</p>
                  </div>
                </div>
              )}
              <img 
                src={preview} 
                alt="Preview" 
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoading && !imageError ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                  setImageError(true);
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                <motion.button initial={{ opacity: 0, scale: 0.8 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={handleRemove} disabled={disabled} className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" type="button">
                  <FiX className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Click the X to remove image</p>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            className={`
              w-full h-48 rounded-lg border-2 border-dashed 
              ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}
              ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-blue-400 hover:bg-blue-50"}
              transition-all duration-200 flex flex-col items-center justify-center gap-3
            `}
          >
            <motion.div animate={isDragging ? { scale: 1.1 } : { scale: 1 }} className={`p-4 rounded-full ${isDragging ? "bg-blue-100" : "bg-gray-100"}`}>
              {isDragging ? <FiUpload className="w-8 h-8 text-blue-500" /> : <FiImage className="w-8 h-8 text-gray-400" />}
            </motion.div>
            <div className="text-center px-4">
              <p className="text-sm font-medium text-gray-700">{isDragging ? "Drop image here" : "Click to upload or drag and drop"}</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
