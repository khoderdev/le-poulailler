import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { DbMenuItem } from "../lib/supabase";
import { useAppDispatch } from "../store/hooks";
import { realtimeItemInserted, realtimeItemUpdated, realtimeItemDeleted } from "../store/menuSlice";

export const useRealtimeMenu = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Subscribe to menu_items table changes
    const channel = supabase
      .channel("menu-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "menu_items"
        },
        payload => {
          const newItem = payload.new as DbMenuItem;
          dispatch(realtimeItemInserted(newItem));
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "menu_items"
        },
        payload => {
          const updatedItem = payload.new as DbMenuItem;
          dispatch(realtimeItemUpdated(updatedItem));
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "menu_items"
        },
        payload => {
          const deletedItem = payload.old as {
            id: string;
            category_id: string;
          };
          dispatch(realtimeItemDeleted(deletedItem));
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [dispatch]);
};
