export const BUSINESS = {
  legalName: "Yash Marketing",
  brandName: "NightFury",
  tagline: "Authorized Distributor of NightFury",
  gstin: "XXXXXX",
  address: {
    line1: "109/75, Sisamau Bazar",
    line2: "Nehru Nagar, Jawahar Nagar",
    city: "Kanpur",
    state: "Uttar Pradesh",
    pin: "208012",
    country: "India",
  },
  get fullAddress() {
    return `${this.address.line1}, ${this.address.line2}, ${this.address.city}, ${this.address.state} - ${this.address.pin}, ${this.address.country}`;
  },
} as const;

export const SUPPORT = {
  email: "support@nightfury.in",
  secondaryEmail: "contact@nightfury.in",
  phone: "+91 8052170430",
  phoneHref: "tel:+918052170430",
  hours: "Monday to Saturday, 10:00 AM - 7:00 PM IST",
  responseTime: "We aim to respond to all inquiries within 24 hours during business days.",
} as const;

export const GRIEVANCE_OFFICER = {
  name: "Dhruv Chopra",
  designation: "Grievance Officer",
  email: "support@nightfury.in",
  phone: "+91 8052170430",
} as const;

export const SHIPPING = {
  partner: "Shiprocket",
  processingTime: "24 hours",
  deliveryTime: "1-3 Business Days",
  tiers: [
    { label: "Orders below Rs.499", fee: "Rs.79" },
    { label: "Orders Rs.499 - Rs.999", fee: "Rs.49" },
    { label: "Orders above Rs.999", fee: "Free" },
  ],
  serviceArea: "Pan India",
} as const;

export const REFUND = {
  visionReturnWindow: "7 days from delivery",
  refundProcessing: "5-7 business days",
  reportingTimeline: "24 hours of delivery",
  requiredEvidence: [
    "Unboxing video",
    "Product photos",
    "Packaging photos",
    "Invoice or Order ID",
  ],
} as const;

export const WARRANTY = {
  applicableProducts: "NightFury Vision Products",
  coverage: [
    "Manufacturing defects",
    "Product failure during normal usage",
    "Performance-related failures caused by manufacturing issues",
  ],
  exclusions: [
    "Physical damage",
    "Accidental damage",
    "Improper installation",
    "Product modification",
    "Tampering",
    "Unauthorized repair",
    "Misuse",
    "Damage caused beyond specified operating conditions",
  ],
} as const;

export const PAYMENT = {
  gateway: "Razorpay",
  methods: [
    "UPI",
    "Credit Cards",
    "Debit Cards",
    "Net Banking",
    "Wallets",
    "Razorpay Supported Methods",
    "Cash on Delivery (Eligible Locations Only)",
  ],
} as const;

export const JURISDICTION = "Kanpur, Uttar Pradesh, India";

export const SITE_URL = "https://nightfury.in";

export const LEGAL_LINKS = [
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/refund-return-policy", label: "Refund Policy" },
  { href: "/warranty-policy", label: "Warranty Policy" },
  { href: "/contact-us", label: "Contact Us" },
] as const;
