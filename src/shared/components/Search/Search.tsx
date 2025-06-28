import { ComponentPropsWithRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
    SearchInput,
    StyledIcon,
    StyledSearch,
} from '@/shared/components/Search/Search.style';
import SearchIcon from '@/shared/icons/Search';

/**
 * A UI component which accepts user text input
 */
const Search = (props: Omit<ComponentPropsWithRef<'input'>, 'children'>) => {
    const { t } = useTranslation();
    return (
        <StyledSearch $error={false}>
            <StyledIcon>
                <SearchIcon secondary />
            </StyledIcon>

            <SearchInput type="search" aria-label={t('Search')} {...props} />
        </StyledSearch>
    );
};
export default Search;
