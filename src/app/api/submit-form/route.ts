import { NextResponse } from 'next/server';
import type { WizardData } from '@/components/wizardSample/types';

export async function POST(request: Request) {
    try {
        const data: WizardData = await request.json();
        
        console.log('API received form data:', data);
        // Here you can add database operations, API calls, etc.
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to process form data' },
            { status: 500 }
        );
    }
} 