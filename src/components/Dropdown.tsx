import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
//   SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function CustomDropdown({ setValue, options, placeholder, fieldName }: any) {
  
  return (
    <div>
      <Select onValueChange={(value) => setValue(fieldName, value)}>
        <SelectTrigger className="w-full">
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


export default CustomDropdown;
