import { Path, UseFormReturn, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { ComponentType } from 'react';

export interface WizardStepConfig<T extends FieldValues> {
    title: string;
    fields: Path<T>[];
    defaultValues: Partial<T>;
}

export interface WizardStep<T extends FieldValues> extends WizardStepConfig<T> {
    component: ComponentType<{ form: UseFormReturn<T> }>;
}

export interface WizardProps<T extends FieldValues> {
    steps: WizardStep<T>[];
    validationSchema: z.ZodType<T>;
    onComplete: (data: T) => void;
    defaultValues: Partial<T>;
    form: UseFormReturn<T>;
    disabled?: boolean;
    onStepChange?: (step: number) => void;
    onRestart?: () => void;
} 