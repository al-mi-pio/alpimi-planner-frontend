import {
    type ComponentPropsWithRef,
    type Dispatch,
    type DragEvent,
    type SetStateAction,
    useRef,
    useState,
} from 'react';

import { type Id } from '@/api/types';
import type { LessonBlock as LessonBlockType } from '@/api/types/LessonBlockService';
import {
    LessonBlock,
    type LessonBlockProps,
} from '@/features/dashboard/components/LessonBlock';
import { LessonBlockFolder } from '@/features/dashboard/components/LessonBlockFolder';
import { StyledCell } from '@/features/dashboard/styles/Timetable.style';
import type { DroppedLesson } from '@/features/dashboard/types';

export interface TimetableCellProps extends ComponentPropsWithRef<'div'> {
    id: string;
    disabled?: string;
    lessonBlockProps: LessonBlockProps[];
    setDroppedLesson: Dispatch<SetStateAction<DroppedLesson | undefined>>;
}

/**
 * Timetable cell component
 */
export const TimetableCell = ({
    lessonBlockProps,
    setDroppedLesson,
    disabled,
    ...props
}: TimetableCellProps) => {
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
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
        const {
            id,
            lessonStart: lessonBlockLessonStart,
            lessonEnd,
            lessonId,
            clusterId,
        } = JSON.parse(
            e.dataTransfer.getData('text/plain')
        ) as LessonBlockType & { lessonId?: Id };

        const [lessonStart, weekDay] = props.id
            .split('-')
            .slice(0, -1)
            .map(Number);

        if (!ref.current?.querySelector(`[id="${id}"]`)) {
            setDroppedLesson(
                lessonId
                    ? {
                          lessonId,
                          weekDay,
                          lessonStart,
                          lessonEnd: lessonStart,
                      }
                    : {
                          id,
                          clusterId,
                          weekDay,
                          lessonStart,
                          lessonEnd:
                              lessonStart + lessonEnd - lessonBlockLessonStart,
                      }
            );
        }
    };

    return (
        <StyledCell
            {...props}
            ref={ref}
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
