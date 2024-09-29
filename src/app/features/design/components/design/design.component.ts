import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Color, Placement, Product, Technique } from '../../models/product';
import { Image } from '../../models/t-shirt';
import { PlacementService } from '../../services/placement.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrl: './design.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignComponent implements OnInit, AfterViewInit {
  product!: Product;

  selectedTechniqueKey!: string;
  techniques!: Technique[];

  selectedPlacement!: Placement;
  placements: Placement[] = [];

  selectedColorName!: string; 
  selectedColorValue!: string; 
  colors!: Color[];

  selectedPlacementImageUrl!: string;
  selectedPlacementBackgroundColor!: string | null;
  selectedPlacementBackgroundImgUrl!: string | null;
  selectedPlacementImage!: Image;
  placementImages: Image[] = [];

  selectedSizeVolume!: string;
  sizes_volumes!: string[];

  selectedStyle: string = 'style1';
  styles!: string[];

  constructor(@Inject(ProductService) private productService: ProductService, @Inject(PlacementService) private placementService: PlacementService, private change: ChangeDetectorRef) {

    this.styles = ['style1', 'style2', 'style3', 'style4', 'style5', 'style6'];
  }

  ngOnInit(): void {
  }

  imageUpdate(color: string, placement: string): void {
    this.placementService.getTShirtDetails(37, color, placement).subscribe((tshirtDetails) => {
      this.placementImages = tshirtDetails.data.flatMap(daum => daum.images);
      [this.selectedPlacementImage] = this.placementImages;
      this.selectedPlacementImageUrl = this.selectedPlacementImage.image_url;
      this.selectedPlacementBackgroundColor = this.selectedPlacementImage.background_color;
      this.selectedPlacementBackgroundImgUrl = this.selectedPlacementImage.background_image;
      console.log(this.selectedPlacementImageUrl);
      this.change.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.productService.getProductDetails(37).subscribe((product) => {
      this.product = product;
      // Techniques
      this.techniques = product.data.techniques;
      [this.selectedTechniqueKey] = product.data.techniques.map((technique) => technique.key);
      // Placements
      this.placements = product.data.placements.filter(
        (placement) => placement.technique === this.selectedTechniqueKey && placement.placement !== 'mockup'
      );
      [this.selectedPlacement] = this.placements;
      // Colors
      [this.selectedColorName] = product.data.colors.map((color) => color.name);
      [this.selectedColorValue] = product.data.colors.map((color) => color.value);
      this.colors = product.data.colors;
      // Sizes
      [this.selectedSizeVolume] = product.data.sizes;
      this.sizes_volumes = product.data.sizes;

      this.imageUpdate(this.selectedColorName, this.selectedPlacement.placement);

    });
  }

  onTechniqueClick(technique: Technique): void {
    this.selectedTechniqueKey = technique.key;
    this.placements = this.product.data.placements.filter(
      (placement) => placement.technique === this.selectedTechniqueKey && placement.placement !== 'mockup'
    );
    [this.selectedPlacement] = this.placements;
    this.onPlacementClick(this.selectedPlacement);
  }

  onPlacementClick(placement: Placement): void {
    this.selectedPlacement = placement;
    console.log(this.selectedPlacement.placement);
    this.imageUpdate(this.selectedColorName, this.selectedPlacement.placement);
  }

  onColorClick(color: Color): void {
    this.selectedColorName = color.name;
    this.selectedColorValue = color.value;
    this.imageUpdate(this.selectedColorName, this.selectedPlacement.placement);
  }

  onStyleClick(_t1: string) {
    throw new Error('Method not implemented.');
  }

}