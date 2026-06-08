import { BoolStrT, Nullable, OrNone } from '@/common/types/general';
import { LibShape } from './shape';

export class LibParser {
  public static firstCharUpper(arg: OrNone<string>): string {
    return LibShape.hasText(arg) ? arg![0].toUpperCase() + arg!.slice(1).toLowerCase() : '';
  }

  public static titleCase(arg: string): string {
    return arg
      .split(/\s+/)
      .map((w: string) => this.firstCharUpper(w))
      .join(' ');
  }

  public static txtOfCamelCase(arg: string, { titleCase }: { titleCase: boolean }): string {
    const splitted: string[] = arg.replace(/([A-Z])/g, ' $1').split(' ');
    const formatted: string[] = splitted.map((w: string) =>
      titleCase ? this.firstCharUpper(w) : w.toLowerCase(),
    );

    return formatted.join(' ');
  }

  public static toSnake(arg: string): string {
    const replaced: string = arg
      .replace(/\s+/g, '')
      .replace(/\//g, '_')
      .replace(/(?<!^)([A-Z])/g, '_$1')
      .replace(/_{3,}/g, '__');

    return replaced.toLowerCase();
  }

  public static strToBool(arg: BoolStrT): boolean {
    const map: Record<BoolStrT, boolean> = {
      true: true,
      false: false,
    };

    return map[arg];
  }

  public static msFromMinutes(minutes: number): number {
    return minutes * 60 * 1000;
  }

  public static asInt(arg: unknown): Nullable<number> {
    if (typeof arg === 'number') return isNaN(arg) ? null : arg;

    if (!LibShape.hasText(arg)) return null;

    const parsed: number = parseInt(arg as string, 10);
    return isNaN(parsed) ? null : parsed;
  }
}
