class Product {
  id: string;
  ownerId: string;
  imageUrl: string;
  title: string;
  description: string;
  price: string;

  constructor(
    id: string,
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: string,
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}

export default Product;
