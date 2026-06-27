import { ElementRef, TemplateRef } from '@angular/core';
import { Optional, OrNone } from './general';

export type ElDomT = OrNone<HTMLElement>;

export type RefDomT = Optional<ElementRef<HTMLElement>>;

export type RefTemplateT = Optional<TemplateRef<HTMLElement>>;

export interface LinkSidebar {
  url: string;
  label: string;
  id: string;
}

export interface FormFieldT {
  name: string;
  label: string;
  type: string;
}
