export type EnvModeT = 'development' | 'production' | 'test';

export class EnvVars {
  public static readonly mode: EnvModeT = 'production';
  public static readonly backURLDev: string = 'https://localhost/api/v1';
  public static readonly backURL: string = 'https://gym-schedules-server.fly.dev/api/v1';
  public static readonly frontURLDev: string = 'https://localhost';
  public static readonly frontURL: string = 'https://gym-schedules-client.fly.dev';

  public static isDev(): boolean {
    return this.mode === 'development';
  }

  public static isProd(): boolean {
    return this.mode === 'production';
  }

  public static currBackURL(): string {
    return this.isDev() ? this.backURLDev : this.backURL;
  }

  public static currFrontURL(): string {
    return this.isDev() ? this.frontURLDev : this.frontURL;
  }
}
