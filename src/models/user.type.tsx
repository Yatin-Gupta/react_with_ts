export interface UserLogin {
  email: string;
  password: string;
}

export interface UserType extends UserLogin {
  id?: number;
  firstname: string;
  lastname: string;
  logo: string;
  profile_image: string;
  taxonomy: string;
  status: string;
  company_name: string;
  company_desc: string;
  company_region: string;
  company_url: string;
}

export type UsersAny = UserType[] | [];
