export type Customer = {
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'pending' | 'blocked';
};
