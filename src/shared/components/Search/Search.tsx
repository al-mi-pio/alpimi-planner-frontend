import { ComponentPropsWithRef } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledIcon } from '@/shared/components/Search/Search.style';
import SearchIcon from '@/shared/icons/Search';
import { InnerInput, InputWrapper } from '@/shared/styles/Common';

/**
 * A UI component which accepts user text input
 */
const Search = (props: Omit<ComponentPropsWithRef<'input'>, 'children'>) => {
    const { t } = useTranslation();
    return (
        <InputWrapper $error={false}>
            <StyledIcon>
                <SearchIcon secondary />
            </StyledIcon>

            <InnerInput type="search" aria-label={t('Search')} {...props} />
        </InputWrapper>
    );
};
export default Search;
