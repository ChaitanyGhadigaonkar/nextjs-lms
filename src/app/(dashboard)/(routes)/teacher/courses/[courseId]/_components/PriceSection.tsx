import { DollarSign } from "lucide-react";
import SectionHeader from "../../../_components/SectionHeader";
import CoursePriceForm from "./PriceForm";
import { Decimal } from "@prisma/client/runtime/library";

interface PriceSectionProps {
  price: number | undefined | null;
}
const PriceSection = ({ price }: PriceSectionProps) => {
  return (
    <div className="flex flex-col">
      <SectionHeader title="Course Price" icon={DollarSign} />
      <CoursePriceForm price={price} />
    </div>
  );
};

export default PriceSection;
