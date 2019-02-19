interface VDev {
  uuid: string;
  host: string;
  rest_port: number;
  user: string;
  password: string;
  brand: string;
  type: string;
  protocol: string;
  production: boolean;
  detached: boolean;
  pid: number;
  running: boolean;
  starttime: number;
  startcounter: number;
}
