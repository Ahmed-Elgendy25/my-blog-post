"use client";

import type React from "react";

import { useCallback, useState, useEffect } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ThumbnailUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export function ThumbnailUpload({
  value,
  onChange,
  error,
}: ThumbnailUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileInfo, setFileInfo] = useState<{
    size: string;
    name: string;
  } | null>(null);

  // Update preview when value changes
  useEffect(() => {
    if (value) {
      const sizeInMB = (value.size / (1024 * 1024)).toFixed(2);
      setFileInfo({ size: `${sizeInMB} MB`, name: value.name });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(value);
    } else {
      setPreview(null);
      setFileInfo(null);
    }
  }, [value]);

  const handleFile = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        onChange(file);
      }
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleRemove = useCallback(() => {
    onChange(null);
    setPreview(null);
    setFileInfo(null);
  }, [onChange]);

  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Thumbnail Image</Label>

      {preview ? (
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-lg border bg-muted h-64 sm:h-80 lg:h-96">
            <Image
              src={preview}
              alt="Thumbnail preview"
              fill
              className="object-cover"
              unoptimized
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 shadow-lg z-10"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {fileInfo && (
            <div className="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-sm">
              <span className="truncate font-medium text-foreground">
                {fileInfo.name}
              </span>
              <span className="ml-2 text-muted-foreground">
                {fileInfo.size}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative flex h-64 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed transition-colors sm:h-80 lg:h-96 ${
            isDragging
              ? "border-primary bg-primary/5"
              : error
                ? "border-destructive bg-destructive/5"
                : "border-muted-foreground/25 bg-muted/50 hover:border-primary hover:bg-primary/5"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            {isDragging ? (
              <Upload className="h-8 w-8 text-primary" />
            ) : (
              <ImageIcon className="h-8 w-8 text-primary" />
            )}
          </div>
          <div className="text-center">
            <p className="text-base font-medium">
              {isDragging
                ? "Drop image here"
                : "Click to upload or drag and drop"}
            </p>
            <p className="text-sm text-muted-foreground">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
