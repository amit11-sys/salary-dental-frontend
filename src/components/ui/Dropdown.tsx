import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function Dropdown({
  selected,
  setSelected,
  options,
  isProfile,
  className,
  placeholder = "Select", // Add a placeholder prop
  disabled,
  isData,
}: {
  selected: any;
  setSelected: any;
  options: any;
  isProfile?: boolean;
  className?: string;
  placeholder?: string; // Placeholder prop for default text
  disabled?: boolean; // Allow disabling the dropdown
  isData?: boolean;
}) {
  return (
    <div
      className={`mx-auto ${
        isProfile || isData || className === "w-full"
          ? "w-full"
          : "w-36 md:w-48"
      }`}
    >
      <Listbox value={selected} onChange={setSelected} disabled={disabled}>
        <ListboxButton
          className={clsx(
            "relative block w-full rounded-lg",
            isProfile
              ? "py-3 bg-white border border-gray-200"
              : isData
              ? "py-4 bg-gray-100 border border-gray-100 text-black text-lg"
              : "py-1.5 bg-white/5 border border-green",
            "pr-8 pl-3 text-left text-sm/6 text-gray-700",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
            disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
          )}
          disabled={disabled}
        >
          {selected ? selected.label : placeholder}{" "}
          {/* Show placeholder if nothing is selected */}
          <ChevronDownIcon
            className={clsx(
              `group pointer-events-none absolute ${
                isProfile || isData ? "top-4" : "top-2.5"
              } right-2.5 size-4`,
              disabled ? "fill-gray-400" : "fill-orange/60"
            )}
            aria-hidden="true"
          />
        </ListboxButton>
        {!disabled && (
          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              "w-[var(--button-width)] rounded-xl",
              isProfile ? "" : "border border-green",
              "bg-gray-100 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
              "z-50"
            )}
          >
            {options.map((item: any) => (
              <ListboxOption
                key={item?.label}
                value={item}
                className="group flex cursor-pointer items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-gray-300 border-b border-gray-200"
              >
                <CheckIcon className="invisible size-4 fill-gray-700 group-data-[selected]:visible" />
                <div
                  className={`text-sm/6 ${
                    isProfile ? "text-gray-700" : "text-green"
                  }`}
                >
                  {item.label}
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        )}
      </Listbox>
    </div>
  );
}
