import { Member } from './member.model';

export interface Team {
  id: number;
  name: string;
  description: string;
  members: Member[];
  showErrorMessage?: boolean;
}
