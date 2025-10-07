import { ReactElement, useState } from 'react';

import { PropertiesWindowContext } from '@/features/dashboard/contexts';
import { SelectedEntity } from '@/features/dashboard/types';

export const PropertiesWindowProvider = ({
    children,
}: {
    children: ReactElement;
}) => {
    const propertiesWindowState = useState<SelectedEntity | null>(null);
    return (
        <PropertiesWindowContext.Provider value={propertiesWindowState}>
            {children}
        </PropertiesWindowContext.Provider>
    );
};
