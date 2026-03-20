import { FiArrowLeft } from "react-icons/fi";
import Button from "../Button";

interface AdminHeaderProps {
  onBack: () => void;
  onLogout: () => void;
}

export default function AdminHeader({ onBack, onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-4 flex items-center justify-between relative">
        <Button variant="ghost" icon={<FiArrowLeft />} size="sm" onClick={onBack} className="rounded-xl hover:text-primary hover:bg-primary/10">
          <span className="hidden sm:inline">Back</span>
        </Button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg sm:text-2xl font-bold text-gray-800">Menu Management</h1>
        <Button variant="ghost" size="sm" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
