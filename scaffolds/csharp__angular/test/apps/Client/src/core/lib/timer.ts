import { TimerIdT } from '@/common/types/general';

export class LibTimer {
  public static clear(timerRef: TimerIdT): null {
    if (timerRef) clearTimeout(timerRef);
    return null;
  }
}
