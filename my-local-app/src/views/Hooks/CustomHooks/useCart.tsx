import { useCallback, useMemo } from "react";
import { toJS } from "mobx";
import { cartStore } from "../../Store/CartStore";

export function useCart() {
  const items = toJS(cartStore.items);

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const updateQuantity = useCallback((id: number, value: number) => {
    cartStore.updateQuantity(id, value);
  }, []);

  const removeItem = useCallback((id: number) => {
    cartStore.removeItem(id);
  }, []);

  const clearCart = useCallback(() => {
    cartStore.clear();
  }, []);

  return {
    items,
    totalPrice,
    updateQuantity,
    removeItem,
    clearCart,
  };
}