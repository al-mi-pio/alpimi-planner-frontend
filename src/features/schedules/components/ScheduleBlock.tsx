import { ComponentPropsWithRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Block } from '@/features/schedules/styles/ScheduleBlock.style';
import H from '@/shared/components/H';
import P from '@/shared/components/P';
import { createSchedule, editSchedule } from '@/shared/constants/routes';
import Plus from '@/shared/icons/Plus';
import { dateDifference } from '@/shared/utils/date';

export interface ScheduleBlockProps
    extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
    name?: string;
    modifyDate?: string;
}

/**
 * A UI component shortly describing the schedule
 */
export const ScheduleBlock = ({
    name,
    modifyDate,
    ...defaultProps
}: ScheduleBlockProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation('schedules');

    if (name)
        return (
            <Block
                onClick={() => navigate(editSchedule(name))}
                {...defaultProps}
            >
                <H level={4} bold>
                    {name}
                </H>
                {modifyDate && (
                    <P>
                        {t('Modified: {{time}} ago', {
                            time: dateDifference(modifyDate),
                        })}
                    </P>
                )}
            </Block>
        );
    return (
        <Block
            onClick={() => navigate(createSchedule)}
            aria-label={t('Create a new schedule')}
            {...defaultProps}
        >
            <Plus />
        </Block>
    );
};
