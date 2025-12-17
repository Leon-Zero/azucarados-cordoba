export interface JwtResponse {
  token: string;
  type: 'Bearer';
  username: string;
  authorities: {
    authority: string;
  }[];
}
