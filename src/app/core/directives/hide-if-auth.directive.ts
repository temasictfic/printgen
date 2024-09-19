import { Directive, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Directive({
  selector: '[appHideIfAuth]',
  standalone: true,
})
export class HideIfAuthDirective implements OnInit { 
  constructor(private el: ElementRef, private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      this.el.nativeElement.style.display = isAuthenticated ? '' : '';
    });
  }
}
// TODO: This gives an error bcs server side rendering so i implemented inside navbar