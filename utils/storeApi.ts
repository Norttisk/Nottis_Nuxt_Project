import type { Ref } from "vue";

// Define the Product interface
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

/**
 * Composable to fetch products from FakeStoreAPI
 * @returns Object containing products and error state
 */
export function useFakeStoreApi() {
    // Fetch products using Nuxt's useFetch
    const { data: products, error } = useFetch<Product[]>(
        "https://fakestoreapi.com/products",
        {
            method: "GET",
            key: "fakestore-products", // Cache key for SSR
        }
    );

    return {
        products: products as Ref<Product[] | null>,
        error: error as Ref<Error | null>,
    };
}

/**
 * Utility to format products into a string for system prompt
 * @param products Array of Product objects
 * @returns Formatted string of product data
 */
export function formatProductsForPrompt(products: Product[]): string {
    if (!products || products.length === 0) {
        return "No product data available.";
    }
    return products
        .map(
            (p) =>
                `Product: ${p.title}, Price: $${p.price}, Category: ${p.category}, Description: ${p.description}`
        )
        .join("; ");
}
