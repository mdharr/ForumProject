import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HtmlTooltipDirective } from './html-tooltip.directive';
import { ElementRef, Renderer2, Sanitizer, ViewContainerRef } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentFactoryResolver } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

describe('Directive: HtmlTooltip', () => {
  let directive: HtmlTooltipDirective;
  let elementRef: ElementRef<any>;
  let renderer: Renderer2;
  let sanitizer: DomSanitizer;
  let overlay: Overlay;
  let viewContainerRef: ViewContainerRef;
  let componentFactoryResolver: ComponentFactoryResolver;

  beforeEach(() => {
    elementRef = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    renderer = jasmine.createSpyObj('Renderer2', ['listen']);
    sanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);
    overlay = jasmine.createSpyObj('Overlay', ['create']);
    viewContainerRef = jasmine.createSpyObj('ViewContainerRef', ['']);
    componentFactoryResolver = jasmine.createSpyObj('ComponentFactoryResolver', ['']);

    directive = new HtmlTooltipDirective(
      elementRef,
      renderer,
      sanitizer,
      overlay,
      viewContainerRef,
      componentFactoryResolver
    );
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
