import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getTeacherName } from '@/api/services/teacherService';
import type { GetResponse, Id } from '@/api/types';
import type { ScheduleSettings } from '@/api/types/ScheduleSettingsService';
import type { Teacher } from '@/api/types/TeacherService';
import { LessonBlockModal } from '@/features/dashboard/components/LessonBlockModal';
import { MAP_ENTITY_METHOD } from '@/features/dashboard/constants';
import { usePropertiesWindow } from '@/features/dashboard/hooks/usePropertiesWindow';
import { CenterMessageWrapper } from '@/features/dashboard/styles/CollisionsTable.style';
import {
    Bold,
    Heading,
    StyledProperties,
} from '@/features/dashboard/styles/Properties.style';
import { StyledLoading } from '@/features/dashboard/styles/Timetable.style';
import Button from '@/shared/components/Button';
import H from '@/shared/components/H';
import P from '@/shared/components/P';
import { useGetData } from '@/shared/hooks/useGetData';
import Pencil from '@/shared/icons/Pencil';
import Trash from '@/shared/icons/Trash';

export const Properties = ({
    scheduleId,
    scheduleSettings,
}: {
    scheduleId?: Id;
    scheduleSettings: ScheduleSettings;
}) => {
    const { selectedEntity } = usePropertiesWindow();
    const { t } = useTranslation('fields');
    const [modalType, setModalType] = useState<'edit' | 'delete'>();
    const { data, isLoading } = useGetData({
        queryKey: [selectedEntity?.entity, selectedEntity?.id],
        queryFn: selectedEntity
            ? MAP_ENTITY_METHOD[selectedEntity.entity](selectedEntity.id)
            : () => ({}) as Promise<GetResponse<Teacher>>,
        select: (data) => data.content,
        enabled: !!selectedEntity,
    });

    if (!selectedEntity)
        return (
            <CenterMessageWrapper>
                <P>
                    {t("Select anything to show it's properties here", {
                        ns: 'dashboard',
                    })}
                </P>
            </CenterMessageWrapper>
        );

    if (isLoading) return <StyledLoading />;
    if (!data) return null;

    const FIELD_LOCALES: Record<string, string> = {
        currentHours: t('Current hours'),
        amountOfHours: t('Amount of hours'),
        subgroups: t('Subgroups'),
        lessonType: t('Lesson type'),
        teacher: t('Teacher'),
        studentCount: t('Student count'),
        lessons: t('Lessons'),
        group: t('Group'),
        lessonDate: t('Lesson date'),
        lessonStart: t('Lesson start'),
        lessonEnd: t('Lesson end'),
        lesson: t('Lesson'),
        classroom: t('Classroom'),
        email: t('Email'),
        capacity: t('Capacity'),
        classroomTypes: t('Classroom types'),
    };

    return (
        <StyledProperties>
            <Heading>
                <H level={4}>
                    {'name' in data
                        ? 'surname' in data
                            ? getTeacherName(data)
                            : data.name
                        : t('Lesson block', { ns: 'dashboard' })}
                </H>
            </Heading>

            {Object.entries(data).map(
                ([name, value]) =>
                    !['id', 'name', 'surname', 'clusterId'].includes(name) && (
                        <P key={name}>
                            {`${FIELD_LOCALES[name]}: `}
                            <Bold>
                                {!value && value !== 0
                                    ? t('None', { ns: 'dashboard' })
                                    : Array.isArray(value)
                                      ? !value.length
                                          ? t('None', { ns: 'dashboard' })
                                          : value.map((v) => v.name).join()
                                      : typeof value === 'object'
                                        ? 'surname' in value
                                            ? getTeacherName(value)
                                            : value.name
                                        : name === 'lessonStart' ||
                                            name === 'lessonEnd'
                                          ? String(value + 1)
                                          : String(value)}
                            </Bold>
                        </P>
                    )
            )}
            {!('name' in data) && (
                <div>
                    <Button
                        icon={<Trash />}
                        onClick={() => setModalType('delete')}
                    />
                    <Button
                        icon={<Pencil />}
                        onClick={() => setModalType('edit')}
                    />
                    <LessonBlockModal
                        modalType={modalType}
                        scheduleId={scheduleId}
                        scheduleSettings={scheduleSettings}
                        onClose={() => setModalType(undefined)}
                        data={data}
                    />
                </div>
            )}
        </StyledProperties>
    );
};
