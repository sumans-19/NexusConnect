import { getEvents } from '@/lib/db';
import { EventsClient } from './client';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="space-y-6">
      <EventsClient events={events} />
    </div>
  );
}
