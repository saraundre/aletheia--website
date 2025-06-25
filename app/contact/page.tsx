import ContactFormSection from "@/components/sections/contact/ContactFormSection"

export const metadata = {
  title: "Contact - Let's Talk | Aletheia",
  description:
    "Interested in piloting Spark.OS? Want to support ethical tech development? Let's connect and build something that matters.",
  keywords: ["contact", "collaboration", "partnership", "pilot program", "research collaboration"],
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactFormSection />
    </div>
  )
}
