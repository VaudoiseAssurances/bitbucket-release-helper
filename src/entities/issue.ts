import { Fields } from './fields';
import { Properties } from './properties';
import { Transition } from './transition';

export interface Issue {
  id: string;
  key: string;
  name: string;
  applicationLinkId: string;
  transitions: Transition[];
  canTransition: boolean;
  properties: Properties;
  fields: Fields;
}
