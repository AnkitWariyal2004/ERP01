// types.ts
export interface Task {
  _id?:string;
  title?: string;
  description?: string;
  dueDate?: string;
  type?:'bug'|'feature'|'task'|'improvement';
  status?: 'todo'|'in-progress'| 'review'| 'done'|'pending';
  priority?: 'low'|'medium'|'high'| 'critical'|'medium';
  assignee?:string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewProject {
  _id?:string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  team?: string[];
  budget?: number;
  tags?: string[];
  progress?:number;
  visibility?: 'public' | 'private';
  projectUrl?: string;
  documents?: string[];
  riskAssessment?: string;
  dependencies?: string;
  server?: {
    _id?:string;
    provider?: string;
    userName?: string;
    password?: string;
    ip?:string;
    url?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  status?: string;
  balanceAmount?:number,
  paidAmount?:number,
  tasks?: Task[];
  clientID?: string;
  createdAt?: string;
  updatedAt?: string;
}
