"use client"

import { Truck, ShieldCheck, BadgeDollarSign, Cpu } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable shipping across Addis Ababa",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Products",
    description: "100% authentic gadgets with warranty",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Prices",
    description: "Premium tech without breaking the bank",
  },
  {
    icon: Cpu,
    title: "Latest Tech Trends",
    description: "Stay ahead with cutting-edge gadgets",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">Mirt Suq</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            We bring you the best tech experience with unmatched service
          </p>
        </div>

        {/* Mobile: Bullet list */}
        <div className="md:hidden">
          <ul className="space-y-4 max-w-sm mx-auto">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-foreground">{feature.title}</span>
                  <span className="text-muted-foreground"> - {feature.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: Cards with icons */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
