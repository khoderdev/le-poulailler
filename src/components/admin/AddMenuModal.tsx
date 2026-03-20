import { useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import type { SaveStatus } from "./types";

interface AddMenuModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, color: string) => Promise<void>;
}

export default function AddMenuModal({ open, onClose, onSubmit }: AddMenuModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#286091");
  const [status, setStatus] = useState<SaveStatus>("idle");

  const reset = () => {
    setName("");
    setColor("#286091");
    setStatus("idle");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setStatus("saving");
    try {
      await onSubmit(name.trim(), color);
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
      title="Create New Menu"
      size="md"
      footer={
        <div className="flex gap-2">
          <Button variant="primary" disabled={status === "saving" || !name.trim()} onClick={handleSubmit} className="flex-1">
            {status === "saving" ? "Creating..." : status === "saved" ? "Created!" : "Create Menu"}
          </Button>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Menu Name</label>
          <input type="text" placeholder="e.g., Lent Menu" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" autoFocus />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Menu Color</label>
          <div className="flex gap-2 items-center">
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-12 h-10 rounded cursor-pointer" />
            <input type="text" value={color} onChange={e => setColor(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm" placeholder="#286091" />
          </div>
        </div>
      </div>
    </Modal>
  );
}
