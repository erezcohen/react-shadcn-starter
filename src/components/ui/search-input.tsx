import * as React from "react";
import { Search as SearchIcon } from "lucide-react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#565A6F]" />
      <input
        type="text"
        className="h-10 w-full pl-10 pr-4 text-[14px] leading-[21px] text-[#0D0F1C] placeholder:text-[#565A6F] bg-white rounded-lg border border-[#E5E8EB] focus:outline-none focus:ring-2 focus:ring-[#47579E] focus:border-transparent"
        {...props}
      />
    </div>
  );
}
