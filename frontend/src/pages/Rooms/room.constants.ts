import { FaPodcast } from 'react-icons/fa';
import { MdVideoCall } from 'react-icons/md';

const TOPIC_OPTIONS = [
  {
    label: 'Health',
    value: 'Health',
  },
  {
    label: 'Art',
    value: 'Art',
  },
  {
    label: 'Fitness',
    value: 'Fitness',
  },
  {
    label: 'Finance',
    value: 'Finance',
  },
  {
    label: 'Medical',
    value: 'Medical',
  },
  {
    label: 'Engineering',
    value: 'Engineering',
  },
  {
    label: 'Politics',
    value: 'Politics',
  },
];

const ROOM_TYPES = [
  { name: 'podcast', icon: FaPodcast },
  { name: 'meet', icon: MdVideoCall },
];

const ACCESSIBILITY_TYPES = [{ name: 'public' }, { name: 'private' }];

export { TOPIC_OPTIONS, ROOM_TYPES, ACCESSIBILITY_TYPES };
