import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';
import { Renderer3 } from '@angular/core/src/render3/interfaces/renderer';
import { MockNgModuleResolver } from '@angular/compiler/testing';

@Directive({
  selector: '[appFade]'
})
export class FadeDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {    
   }

  ngOnInit () {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '.8');
    this.renderer.setStyle(this.el.nativeElement, 'transition', '.4s opacity');
  } 

  @HostListener('mouseover') onMouseOver() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0px 6px 13px 4px rgba(150,150,150,1)')
  }

  @HostListener('mouseout') onMouseOut() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '.8');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', 'none');
  }

}
