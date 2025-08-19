/**
 * 파일 업로드 컴퍼넌트. children을 필수로 받아 이 ui를 보여주며 input file을 숨겨 클릭하면 Input file이 클릭되게 해주는 컴퍼넌트
 * @param {children} : input file 대신 실제로 보여질 ui
 * @param {onChange} : input file 선택시 이벤트
 * @param {accept} : input file에서 선택될 파일 형식 string[]
 */

'use client';

import React, { useRef } from 'react';

interface FileUploadProps {
  children: React.ReactNode;
  onChange: (file: File) => void;
  accept?: string | undefined;
}

const FileUpload: React.FC<FileUploadProps> = ({
  children,
  onChange,
  accept,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      onChange(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className='relative'>
      <div
        onClick={handleClick}
        className='cursor-pointer'>
        {children}
      </div>
      <input
        type='file'
        accept={accept}
        ref={fileInputRef}
        className='absolute top-0 left-0 h-0 w-0 opacity-0'
        onChange={handleChange}
      />
    </div>
  );
};

export default FileUpload;
