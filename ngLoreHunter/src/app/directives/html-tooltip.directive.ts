import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentFactoryResolver, Directive, ElementRef, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserTooltipComponent } from '../shared/components/user-tooltip/user-tooltip.component';

@Directive({
  selector: '[appHtmlTooltip]'
})
export class HtmlTooltipDirective implements OnInit {
  @Input('appHtmlTooltip') tooltipContent: { imageUrl?: string; username: string } = { imageUrl: undefined, username: '' };


  private overlayRef: OverlayRef | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    const tooltip = this.getTooltipContent();
    this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', () => {
      this.showTooltip(tooltip);
    });
    this.renderer.listen(this.elementRef.nativeElement, 'mouseleave', () => {
      this.hideTooltip();
    });
  }

  private getTooltipContent(): { imageUrl: string, username: string } {
    return {
      imageUrl: this.tooltipContent.imageUrl || '',
      username: this.tooltipContent.username
    };
  }

  private showTooltip(content: { imageUrl: string, username: string }) {
    if (!this.overlayRef) {
      const positionStrategy = this.getPositionStrategy();
      const overlayConfig = this.getOverlayConfig(positionStrategy);
      this.overlayRef = this.overlay.create(overlayConfig);
      const tooltipPortal = new ComponentPortal(UserTooltipComponent, this.viewContainerRef);
      const tooltipComponent = this.overlayRef.attach(tooltipPortal).instance;
      tooltipComponent.content = content;
    }
  }

  private hideTooltip() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }

  private getPositionStrategy(): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8
        }
      ]);
  }

  private getOverlayConfig(positionStrategy: PositionStrategy): OverlayConfig {
    return new OverlayConfig({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      panelClass: 'custom-tooltip-overlay'
    });
  }
}
