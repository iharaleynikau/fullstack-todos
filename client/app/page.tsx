'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import TodosPage from '@/components/TodosPage/TodosPage';

const Home = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loader />;
  }

  if (!session) {
    return redirect('/auth/signin');
  }

  return <TodosPage userId={session.user.id} />;
};

export default Home;
