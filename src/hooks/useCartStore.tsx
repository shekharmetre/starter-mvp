import { toast } from 'react-hot-toast';
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
            addItemAsync: async (item) => {
                set({ isAdding: true });

                // ✅ ESLint-safe Promise
                await new Promise((resolve) => setTimeout(resolve, 300));

                const existing = get().cart.find((i) => i.itemName === item.itemName);

                if (existing) {
                    set({
                        cart: get().cart.map((i) => (i.id === existing.id ? { ...i, qty: i.qty + item.qty } : i))
                    });
                    toast.success('Item quantity updated in cart');
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
                    toast.success('Successfully added to cart');
                }

                set({ isAdding: false });
            },

            removeItem: (id) => {
                set({ cart: get().cart.filter((i) => i.id !== id) });
                toast.success('Item removed from cart');
            },

            updateQty: (id, qty) => {
                if (qty <= 0) {
                    set({ cart: get().cart.filter((i) => i.id !== id) });
                    toast.success('Item removed from cart');

                    return;
                }
                set({
                    cart: get().cart.map((i) => (i.id === id ? { ...i, qty } : i))
                });
            },

            toggleFavourite: (id) => {
                set({
                    cart: get().cart.map((i) => (i.id === id ? { ...i, favourite: !i.favourite } : i))
                });
            },

            markScratched: (id) => {
                const item = get().cart.find((i) => i.id === id);
                if (item?.scratched) return;

                set({
                    cart: get().cart.map((i) => (i.id === id ? { ...i, scratched: true } : i))
                });
            },

            clearCart: () => {
                set({ cart: [] });
                toast.success('Cart cleared');
            }
        }),
        {
            name: 'cart-storage'
        }
    )
);
