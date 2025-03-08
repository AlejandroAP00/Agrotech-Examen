import { useState, useRef, useEffect, ReactNode, ComponentType } from "react";

interface FloatMenuProps {
  Icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}

const FloatMenu: React.FC<FloatMenuProps> = ({ Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="w-8 h-8 rounded cursor-pointer hover:bg-[#2f2f2f] transition flex items-center justify-center"
        onClick={toggleMenu}
      >
        <Icon className="text-gray-200" />
      </div>
      <div
        className={`absolute right-0 top-full p-2 rounded bg-[#5ed6a4] z-30 flex gap-1 flex-col text-neutral-950 text-base [&>*]:hover:bg-[#1ab172] transition-all duration-200 ease-in-out [&>*]:px-2 [&>*]:py-1 [&>*]:rounded shadow-md shadow-[#1ab172] font-poppins-medium [&>*]:cursor-pointer 
          ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default FloatMenu;
