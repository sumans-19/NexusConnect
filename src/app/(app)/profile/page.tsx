import { getCurrentUser } from '@/lib/db';
import { ProfileClient } from './client';

export default async function ProfilePage() {
  // In a real app, you'd get the current user's ID from the session
  const user = await getCurrentUser();

  if (!user) {
    return <div>User not found.</div>;
  }

  return <ProfileClient user={user} />;
}
