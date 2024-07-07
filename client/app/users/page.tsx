'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import UsersPage from '@/components/UsersPage/UsersPage';

const Users = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loader />;
  }

  if (!session) {
    return redirect('/auth/signin');
  }

  return <UsersPage currentUserId={session.user.id} />;
};

export default Users;
