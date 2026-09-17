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

  type League =
    | "Premier League"
    | "La Liga"
    | "Serie A"
    | "Bundesliga"
    | "Ligue 1"
    | "National Teams"
    | "Others";

  type JerseyType = "retro" | "current" | "modern";

  interface IProduct {
    id: string;
    name: string;
    league: League;
    season: string;
    price_in_kobo?: number;
    priceInKobo?: number;
    images: string[];
    stock: number;
    type?: JerseyType;
    createdAt: Date | string;
  }

  interface IPagination {
    limit: number;
    total: number;
    totalPages: number;
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
