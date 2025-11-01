import { type ComponentPropsWithRef, Fragment } from 'react';

import {
    Circle,
    Label,
    Line,
    ProgressBar,
    Step,
} from '@/shared/components/MultiStep/MultiStep.style';

export interface MultiStepProps extends ComponentPropsWithRef<'div'> {
    /**
     * The current step index starting at 0
     */
    currentStep?: number;
    /**
     * A list of steps
     */
    steps: string[];
}

/**
 * A multistep progress bar
 */
const MultiStep = ({
    steps,
    currentStep = 0,
    ...defaultProps
}: MultiStepProps) => {
    if (steps.length < 2) return null;
    return (
        <ProgressBar {...defaultProps}>
            {steps.map((label, i) => (
                <Fragment key={i}>
                    <Line $filled={i <= currentStep} />
                    <Step>
                        <Circle $filled={i <= currentStep}>
                            {i + 1}
                            <Label>{label}</Label>
                        </Circle>
                    </Step>
                    <Line $filled={i <= currentStep} />
                </Fragment>
            ))}
        </ProgressBar>
    );
};

export default MultiStep;
