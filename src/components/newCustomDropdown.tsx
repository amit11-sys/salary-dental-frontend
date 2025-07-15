
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function NewCustomDropdown({ setValue, options, placeholder, fieldName, value }: any) {
  return (
    <div>
      <Select
        onValueChange={(val) => setValue(fieldName, val)}
        value={value || ""}  // Ensure controlled component even when value is undefined/null
      >
        <SelectTrigger className="w-full p-4 border-2 rounded-xl text-base transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 border-gray-200 hover:border-gray-300">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="z-10 bg-white">
          <SelectGroup>
            {options.map((item: any) => (
              <SelectItem key={item.key} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default NewCustomDropdown;

