export interface Subscription {
  id: string;
  status: 'ACTIVE' | 'INACTIVE' | 'CANCELED' | 'TRIAL' | 'OVERDUE';
  plan: {
    id: string;
    name: string;
    price: number;
    interval: 'MONTH' | 'YEAR';
  };
  payments: Payment[];
  ends_at: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface Payment {
  id: string;
  amount: number;
  status: 'PAID' | 'ACTIVE' | 'FAILED';
  paid_at: string;
  invoice_link?: string;
  description: string;
}

export interface Team {
  id: string;
  name: string;
  is_active?: boolean;
  description?: string;
  subscription?: Subscription;
}

export interface FormData {
  name: string;
  description: string;
}

export interface UpdateTeamData {
  name: string;
  description?: string;
} 