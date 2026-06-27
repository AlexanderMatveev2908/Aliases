import { Injectable } from '@angular/core';
import { LibMetaEvent, MetaEventT } from '../lib/css/meta_event';
import { AppEventT, SvgT } from '@/common/types/general';

@Injectable({
  providedIn: 'root',
})
export class UseMetaEventSvc {
  public cssByEvent(event: AppEventT): string {
    return LibMetaEvent.cssVarByT(event);
  }

  public svgByEvent(event: AppEventT): SvgT {
    return LibMetaEvent.svgByT(event);
  }

  public metaByEvent(event: AppEventT): MetaEventT {
    return LibMetaEvent.metaByT(event);
  }
}
