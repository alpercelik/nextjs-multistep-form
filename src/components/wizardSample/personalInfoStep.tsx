'use client'

import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WizardData } from './types';
import { WizardStepConfig } from '@/components/wizard/types';

interface PersonalInfoStepProps {
    form: UseFormReturn<WizardData>;
}

export const personalInfoStepConfig: WizardStepConfig<WizardData> = {
    title: 'Personal Information',
    fields: ['firstName', 'lastName', 'email'],
    defaultValues: {
        firstName: '',
        lastName: '',
        email: ''
    }
};

export function PersonalInfoStep({ form }: PersonalInfoStepProps) {
    const {
        register,
        formState: { errors }
    } = form;

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                    id="firstName" 
                    {...register('firstName')}
                    aria-invalid={!!errors.firstName}
                />
                {errors.firstName && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.firstName.message as string}
                    </p>
                )}
            </div>
            <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                    id="lastName" 
                    {...register('lastName')}
                    aria-invalid={!!errors.lastName}
                />
                {errors.lastName && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.lastName.message as string}
                    </p>
                )}
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email" 
                    type="email" 
                    {...register('email')}
                    aria-invalid={!!errors.email}
                />
                {errors.email && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.email.message as string}
                    </p>
                )}
            </div>
        </div>
    );
}

