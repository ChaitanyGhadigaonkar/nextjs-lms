"use client";
import { uploadFileMutation } from "@/actions/uploadFileAction";
import { Download } from "lucide-react";
import { useRef, useState } from "react";

interface FileUploadError {
  message: string;
}

interface ImageUploadProps {
  accept: string;
  onFileUpload: () => void;
}

const UploadFile = ({ accept, onFileUpload }: ImageUploadProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDragEnter = () => wrapperRef.current?.classList.add("opacity-60");

  const onDragLeave = () => wrapperRef.current?.classList.remove("opacity-60");

  const onDrop = () => wrapperRef.current?.classList.remove("opacity-60");

  return (
    <div
      className="w-full h-40 border-dashed border-blue-400 border-2 rounded-md flex justify-center items-center my-4 px-6 md:px2 mx-auto relative hover:opacity-60 transition-all duration-150 "
      ref={wrapperRef}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {!isUploading ? (
        <div className="flex flex-col items-center flex-1 gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10">
            <Download className="w-full h-full" />
          </div>
          <h3 className="text-normal">
            <span className="font-semibold">Choose a file </span>
            or drag it here
          </h3>
        </div>
      ) : (
        <div>uploading...</div>
      )}
      <input
        type="file"
        name="file"
        id="image-upload"
        className="opacity-0 cursor-pointer absolute inset-0"
        accept={accept}
        disabled={isUploading}
        onChange={async (e) => {
          const files = e.target.files;
          const formData = new FormData();

          if (files) {
            setIsUploading(true);
            for (let i = 0; i < files.length; i++) {
              const file = files[i];

              var imageType = new RegExp(accept);
              if (file.type.match(imageType)) {
                formData.append("file", files[i]);
              }
            }
            const data = await uploadFileMutation(formData);
            onFileUpload();
            setIsUploading(false);
          } else {
          }
        }}
      />
    </div>
  );
};

export default UploadFile;
