'use client';

import { Props } from '@/lib/types';
import { Provider } from 'react-redux';
import { store } from './store';

export const StoreProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};
