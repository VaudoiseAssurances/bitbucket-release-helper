import { Status } from './status';
import { Parent } from './parent';
import { Issuetype } from './issuetype';

export interface Fields {
  summary: string;
  status: Status;
  parent: Parent;
  issuetype: Issuetype;
}
