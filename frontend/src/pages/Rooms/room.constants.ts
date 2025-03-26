import { Lock, Users } from 'lucide-react';

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

const ROOM_URL_KEYS = {
  visibility: 'visibility',
  topic: 'filter-room',
};

const ACCESSIBILITY_TYPES = [
  { name: 'public', icon: Users },
  { name: 'private', icon: Lock },
];

export { TOPIC_OPTIONS, ACCESSIBILITY_TYPES, ROOM_URL_KEYS };
