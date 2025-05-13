
import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CategoryFilterProps {
  onCategoryChange: (categories: string[]) => void;
}

const CATEGORIES = [
  { id: "technology", name: "Technology" },
  { id: "startups", name: "Startups" },
  { id: "apps", name: "Apps" },
  { id: "gadgets", name: "Gadgets" },
  { id: "ai", name: "AI" },
  { id: "science", name: "Science" }
];

export const CategoryFilter = ({ onCategoryChange }: CategoryFilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => {
      const newSelection = prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId];
      
      onCategoryChange(newSelection);
      return newSelection;
    });
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="categories" className="border-none">
        <AccordionTrigger className="py-2">Categories</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {CATEGORIES.map(category => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={category.id} 
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <Label 
                  htmlFor={category.id}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
