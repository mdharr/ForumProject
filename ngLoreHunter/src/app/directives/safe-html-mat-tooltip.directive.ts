import { Overlay } from '@angular/cdk/overlay';
import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appSafeHtmlMatTooltip]',
  exportAs: 'matTooltip'
})
export class SafeHtmlMatTooltipDirective extends MatTooltip {
  @Input('matTooltip')
  override set message(message: SafeHtml) {
    if (message) {
      this._message = message;
    }
  }

  constructor(
    protected override _overlay: Overlay,
    protected override _elementRef: ElementRef<HTMLElement>,
    protected _sanitizer: DomSanitizer
  ) {
    super(_overlay, _elementRef, null, null, null, null, null, null, null, null, null, null);
  }

  protected _updateTooltipContent(): void {
    if (this._message instanceof SafeHtml) {
      const tooltipElement = this._tooltipInstance?.getElement();
      if (tooltipElement) {
        tooltipElement.innerHTML = this._message.changingThisBreaksApplicationSecurity;
      }
    } else {
      super._updateTooltipContent();
    }
  }
}
