import type { UseMutateFunction } from '@tanstack/react-query';
import { type ChangeEvent, use, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ErrorsState } from '@/api/types';
import type { CreateLessonBlockDTO } from '@/api/types/LessonBlockService';
import { getDefaultLessonBlockForm } from '@/features/dashboard/constants/dto';
import { CurrentTimetableFiltersContext } from '@/features/dashboard/contexts';
import type { LessonBlockForm } from '@/features/dashboard/types';
import { lessonBlockFormToDTO } from '@/features/dashboard/utils/dto';

export interface useLessonBlockFormProps {
    initialData?: Partial<LessonBlockForm>;
    errors: ErrorsState<CreateLessonBlockDTO>;
}

export type LessonBlockFormBinders = Record<keyof LessonBlockForm, FieldBinder>;

interface FieldBinder {
    error?: string;
    value: string | string[] | number;
    checked?: boolean;
    onChange?: (...args: unknown[]) => void;
}

export const useLessonBlockForm = ({
    errors,
    initialData,
}: useLessonBlockFormProps) => {
    const { t } = useTranslation('fields');
    const [form, setForm] = useState<LessonBlockForm>(
        getDefaultLessonBlockForm(t)
    );
    const [filteredErrors, setFilteredErrors] = useState<
        ErrorsState<CreateLessonBlockDTO>
    >({});
    const [currentTimetableFilters] = use(CurrentTimetableFiltersContext);

    useEffect(() => {
        if (initialData)
            setForm({ ...getDefaultLessonBlockForm(t), ...initialData });
    }, [initialData]);

    const binders = Object.entries(form).reduce(
        (prev, [field, value]) => ({
            ...prev,
            [field]:
                field === 'interval'
                    ? {
                          checked: value,
                          onChange: () =>
                              setForm((prevForm) => ({
                                  ...prevForm,
                                  [field]: !prevForm[field],
                              })),
                      }
                    : ({
                          error: filteredErrors[
                              field as keyof CreateLessonBlockDTO
                          ],
                          value,
                          onChange: (e) => {
                              const newValue = (
                                  e as ChangeEvent<HTMLInputElement>
                              ).target
                                  ? (e as ChangeEvent<HTMLInputElement>).target
                                        .value
                                  : e;

                              setForm((prevForm) => ({
                                  ...prevForm,
                                  [field]:
                                      (field === 'lessonStart' ||
                                          field === 'lessonEnd' ||
                                          field === 'weekInterval') &&
                                      Number(newValue) < 1
                                          ? 1
                                          : newValue,
                              }));
                              setFilteredErrors((prev) => {
                                  const {
                                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                      [field as keyof CreateLessonBlockDTO]: _,
                                      ...newErrors
                                  } = prev;
                                  return newErrors;
                              });
                          },
                      } as FieldBinder),
        }),
        {} as LessonBlockFormBinders
    );

    const submit = (
        post: UseMutateFunction<unknown, unknown, CreateLessonBlockDTO>
    ) => {
        if (currentTimetableFilters) {
            post(lessonBlockFormToDTO(form, currentTimetableFilters.fromDate));
        }
    };

    useEffect(() => {
        setFilteredErrors(errors);
    }, [errors]);

    return { binders, submit, isErrored: !!Object.keys(filteredErrors).length };
};
