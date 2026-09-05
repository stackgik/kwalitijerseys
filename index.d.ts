export {};

declare global {
  interface IProductDetails {
    id: string;
    name: string;
    description: string;
    team: string;
    league:
      | "Premier League"
      | "La Liga"
      | "Serie A"
      | "Bundesliga"
      | "Ligue 1"
      | "National Teams"
      | "Others";
    season: string;
    stock: number;
    isActive: boolean;
    type: "modern" | "current" | "retro";
    priceInKobo: number;
    createdAt: Date;
    updatedAt: Date;
    images: {
      id: string;
      productId: string;
      url: string;
      order: number;
    }[];
  }

  interface IProductData {
    id: string;
    name: string;
    league: string;
    season: string;
    priceInKobo: number;
    images: string[];
    stock: number;
    type: "current" | "modern" | "retro";
  }

  interface IProductProps {
    id: string;
    name: string;
    league:
      | "Premier League"
      | "La Liga"
      | "Serie A"
      | "Bundesliga"
      | "Ligue 1"
      | "National Teams"
      | "Others";
    season: string;
    priceInKobo: number;
    images: string[];
    createdAt: Date | string;
    stock: number;
  }

  interface ICartItem {
    cartItemId: string; // Unique row string instance for the cart UI loop
    productId: string; // Tracks the physical product from your database
    name: string;
    priceInKobo: number;
    image: string;
    size: string;
    quantity: number;
    type: "current" | "modern" | "retro";
    version?: "player" | "fan";
    customization?: {
      name?: string;
      number?: string;
      price: number;
    };
  }

  interface IOrderPayload {
    customerName: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    itemsSubtotal: number;
    total: number; // Stored in kobo
    deliveryFee: number;
    items: ICartItem[];
    orderNotes: string | undefined;
  }

  interface JerseyFilters {
    team: string | undefined;
    minPrice: string | undefined;
    maxPrice: string | undefined;
    league: string | undefined;
    page: string | undefined;
  }
}
