import { useTranslation } from 'react-i18next';

import type { CellValue } from '@/shared/components/Table/types';
import ErrorSign from '@/shared/icons/ErrorSign';
import WarningSign from '@/shared/icons/WarningSign';
import { IconWrapper } from '@/shared/styles/Table';

export const defaultFormatter = (value: CellValue) => {
    const { t } = useTranslation();

    if (typeof value === 'string' || typeof value === 'number')
        return String(value);
    if (value === true) return t('Active');
    if (value === false) return t('Inactive');
    return '';
};

export const warningIconRenderFn = (value: CellValue) => {
    const weight = Number(value);
    return (
        <IconWrapper $size={18}>
            {weight >= 1 ? <ErrorSign /> : <WarningSign weight={weight} />}
        </IconWrapper>
    );
};
