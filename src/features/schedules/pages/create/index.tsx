import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { DashboardPageContent } from '@/features/dashboard/components/DashboardPageContent';
import { useCreateSchedule } from '@/features/schedules/hooks/useCreateSchedule';
import { useScheduleForm } from '@/features/schedules/hooks/useScheduleForm';
import {
    CreateScheduleForm,
    FormContent,
    FormSection,
} from '@/features/schedules/pages/create/index.style';
import Button from '@/shared/components/Button';
import Date from '@/shared/components/Date';
import H from '@/shared/components/H';
import Number from '@/shared/components/Number';
import Select from '@/shared/components/Select';
import Text from '@/shared/components/Text';
import { editSchedule } from '@/shared/constants/routes';
import { weekDays } from '@/shared/constants/time';
import { capitalize } from '@/shared/utils/string';

const CreateSchedulePage = () => {
    const navigate = useNavigate();
    const onSuccess = () => {
        navigate(editSchedule(String(binders.name.value)));
    };

    const { t } = useTranslation('schedules');
    const { post, isPending, errors } = useCreateSchedule({ onSuccess });
    const { binders, submit, isErrored } = useScheduleForm({ errors, post });

    return (
        <DashboardPageContent title={t('Details')}>
            <CreateScheduleForm loading={isPending}>
                <FormContent>
                    <FormSection>
                        <H level={3}>{t('Basic')}</H>

                        <Text label={t('Name')} {...binders.name} />

                        <Date
                            label={t('School year start date')}
                            {...binders.schoolYearStart}
                        />

                        <Date
                            label={t('School year end date')}
                            {...binders.schoolYearEnd}
                        />
                    </FormSection>

                    <FormSection>
                        <H level={3}>{t('Advanced')}</H>

                        <Number
                            label={t('School hour')}
                            {...binders.schoolHour}
                        />

                        <Select
                            label={t('School days')}
                            isMulti
                            options={weekDays.map((day) => ({
                                label: t(capitalize(day)),
                                value: day,
                            }))}
                            {...binders.schoolDays}
                        />
                    </FormSection>
                </FormContent>

                <Button
                    label={t('Create')}
                    onClick={submit}
                    disabled={isPending || isErrored}
                />
            </CreateScheduleForm>
        </DashboardPageContent>
    );
};

export default CreateSchedulePage;
