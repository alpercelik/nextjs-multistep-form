'use client'

import { MultiStepForm } from '@/components/wizardSample/multiStepForm';

export default function WizardPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Multi-Step Form Wizard</h1>
      <MultiStepForm />
    </main>
  );
}

