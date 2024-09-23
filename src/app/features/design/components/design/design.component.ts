import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Placement, Product } from '../../models/product.';
import { first } from 'rxjs';

@Component({
  selector: 'app-design',
  templateUrl: './design.component4.html',
  styleUrl: './design.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignComponent implements OnInit, AfterViewInit {
  product!: Product;
  selectedTechnique!: string;
  techniques!: string[];
  selectedPlacement!: string;
  placements: string[] = [];
  selectedColor!: string; 
  colors!: string[];
  selectedSizeVolume!: string;
  sizes_volumes!: string[];
  selectedStyle: string = 'style1';
  styles!: string[];

  constructor(@Inject(ProductService) private productService: ProductService, private change: ChangeDetectorRef) {

    this.styles = ['style1', 'style2', 'style3', 'style4', 'style5', 'style6'];
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.productService.getProductDetails(362).subscribe((product) => {
      this.product = product;
      [this.selectedTechnique] = product.data.techniques.map((technique) => technique.key);
      this.techniques = product.data.techniques.map((technique) => technique.display_name);
      this.placements = product.data.placements.filter(
        (placement) => placement.technique === this.selectedTechnique
      ).map((placement: Placement) => this.formatPlacement(placement.placement));
      [this.selectedColor] = product.data.colors.map((color) => color.name);
      this.colors = product.data.colors.map((color) => color.value);
      [this.selectedSizeVolume] = product.data.sizes;
      this.sizes_volumes = product.data.sizes;
      this.change.detectChanges();
    });
  }

  onColorClick(_t1: string) {
    throw new Error('Method not implemented.');
  }

  onStyleClick(_t1: string) {
    throw new Error('Method not implemented.');
  }

  formatPlacement(placement: string): string {

    // Replace underscore with space,Split the string into words, capitalize each word, and join them back
    return placement.replace(/_/g, ' ').split(' ')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ');

  }
}
