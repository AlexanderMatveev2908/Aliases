import { ElementRef, TemplateRef } from '@angular/core';
import { Optional, OrNone } from './general';

export type BtnT = 'button' | 'submit';

export type ElDomT = OrNone<HTMLElement>;

export type RefDomT = Optional<ElementRef<HTMLElement>>;

export type RefTemplateT = Optional<TemplateRef<unknown>>;
