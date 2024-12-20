'use client'

import React, { useState, useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { WizardProps } from './types';

export function Wizard<T extends FieldValues>({
    steps,
    onComplete,
    form,
    onStepChange,
    disabled,
    onRestart
}: WizardProps<T>) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { trigger, getValues, reset } = form;

    useEffect(() => {
        onStepChange?.(currentStep);
    }, [currentStep, onStepChange]);

    const handleNext = async () => {
        const currentStepFields = steps[currentStep].fields;
        const isValid = await trigger(currentStepFields);
        
        if (isValid) {
            if (currentStep === steps.length - 1) {
                const data = getValues();
                try {
                    await onComplete(data);
                    setIsSubmitted(true);
                } catch (error) {
                    console.error('Form submission failed:', error);
                }
            } else {
                setCurrentStep(prev => prev + 1);
            }
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleRestart = () => {
        setIsSubmitted(false);
        setCurrentStep(0);
        reset();
        onRestart?.();
    };

    if (isSubmitted) {
        return (
            <div className="text-center space-y-4 py-8">
                <div className="mb-6">
                    <svg
                        className="mx-auto h-12 w-12 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Submission Successful!
                </h2>
                <p className="text-gray-500">
                    Thank you for completing the form.
                </p>
                <div className="mt-6">
                    <Button onClick={handleRestart}>
                        Start New Form
                    </Button>
                </div>
            </div>
        );
    }

    const CurrentStepComponent = steps[currentStep].component;

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
            <CurrentStepComponent form={form} />
            <div className="mt-4 flex justify-between">
                {currentStep > 0 && (
                    <Button 
                        type="button" 
                        onClick={handleBack} 
                        variant="outline"
                        disabled={disabled}
                    >
                        Previous
                    </Button>
                )}
                <Button 
                    type="button" 
                    onClick={handleNext}
                    disabled={disabled}
                    className={currentStep === 0 ? "ml-auto" : ""}
                >
                    {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                </Button>
            </div>
        </form>
    );
}

