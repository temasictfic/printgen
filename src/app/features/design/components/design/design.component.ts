import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { After } from 'v8';

@Component({
  selector: 'app-design',
  templateUrl: './design.component4.html',
  styleUrl: './design.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignComponent implements OnInit, AfterViewInit {
  colors!: string[];
  sizes_volumes!: string[];
  styles!: string[];
  techniques!: string[];
  views!: Map<string, string[]>;

  constructor(@Inject(ProductService) private productService: ProductService, private change: ChangeDetectorRef) {

    this.styles = ['style1', 'style2', 'style3', 'style4', 'style5', 'style6'];
    /*     this.colors = ['red', 'green', 'blue', 'yellow', 'black', 'white', 'orange'];
    this.sizes_volumes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];
    this.views = ['Front', 'Back', 'Left', 'Right']; */
  }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.productService.getProductDetails(362).subscribe((product) => {
      this.colors = product.data.colors.map((color) => color.value);
      this.sizes_volumes = product.data.sizes;
      this.techniques = product.data.techniques.map(
        (technique) => technique.display_name
      );
      this.views = new Map();

      product.data.placements.forEach((placement) => {
        if (this.views.has(placement.technique)) {
          this.views.get(placement.technique)!.push(placement.placement);
        } else {
          this.views.set(placement.technique, [placement.placement]);
        }
      });
      this.change.detectChanges();
    });
  }

  onColorClick(_t1: string) {
    throw new Error('Method not implemented.');
  }

  onStyleClick(_t1: string) {
    throw new Error('Method not implemented.');
  }
}
