

export const matchValueToLabel = (options: any, valueToMatch: any) => {
  console.log(options, valueToMatch);

  const matchedOption = options.find(
    (option: any) => option.key === valueToMatch
  );
  return matchedOption ?? null;
};
export const SESSIONTIMEOUT = 90 * 60 * 1000;

export const colors = [
  "bg-red-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
];
