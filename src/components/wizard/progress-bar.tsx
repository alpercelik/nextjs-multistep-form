import { Progress } from "@/components/ui/progress"
import { Check } from "lucide-react"

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    labels?: string[];
    isCompleted?: boolean;
}

export function ProgressBar({ currentStep, totalSteps, labels, isCompleted = false }: ProgressBarProps) {
    const progress = isCompleted ? 100 : (currentStep / (totalSteps - 1)) * 100;
    
    return (
        <div className="mb-8 space-y-4">
            <div className="relative">
                <Progress value={progress} className="h-2" />
                
                {/* Step indicators */}
                <div className="absolute top-0 left-0 w-full flex justify-between -mt-2">
                    {Array.from({ length: totalSteps }).map((_, index) => (
                        <div
                            key={index}
                            className={`w-6 h-6 rounded-full border-2 bg-background flex items-center justify-center text-xs
                                ${(index <= currentStep || isCompleted)
                                    ? 'border-primary text-primary font-medium' 
                                    : 'border-muted-foreground text-muted-foreground'
                                }`}
                        >
                            {(index < currentStep || (index === currentStep && isCompleted)) ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                index + 1
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Step labels */}
            {labels && (
                <div className="flex justify-between px-2">
                    {labels.map((label, index) => (
                        <span
                            key={index}
                            className={`text-sm ${
                                (index <= currentStep || isCompleted)
                                    ? 'text-primary font-medium' 
                                    : 'text-muted-foreground'
                            }`}
                        >
                            {label}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
} 