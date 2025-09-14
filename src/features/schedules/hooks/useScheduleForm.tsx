import { UseMutateFunction } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ErrorsState } from '@/api/types';
import { CreateScheduleDTO } from '@/api/types/ScheduleService';
import { getDefaultScheduleForm } from '@/features/schedules/constants';
import { ScheduleForm } from '@/features/schedules/types';
import { scheduleFormToDTO } from '@/features/schedules/utils';

export interface useScheduleFormProps {
    errors: ErrorsState<CreateScheduleDTO>;
    post: UseMutateFunction<unknown, unknown, CreateScheduleDTO>;
}

export type ScheduleFormBinders = Record<keyof ScheduleForm, FieldBinder>;

interface FieldBinder {
    error?: string;
    value: string | string[] | number;
    onChange?: (...args: unknown[]) => void;
}

export const useScheduleForm = ({ errors, post }: useScheduleFormProps) => {
    const { t } = useTranslation('schedules');
    const [form, setForm] = useState<ScheduleForm>(getDefaultScheduleForm(t));
    const [filteredErrors, setFilteredErrors] = useState<
        ErrorsState<CreateScheduleDTO>
    >({});

    const binders = Object.entries(form).reduce(
        (prev, [field, value]) => ({
            ...prev,
            [field]: {
                error: filteredErrors[field as keyof CreateScheduleDTO],
                value,
                onChange: (e) => {
                    const newValue = (e as ChangeEvent<HTMLInputElement>).target
                        ? (e as ChangeEvent<HTMLInputElement>).target.value
                        : e;

                    setForm((prevForm) => ({
                        ...prevForm,
                        [field]: newValue,
                    }));
                    setFilteredErrors((prev) => {
                        const {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            [field as keyof CreateScheduleDTO]: _,
                            ...newErrors
                        } = prev;
                        return newErrors;
                    });
                },
            } as FieldBinder,
        }),
        {} as ScheduleFormBinders
    );

    const submit = () => {
        post(scheduleFormToDTO(form));
    };

    useEffect(() => {
        setFilteredErrors(errors);
    }, [errors]);

    return { binders, submit, isErrored: !!Object.keys(filteredErrors).length };
};
