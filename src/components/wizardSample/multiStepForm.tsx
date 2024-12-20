'use client'

import { Wizard } from '@/components/wizard';
import { PersonalInfoStep, personalInfoStepConfig } from './personalInfoStep';
import { AddressStep, addressStepConfig } from './addressStep';
import { ImageUploadStep, imageUploadStepConfig } from './imageUploadStep';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WizardData } from './types';
import { wizardSchema } from './schemas';
import { deepMerge } from '@/lib/utils';
import { useState } from 'react';
import { ProgressBar } from '@/components/wizard/progress-bar';

const steps = [
    {
        ...personalInfoStepConfig,
        component: PersonalInfoStep,
    },
    {
        ...addressStepConfig,
        component: AddressStep,
    },
    {
        ...imageUploadStepConfig,
        component: ImageUploadStep,
    },
];

const stepLabels = ['Personal Info', 'Address', 'Image Upload'];

// Merge all default values from each step
const defaultValues = steps.reduce((acc, step) => deepMerge(acc, step.defaultValues), {});

export function MultiStepForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    
    const form = useForm<WizardData>({
        resolver: zodResolver(wizardSchema),
        defaultValues,
        mode: 'onChange',
        criteriaMode: 'all',
    });

    const handleComplete = async (data: WizardData) => {
        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            const result = await response.json();
            setIsCompleted(true);
            return result;
        } catch (error) {
            console.error('Failed to submit form:', error);
            // Handle error without toast
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRestart = () => {
        setIsCompleted(false);
        form.reset(defaultValues);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 px-4">
            <ProgressBar 
                currentStep={currentStep}
                totalSteps={steps.length}
                labels={stepLabels}
                isCompleted={isCompleted}
            />
            
            <div className="bg-white rounded-lg shadow-lg p-6">
                <Wizard<WizardData>
                    steps={steps}
                    validationSchema={wizardSchema}
                    onComplete={handleComplete}
                    defaultValues={defaultValues}
                    form={form}
                    disabled={isSubmitting}
                    onStepChange={setCurrentStep}
                    onRestart={handleRestart}
                />
            </div>
        </div>
    );
}

