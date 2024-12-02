import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

import { AllTheProviders } from '@/shared/test-utils/AllProviders';

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
