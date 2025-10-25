import { type ComponentPropsWithRef, type DragEvent, useState } from 'react';

import {
    LessonBlock,
    type LessonBlockProps,
} from '@/features/dashboard/components/LessonBlock';
import { LessonBlockFolder } from '@/features/dashboard/components/LessonBlockFolder';
import { StyledCell } from '@/features/dashboard/styles/Timetable.style';

export interface TimetableCellProps extends ComponentPropsWithRef<'div'> {
    id: string;
    disabled?: string;
    lessonBlockProps: LessonBlockProps[];
}

/**
 * Timetable cell component
 */
export const TimetableCell = ({
    lessonBlockProps,
    disabled,
    ...props
}: TimetableCellProps) => {
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const handleDragover = (e: DragEvent<HTMLDivElement>) => {
        if (!disabled) {
            e.preventDefault();
            setIsDraggedOver(true);
        }
    };
    const handleDragleave = () => {
        if (!disabled) {
            setIsDraggedOver(false);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggedOver(false);
        const data = e.dataTransfer.getData('text/plain');
        //TODO: logic
        console.log('Block:', data, '\nCell:', props.id);
    };

    return (
        <StyledCell
            {...props}
            onDragOver={handleDragover}
            onDrop={handleDrop}
            onDragLeave={handleDragleave}
            $isDraggedOver={isDraggedOver}
            $disabled={!!disabled}
        >
            {lessonBlockProps.length === 1 && (
                <LessonBlock {...lessonBlockProps[0]} />
            )}
            {lessonBlockProps.length > 1 && (
                <LessonBlockFolder lessonBlockProps={lessonBlockProps} />
            )}
        </StyledCell>
    );
};
