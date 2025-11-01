import { createContext } from 'react';

import type { User } from '@/api/types/UserService';

export const UserContext = createContext<User>({
    id: '0-0-0-0-0',
    login: '',
    customURL: '',
});
