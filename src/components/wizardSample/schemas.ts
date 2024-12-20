import * as z from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
});

export const addressSchema = z.object({
  street: z.string().min(5, 'Street must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  zipCode: z.string().regex(/^\d{5}$/, 'Invalid zip code'),
});

export const imageUploadSchema = z.object({
  images: z.array(z.instanceof(File)).min(1, 'Please upload at least one image'),
});

export const wizardSchema = z.object({
  firstName: personalInfoSchema.shape.firstName,
  lastName: personalInfoSchema.shape.lastName,
  email: personalInfoSchema.shape.email,
  street: addressSchema.shape.street,
  city: addressSchema.shape.city,
  zipCode: addressSchema.shape.zipCode,
  images: imageUploadSchema.shape.images,
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type AddressData = z.infer<typeof addressSchema>;
export type ImageUploadData = z.infer<typeof imageUploadSchema>;

