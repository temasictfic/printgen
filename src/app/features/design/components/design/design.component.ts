import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Placement, Product } from '../../models/product';
import { Image } from '../../models/t-shirt';
import { PlacementService } from '../../services/placement.service';
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
  rawPlacements: string[] = [];
  placements: string[] = [];
  selectedColor!: string; 
  colors!: string[];
  selectedSizeVolume!: string;
  sizes_volumes!: string[];
  selectedStyle: string = 'style1';
  styles!: string[];
  selectedPlacementImageUrl!: string;
  placementImages: Image[] = [];

  constructor(@Inject(ProductService) private productService: ProductService, @Inject(PlacementService) private placementService: PlacementService, private change: ChangeDetectorRef) {

    this.styles = ['style1', 'style2', 'style3', 'style4', 'style5', 'style6'];
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.productService.getProductDetails(362).subscribe((product) => {
      this.product = product;
      [this.selectedTechnique] = product.data.techniques.map((technique) => technique.key);
      this.techniques = product.data.techniques.map((technique) => technique.display_name);
      this.rawPlacements = product.data.placements.filter(
        (placement) => placement.technique === this.selectedTechnique && placement.placement !== 'mockup'
      ).map((placement: Placement) => placement.placement);
      //this.placements = this.rawPlacements.map((placement) => this.formatPlacement(placement));
      [this.selectedColor] = product.data.colors.map((color) => color.name);
      this.colors = product.data.colors.map((color) => color.value);
      [this.selectedSizeVolume] = product.data.sizes;
      this.sizes_volumes = product.data.sizes;
      [this.selectedPlacement] = this.rawPlacements;
      this.placementService.getTShirtDetails(362, this.selectedColor, this.selectedPlacement).subscribe((tshirtDetails) => {
        this.placementImages = tshirtDetails.data.map((daum) => daum.images).flat();
        [this.selectedPlacementImageUrl] = this.placementImages.map((image) => image.image_url);
        this.change.markForCheck();
        console.log(this.selectedPlacementImageUrl);
        console.log(this.placementImages);
      });

      this.change.detectChanges();
    });
  }

  onTechniqueClick(technique: string): void {
    this.selectedTechnique = technique;
    this.rawPlacements = this.product.data.placements.filter(
      (placement) => placement.technique === technique
    ).map((placement: Placement) => placement.placement);
    const [firstPlacement] = this.rawPlacements;
    this.onPlacementClick(firstPlacement);
  }

  onPlacementClick(placement: string): void {
    this.selectedPlacement = placement;
    this.placementService.getTShirtDetails(362, this.selectedColor, this.selectedPlacement).subscribe((tshirtDetails) => {
      this.placementImages = tshirtDetails.data.map((daum) => daum.images).flat();
      [this.selectedPlacementImageUrl] = this.placementImages.map((image) => image.image_url);
      this.change.markForCheck();
      console.log(this.selectedPlacementImageUrl);
      console.log(this.placementImages);
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