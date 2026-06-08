export class LibLog {
  public static main(ttl: string, ...args: unknown[]): void {
    console.group(`☢️ ${ttl} ☢️`);

    for (const arg of args) {
      console.log(arg);
    }

    console.groupEnd();
    console.log('\n');
  }
}
