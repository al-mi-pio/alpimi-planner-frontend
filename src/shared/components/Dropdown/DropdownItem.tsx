import { ComponentPropsWithRef } from 'react';

import { StyledItem } from '@/shared/components/Dropdown/Dropdown.style';

export const DropdownItem = ({
    children,
    ...defaultProps
}: ComponentPropsWithRef<'button'>) => (
    <li>
        <StyledItem {...defaultProps} className="menu-button">
            {children}
        </StyledItem>
    </li>
);
