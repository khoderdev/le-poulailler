import { useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import ImageUpload from "../ImageUpload";
import type { SaveStatus } from "./types";

export interface NewItemData {
  name: string;
  price: string;
  description: string;
  coming_soon: boolean;
}

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: NewItemData, image: File | null) => Promise<void>;
}

const emptyItem: NewItemData = {
  name: "",
  price: "",
  description: "",
  coming_soon: false,
};

export default function AddItemModal({
  open,
  onClose,
  onSubmit,
}: AddItemModalProps) {
  const [item, setItem] = useState<NewItemData>(emptyItem);
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState<SaveStatus>("idle");

  const reset = () => {
    setItem(emptyItem);
    setImage(null);
    setStatus("idle");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!item.name.trim()) return;
    setStatus("saving");
    try {
      await onSubmit(item, image);
      setStatus("saved");
      setTimeout(() => {
        reset();
        onClose();
      }, 600);
    } catch {
      setStatus("error");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add Item"
      size="lg"
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={status === "saving" || !item.name.trim()}
            onClick={handleSubmit}
          >
            {status === "saving" ? "Saving..." : status === "saved" ? "Saved!" : "Save"}
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Item name"
          value={item.name}
          onChange={e => setItem({ ...item, name: e.target.value })}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          autoFocus
        />
        <input
          type="text"
          placeholder="Price (e.g., 25 or 45/55)"
          value={item.price}
          onChange={e => setItem({ ...item, price: e.target.value })}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <textarea
          placeholder="Description (optional)"
          value={item.description}
          onChange={e => setItem({ ...item, description: e.target.value })}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
          rows={2}
        />
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Item Image (Optional)
          </label>
          <ImageUpload
            onImageChange={setImage}
            disabled={status === "saving"}
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={item.coming_soon}
            onChange={e => setItem({ ...item, coming_soon: e.target.checked })}
            className="w-4 h-4"
          />
          <span className="text-gray-700">Coming Soon</span>
        </label>
      </div>
    </Modal>
  );
}
