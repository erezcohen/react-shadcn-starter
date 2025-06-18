import * as React from "react";
import { Search as SearchIcon, X as XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  containerClassName?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, containerClassName, onClear, ...props }, ref) => {
    const [value, setValue] = React.useState(
      props.value || props.defaultValue || ""
    );
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      props.onChange?.(e);
    };

    const handleClear = () => {
      setValue("");
      onClear?.();
      inputRef.current?.focus();
    };

    React.useEffect(() => {
      setValue(props.value || "");
    }, [props.value]);

    return (
      <div className={cn("relative w-full max-w-xs", containerClassName)}>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#47579E]">
          <SearchIcon className="w-5 h-5" />
        </span>
        <input
          ref={(node) => {
            // Handle both refs
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            inputRef.current = node;
          }}
          type="text"
          value={value}
          onChange={handleChange}
          className={cn(
            "w-full pl-10 pr-10 py-2 rounded-lg border border-[#E5E8EB] bg-[#F7FAFC] text-[16px] font-normal font-['Inter',_sans-serif] text-[#0D0F1C] placeholder-[#A0AEC0] focus:outline-none focus:ring-2 focus:ring-[#47579E] transition",
            className
          )}
          style={{ lineHeight: 1 }}
          {...props}
        />
        {value && (
          <button
            type="button"
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0AEC0] hover:text-[#47579E] transition-colors"
            onClick={handleClear}
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
