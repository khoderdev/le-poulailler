import { useState, useEffect } from "react";
import Modal from "../Modal";
import Button from "../Button";
import ImageUpload from "../ImageUpload";
import type { EditingItem, SaveStatus } from "./types";

interface EditItemModalProps {
  open: boolean;
  item: EditingItem | null;
  onClose: () => void;
  onSubmit: (item: EditingItem, image: File | null) => Promise<void>;
}

export default function EditItemModal({
  open,
  item,
  onClose,
  onSubmit,
}: EditItemModalProps) {
  const [form, setForm] = useState<EditingItem | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState<SaveStatus>("idle");

  // Sync form state when the item prop changes
  useEffect(() => {
    if (item) {
      setForm({ ...item });
      setImage(null);
      setStatus("idle");
    }
  }, [item]);

  const handleClose = () => {
    setForm(null);
    setImage(null);
    setStatus("idle");
    onClose();
  };

  const handleSubmit = async () => {
    if (!form) return;
    setStatus("saving");
    try {
      await onSubmit(form, image);
      setStatus("saved");
      setTimeout(handleClose, 600);
    } catch {
      setStatus("error");
    }
  };

  if (!form) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`Edit "${form.name}"`}
      size="lg"
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant={status === "error" ? "danger" : "primary"}
            disabled={status === "saving"}
            onClick={handleSubmit}
          >
            {status === "saving"
              ? "Saving..."
              : status === "saved"
                ? "Saved!"
                : status === "error"
                  ? "Error — Retry"
                  : "Save"}
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Price
          </label>
          <input
            type="text"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            value={form.description || ""}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            rows={2}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Item Image
          </label>
          <ImageUpload
            currentImageUrl={form.imageUrl}
            onImageChange={setImage}
            onImageRemove={() => {
              setForm({ ...form, imageUrl: undefined });
              setImage(null);
            }}
            disabled={status === "saving"}
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.comingSoon || false}
            onChange={e => setForm({ ...form, comingSoon: e.target.checked })}
            className="w-4 h-4"
          />
          <span className="text-gray-700">Coming Soon</span>
        </label>
      </div>
    </Modal>
  );
}
