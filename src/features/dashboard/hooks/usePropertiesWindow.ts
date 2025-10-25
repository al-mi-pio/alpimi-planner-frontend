import { use } from 'react';

import { PropertiesWindowContext } from '@/features/dashboard/contexts';

export const usePropertiesWindow = () => {
    const [selectedEntity, setSelectedEntity] = use(PropertiesWindowContext);

    return { selectedEntity, setSelectedEntity };
};
