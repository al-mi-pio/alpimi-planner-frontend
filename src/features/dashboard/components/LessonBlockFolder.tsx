import { ComponentPropsWithRef, use, useRef } from 'react';

import { LessonBlockProps } from '@/features/dashboard/components/LessonBlock';
import { OpenFoldersContext } from '@/features/dashboard/contexts';
import {
    Folder,
    StyledLessonBlock,
} from '@/features/dashboard/styles/LessonBlockFolder.style';

export interface LessonBlockFolderProps
    extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    lessonBlockProps: LessonBlockProps[];
}

/**
 * Lesson block folder component
 */
export const LessonBlockFolder = ({
    lessonBlockProps,
    ...defaultProps
}: LessonBlockFolderProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = use(OpenFoldersContext);
    const weekDayIndex = ref.current?.parentElement?.id
        ? ref.current?.parentElement?.id.split('-')[1]
        : 'error';

    const handleClick = () => {
        setOpen((prev) =>
            Object.fromEntries(
                Object.keys(prev).map((key) => [
                    key,
                    key === weekDayIndex && !prev[weekDayIndex],
                ])
            )
        );
    };

    return (
        <Folder
            {...defaultProps}
            $open={open[weekDayIndex]}
            onClick={handleClick}
            className="lesson-block-folder"
            ref={ref}
        >
            {lessonBlockProps.map((props, i) => (
                <StyledLessonBlock
                    {...props}
                    $id={!open[weekDayIndex] && i}
                    key={props.data.id}
                    draggable={open[weekDayIndex]}
                />
            ))}
        </Folder>
    );
};
