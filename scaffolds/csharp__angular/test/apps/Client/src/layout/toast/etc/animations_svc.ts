import { Injectable } from '@angular/core';
import { animate } from '@motionone/dom';

@Injectable({
  providedIn: 'root',
})
export class UseToastAnimationsSvc {
  public toastIn(toastDOM: HTMLElement, timerDOM: HTMLElement): void {
    animate(
      toastDOM,
      {
        transform: [
          'translateX(120%)',
          'translateX(-60%)',
          'translateX(40%)',
          'translateX(-30%)',
          'translateX(20%)',
          'translateX(-10%)',
          'translateX(0%)',
        ],
        opacity: [0, 1, 1, 1, 1, 1, 1],
      },
      {
        duration: 0.6,
        easing: 'ease-in-out',
      },
    );

    animate(
      timerDOM,
      {
        width: ['100%', '0%'],
      },
      {
        duration: 5,
        easing: 'linear',
      },
    );
  }

  public toastOut(toastDOM: HTMLElement, timerDOM: HTMLElement): void {
    animate(
      toastDOM,
      {
        transform: ['translateX(0%)', 'translateX(-60%)', 'translateX(120%)'],
        opacity: [1, 1, 0],
      },
      {
        duration: 0.3,
        easing: 'ease-in-out',
      },
    );

    timerDOM.style.width = '100%';
  }
}
