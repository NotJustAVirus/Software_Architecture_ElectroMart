import { ProductType } from "./ProductType";
import { Product } from "./Product";

export class SSD extends Product {
  constructor(title: string, imageUrl: string, basePrice: number) {
    super(ProductType.SSD, title, imageUrl, basePrice)
  }
}
