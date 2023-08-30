import React from 'react';

export interface IPdfUploaderProps {
  id: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onDelete: () => void,
  name: string,
  margin?: string,
  value: File | null,
}

export interface IPdfUploaderStyle {
  margin?: string,
  padding?: string,
}
