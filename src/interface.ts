export interface UserProps {
  email: string;
  phone: string;
  username: string;
  [customKey: string]: string;
}

export interface InfosProps {
  email: string;
  phone: string;
  password: string;
  confirm: string;
  username: string;
  referral: string;
  all: boolean;
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
  [customKey: string]: string | boolean;
}
