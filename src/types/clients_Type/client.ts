export interface Client {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  status?: 'Active' | 'Inactive' | 'Pending';
};
