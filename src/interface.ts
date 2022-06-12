export interface User {
  email: string;
  phone: string;
  username: string;
  [customKey: string]: string;
}

export interface TextInfo {
  value: string;
  isValidated?: boolean;
  isNotDuplicated?: boolean;
}

export interface TextInfos {
  email: TextInfo;
  phone: TextInfo;
  password: TextInfo;
  confirm: TextInfo;
  username: TextInfo;
  referral: TextInfo;
  [customKey: string]: TextInfo;
}

export interface CheckInfos {
  all: boolean;
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
  [customKey: string]: boolean;
}
