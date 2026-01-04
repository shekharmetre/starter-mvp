type Product = {
    id: string;
    slug: string;
    name: string;
    image: string;
    type: string;
    title: string;
    description: string;
    rating: number;
    reviews: number;
    basePrice: number;
    discountedPrice: number;
};

type SelectOption = {
    label: string;
    value: string;
};

export type { Product, SelectOption };
