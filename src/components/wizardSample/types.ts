import { z } from 'zod';
import { wizardSchema } from './schemas';

export type WizardData = z.infer<typeof wizardSchema>; 