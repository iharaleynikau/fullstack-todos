'use client';

import { Props } from '@/lib/types';
import { SessionProvider } from 'next-auth/react';

const ClientSessionProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientSessionProvider;
