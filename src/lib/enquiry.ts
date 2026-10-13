export const enquiryTypes = [
  { value: "general", label: "General enquiry" },
  { value: "bagged", label: "Bagged wood pellets" },
  { value: "bulk", label: "Bulk supply" },
  { value: "wholesale", label: "Wholesale pricing" },
  { value: "range", label: "Firewood, briquettes, logs and other products" },
] as const;

export type EnquiryField =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "enquiryType"
  | "quantity"
  | "location"
  | "message"
  | "consent";

export type EnquiryValues = Record<Exclude<EnquiryField, "consent">, string>;

export type EnquiryState = {
  status: "idle" | "invalid" | "sent" | "unavailable" | "failed";
  message?: string;
  errors?: Partial<Record<EnquiryField, string>>;
  values?: EnquiryValues;
};

export const initialEnquiryState: EnquiryState = { status: "idle" };
