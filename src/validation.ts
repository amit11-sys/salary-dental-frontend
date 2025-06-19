import { z } from "zod";
export const salarySchema = z.object({
  specialty: z.string().min(1, { message: "Please select a specialty" }),
  sub_speciality: z.optional(z.string()),
  state: z.string().min(1, { message: "State is required" }),
  city: z.optional(z.string()),
  // rating: z.number().min(1, { message: "Please select a rating" }),
  yearsOfExperience: z
    .number()
    .min(1, "Must have at least 1 year of experience")
    .max(40, "Cannot exceed 40 years of experience"),
  practiceSetting: z.string().min(1, { message: "It is a required field" }),
  base_salary: z.optional(z.number()),
  bonus: z.optional(z.number()),
  hoursWorked: z.number().min(1, { message: "It is a required field" }),
  ptoWeeks: z.number().min(1, { message: "It is a required field" }),
  satisfactionLevel: z.number().min(1, { message: "It is a required field" }),
  chooseSpecialty: z.enum(["yes", "no"], {
    required_error: "Please select an option",
  }),
  email: z.string().email(),
  specialty_raw: z.string().min(1, { message: "Please select a specialty" }),
  insight1:z.optional(z.string()),
  insight2:z.optional(z.string()),
  prod_per:z.optional(z.string())
});

export const salaryViewerSchema = z.object({
  specialty: z.string().min(1, { message: "Please select a specialty" }),
  sub_speciality: z
    .string()
    .min(1, { message: "Please select a sub specialty" }),
  specialty_raw: z.string().min(1, { message: "Please select a specialty" }),
  state: z.optional(z.string()),
  practiceSetting: z.optional(z.string()),
});

export const salaryBenchmarkSchema = z.object({
  specialty: z.string().min(1, { message: "Please select a specialty" }),
  // sub_speciality: z
  //   .string()
  //   .min(1, { message: "Please select a sub specialty" }),
  // specialty_raw: z.string().min(1, { message: "Please select a specialty" }),
  // state: z.optional(z.string()),
  practiceSetting: z.optional(z.string()),
});

export const filterSalarySchema = z.object({
  specialty: z.string().min(1, { message: "Please select a specialty" }),
  sub_speciality: z
    .string()
    .min(1, { message: "Please select a sub specialty" }),
  specialty_raw: z.string().min(1, { message: "Please select a specialty" }),
  practiceSetting: z.string().min(1, { message: "It is a required field" }),
  experience: z.string().optional(),
  minSalary: z
    .string()
    .optional()
    .refine((val) => !val || /^\d+$/.test(val), {
      message: "Must be a valid number",
    }),
  maxSalary: z
    .string()
    .optional()
    .refine((val) => !val || /^\d+$/.test(val), {
      message: "Must be a valid number",
    }),
  satisfaction: z.string().optional(),
});

export type SalaryData = z.infer<typeof salarySchema>;
