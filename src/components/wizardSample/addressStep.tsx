'use client'

import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WizardData } from './types';
import { WizardStepConfig } from '@/components/wizard/types';

interface AddressStepProps {
    form: UseFormReturn<WizardData>;
}

export const addressStepConfig: WizardStepConfig<WizardData> = {
    title: 'Address',
    fields: ['street', 'city', 'zipCode'],
    defaultValues: {
        street: '',
        city: '',
        zipCode: ''
    }
};

export function AddressStep({ form }: AddressStepProps) {
    const {
        register,
        formState: { errors }
    } = form;

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="street">Street</Label>
                <Input 
                    id="street" 
                    {...register('street')}
                    aria-invalid={!!errors.street}
                />
                {errors.street && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.street.message as string}
                    </p>
                )}
            </div>
            <div>
                <Label htmlFor="city">City</Label>
                <Input 
                    id="city" 
                    {...register('city')}
                    aria-invalid={!!errors.city}
                />
                {errors.city && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.city.message as string}
                    </p>
                )}
            </div>
            <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input 
                    id="zipCode" 
                    {...register('zipCode')}
                    aria-invalid={!!errors.zipCode}
                />
                {errors.zipCode && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.zipCode.message as string}
                    </p>
                )}
            </div>
        </div>
    );
}

