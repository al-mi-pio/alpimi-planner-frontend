import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { getTeacherName } from '@/api/services/teacherService';
import { MAP_ENTITY_METHOD } from '@/features/dashboard/constants';
import { usePropertiesWindow } from '@/features/dashboard/hooks/usePropertiesWindow';
import {
    Bold,
    Heading,
    StyledProperties,
} from '@/features/dashboard/styles/Properties.style';
import { StyledLoading } from '@/features/dashboard/styles/Timetable.style';
import P from '@/shared/components/P';

export const Properties = () => {
    const { selectedEntity } = usePropertiesWindow();
    if (!selectedEntity) return null;
    const { id, entity } = selectedEntity;
    const { t } = useTranslation('fields');

    const { data, isLoading } = useQuery({
        queryKey: [entity, id],
        queryFn: MAP_ENTITY_METHOD[entity](id),
        select: (data) => data.content,
    });

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
            <Heading level={4}>
                {'name' in data
                    ? 'surname' in data
                        ? getTeacherName(data)
                        : data.name
                    : t('Lesson block', { ns: 'dashboard' })}
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
        </StyledProperties>
    );
};
