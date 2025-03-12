import { Podcast, Video } from 'lucide-react';

const TOPIC_OPTIONS = [
  {
    id: 1,
    name: 'Health',
  },
  {
    id: 2,
    name: 'Art',
  },
  {
    id: 3,
    name: 'Fitness',
  },
  {
    id: 4,
    name: 'Finance',
  },
  {
    id: 5,
    name: 'Medical',
  },
  {
    id: 6,
    name: 'Engineering',
  },
  {
    id: 7,
    name: 'Politics',
  },
];

const ROOM_TYPES = [
  { name: 'podcast', icon: Podcast },
  { name: 'meet', icon: Video },
];

const ROOM_URL_KEYS = {
  roomType: 'room-type',
  visibility: 'visibility',
  topic: 'filter-room',
};

const ACCESSIBILITY_TYPES = [{ name: 'public' }, { name: 'private' }];

export { TOPIC_OPTIONS, ROOM_TYPES, ACCESSIBILITY_TYPES, ROOM_URL_KEYS };
