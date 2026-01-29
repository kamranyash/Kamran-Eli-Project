export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  isOwn: boolean;
}

export interface Thread {
  id: string;
  username: string;
  preview: string;
  lastMessageAt: string;
  avatarColor?: string;
}

export interface ThreadWithMessages extends Thread {
  messages: Message[];
}

export const MOCK_THREADS: Thread[] = [
  { id: '1', username: 'alex.s', preview: 'Thanks for the update!', lastMessageAt: '10:30 AM' },
  { id: '2', username: 'kamran.f', preview: 'See you tomorrow', lastMessageAt: '9:15 AM' },
  { id: '3', username: 'nathan.t', preview: 'Payment sent', lastMessageAt: 'Yesterday' },
  { id: '4', username: 'noah.f', preview: 'Can we reschedule?', lastMessageAt: 'Yesterday' },
  { id: '5', username: 'mr.painter', preview: 'Job completed', lastMessageAt: 'Jan 20' },
  { id: '6', username: 'pp.f', preview: 'New booking request', lastMessageAt: 'Jan 18' },
];

export function getMockMessagesForThread(threadId: string): Message[] {
  const baseMessages: Message[] = [
    { id: 'm1', text: 'Hi, when can you start?', senderId: 'client', timestamp: '10:28 AM', isOwn: false },
    { id: 'm2', text: 'I can come tomorrow at 1pm', senderId: 'me', timestamp: '10:29 AM', isOwn: true },
    { id: 'm3', text: 'Perfect, see you then!', senderId: 'client', timestamp: '10:30 AM', isOwn: false },
  ];
  return baseMessages.map((m, i) => ({ ...m, id: `m-${threadId}-${i}` }));
}
