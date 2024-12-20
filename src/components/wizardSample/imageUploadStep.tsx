'use client'

import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { WizardData } from './types';
import { WizardStepConfig } from '@/components/wizard/types';

interface ImageUploadStepProps {
    form: UseFormReturn<WizardData>;
}

export const imageUploadStepConfig: WizardStepConfig<WizardData> = {
    title: 'Image Upload',
    fields: ['images'],
    defaultValues: {
        images: []
    }
};

export function ImageUploadStep({ form }: ImageUploadStepProps) {
    const { setValue, watch, formState: { errors } } = form;
    const images = watch('images') || [];

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setValue('images', [...images, ...acceptedFiles], { shouldValidate: true });
    }, [setValue, images]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setValue('images', newImages, { shouldValidate: true });
    };

    return (
        <div className="space-y-4">
            <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div>
            {errors.images && (
                <p className="text-destructive text-sm mt-1">{errors.images.message}</p>
            )}
            <div className="grid grid-cols-3 gap-4">
                {images.map((file: File, index: number) => (
                    <div key={index} className="relative">
                        <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded-lg" />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1"
                            onClick={() => removeImage(index)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

