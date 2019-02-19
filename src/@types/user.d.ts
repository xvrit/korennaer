interface User {
  username: string;
  name: string;
  password: string;
  ip_registered?: string;
  picture?: string;
}

interface AccessToken {
  access_token: string;
  expire_date: Date;
  client_id: string;
  refresh_token: string;
}

declare module 'pixi';
