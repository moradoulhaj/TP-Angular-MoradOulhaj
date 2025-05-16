export class Product {
    private _id!: number;
    private _productTitle!: string;
    private _productPrice!: string;
    private _productQuantity!: number;
    private _productPicture!: string;
    private _productCategory!: string;

  
    constructor(readonly productID: string) {}
  
    // ID
    public get id(): number {
      return this._id;
    }
    public set id(value: number) {
      this._id = value;
    }
  
    // Title
    public get productTitle(): string {
      return this._productTitle;
    }
    public set productTitle(value: string) {
      this._productTitle = value;
    }
  
    // Price
    public get productPrice(): string {
      return this._productPrice;
    }
    public set productPrice(value: string) {
      this._productPrice = value;
    }
  
    // Quantity
    public get productQuantity(): number {
      return this._productQuantity;
    }
    public set productQuantity(value: number) {
      this._productQuantity = value;
    }
  
    // Picture
    public get productPicture(): string {
      return this._productPicture;
    }
    public set productPicture(value: string) {
      this._productPicture = value;
    }
    // Category
    public get productCategory(): string {
      return this._productCategory;
    }
    public set productCategory(value: string) {
      this._productCategory = value;
    }
    public printProduct(): string {
      return `id: ${this.id}, productID: ${this.productID}, productTitle: ${this.productTitle}, productPrice: ${this.productPrice}, productQuantity: ${this.productQuantity}, productPicture: ${this.productPicture}`;
    }
  }
  