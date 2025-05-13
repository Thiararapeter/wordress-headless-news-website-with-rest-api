
import { ReactNode, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface SidebarCollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const SidebarCollapsibleSection = ({ 
  title, 
  children, 
  defaultOpen = true 
}: SidebarCollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium hover:bg-gray-100 rounded-md group">
        <span>{title}</span>
        <ChevronRight className={cn(
          "h-4 w-4 text-gray-500 transition-transform",
          isOpen && "transform rotate-90"
        )} />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-1 space-y-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarCollapsibleSection;
