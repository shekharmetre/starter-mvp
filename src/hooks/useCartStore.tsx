import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
    id: string;
    itemName: string;
    itemImage: string;
    qty: number;
    favourite: boolean;
    scratched: boolean;
    discountPercentage: number;
    originalPrice: number;
    description: string;
};

type CartStore = {
    cart: CartItem[];
    isAdding: boolean;

    addItemAsync: (item: CartItem) => Promise<void>;
    removeItem: (id: string) => void;
    updateQty: (id: string, qty: number) => void;
    toggleFavourite: (id: string) => void;
    markScratched: (id: string) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            isAdding: false,

            // ✅ ADD ITEM
            // ✅ ADD ITEM
            addItemAsync: async (item) => {
                set({ isAdding: true });

                await new Promise((resolve) => setTimeout(resolve, 1500)); // ✅ fixed

                const existing = get().cart.find((i) => i.itemName === item.itemName);

                if (existing) {
                    set({
                        cart: get().cart.map((i) => (i.id === existing.id ? { ...i, qty: i.qty + item.qty } : i))
                    });
                } else {
                    set({
                        cart: [
                            ...get().cart,
                            {
                                ...item,
                                id: item.id ?? crypto.randomUUID(),
                                favourite: item.favourite ?? false,
                                scratched: item.scratched ?? false
                            }
                        ]
                    });
                }

                set({ isAdding: false });
            },

            // ✅ REMOVE BY ID
            removeItem: (id) =>
                set({
                    cart: get().cart.filter((i) => i.id !== id)
                }),

            // ✅ UPDATE QTY BY ID
            updateQty: (id, qty) =>
                set({
                    cart: get().cart.map((i) => (i.id === id ? { ...i, qty } : i))
                }),

            // ✅ TOGGLE FAVOURITE BY ID
            toggleFavourite: (id) =>
                set({
                    cart: get().cart.map((i) => (i.id === id ? { ...i, favourite: !i.favourite } : i))
                }),

            // ✅ MARK SCRATCHED BY ID
            markScratched: (id) =>
                set({
                    cart: get().cart.map((i) => (i.id === id ? { ...i, scratched: true } : i))
                }),

            clearCart: () => set({ cart: [] })
        }),
        {
            name: 'cart-storage'
        }
    )
);
