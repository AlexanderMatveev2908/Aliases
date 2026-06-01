import { ElDomT } from '@/common/types/dom';
import { animate, AnimationOptionsWithOverrides } from '@motionone/dom';

type NoticeAnimationElsT = {
  svgDOM: ElDomT;
  spanMsgDOM: ElDomT;
  spanStatusDOM: ElDomT;
  contentDOM: ElDomT;
};

export class NoticeCsrAnimations {
  private static readonly textConf: AnimationOptionsWithOverrides = {
    delay: 0.2,
    duration: 1,
    easing: 'ease-in-out',
  };

  private static readonly contentConf: AnimationOptionsWithOverrides = {
    delay: 0.2,
    duration: 0.6,
    easing: 'ease',
  };

  private static readonly svgConf: AnimationOptionsWithOverrides = {
    duration: 1,
    easing: 'ease-out',
  };

  private static hasDOM(els: NoticeAnimationElsT): els is {
    svgDOM: HTMLElement;
    spanMsgDOM: HTMLElement;
    spanStatusDOM: HTMLElement;
    contentDOM: HTMLElement;
  } {
    return Boolean(els.svgDOM && els.spanMsgDOM && els.spanStatusDOM && els.contentDOM);
  }

  private static toTranslateX(flow: string[]): string[] {
    return flow.map((x: string) => `translateX(${x})`);
  }

  private static reverseFlow(flow: string[]): string[] {
    return flow.map((x: string) => (x.startsWith('-') ? x.slice(1) : `-${x}`));
  }

  private static animateSvg(svgDOM: HTMLElement): void {
    animate(
      svgDOM,
      {
        transform: [
          'scale(0, 0)',
          'scale(1.6, 0.4)',
          'scale(0.6, 1.4)',
          'scale(1.3, 0.7)',
          'scale(0.9, 1.2)',
          'scale(1.05, 0.95)',
          'scale(1, 1)',
        ],
      },
      this.svgConf,
    );
  }

  private static animateText(spanMsgDOM: HTMLElement, spanStatusDOM: HTMLElement): void {
    const baseFlow: string[] = ['-100%', '40%', '-40%', '20%', '-20%', '10%', '0%'];
    const reverseFlow: string[] = this.reverseFlow(baseFlow);

    animate(
      spanMsgDOM,
      {
        transform: this.toTranslateX(baseFlow),
      },
      this.textConf,
    );

    animate(
      spanStatusDOM,
      {
        transform: this.toTranslateX(reverseFlow),
      },
      this.textConf,
    );
  }

  private static animateContent(contentDOM: HTMLElement): void {
    animate(
      contentDOM,
      {
        opacity: [0, 1],
      },
      this.contentConf,
    );
  }

  public static main(els: NoticeAnimationElsT): void {
    if (!this.hasDOM(els)) return;

    const { svgDOM, spanMsgDOM, spanStatusDOM, contentDOM } = els;

    this.animateSvg(svgDOM);
    this.animateText(spanMsgDOM, spanStatusDOM);
    this.animateContent(contentDOM);
  }
}
