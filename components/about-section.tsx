"use client"

import Image from "next/image"
import { useRef, useEffect, useState } from "react"

const products = [
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-26_22-08-54-xolvk2gMBbIWAQgfA5ANVShTLp47ng.jpg",
    title: "Premium Audio",
    description: "High-fidelity sound systems",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-26_22-08-23-rPg3UA7UloYPCjli61hqRwSIVmIVUp.jpg",
    title: "Wireless Earbuds",
    description: "True wireless freedom",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-26_22-08-29-RRFCWmqeiwawXhLibybBg7ZohU2nw2.jpg",
    title: "Power Banks",
    description: "Stay charged anywhere",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-26_22-09-18-fUs0nhUvH0StRDPSDqc9k2UowMIwoj.jpg",
    title: "Phone Accessories",
    description: "Perfect companion tools",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-26_22-08-50-76r49JDlb9lrtOZMfCOyEg1iQQSeGn.jpg",
    title: "Novelty Items",
    description: "Fun collectibles & gifts",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-26_22-09-27-3ufh2QbnDVIzqEinKiMaOy8qw3TMkU.jpg",
    title: "Gaming Gear",
    description: "Performance for gamers",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-26_22-08-40-DX4VnGyDEB2QLHf1Tzh9k5PSnT8vTl.jpg",
    title: "Ring Lights",
    description: "Light up your content",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-26_22-09-32-tWMNFZm7mCkKCnPy879IKR69q9yUVk.jpg",
    title: "TWS Earphones",
    description: "Crystal clear audio",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-26_22-09-11-KVQgjojI3LPpc7O9c8zZbwNI23UZUZ.jpg",
    title: "Gaming Headsets",
    description: "Immersive sound experience",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-31-41-8Yq7l472pcqfVeyhHCFge439kLZ8yP.jpg",
    title: "Phone Stand",
    description: "Cute bunny holder",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-32-17-2GVieRqJvLHiJCc47Xac37fWmoWZxC.jpg",
    title: "Guitar Hanger",
    description: "Wall mount display",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-34-01-fVlZkjyrXfKbTf2ilGrOhHvZXeMmjB.jpg",
    title: "Wireless Mic",
    description: "F11-2 Professional mic",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-32-45-BE7Vg9L1XmFkPd4egQekGrWNARtHJC.jpg",
    title: "Lenovo TH10",
    description: "ThinkPlus headphones",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-33-42-WTe13EfnxUO5ZI69IHZz92xYOjKUTB.jpg",
    title: "Mirt Suq Style",
    description: "Branded merchandise",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-31-54-BC3C5Zayu14VqgcLwIDahNg0j0goNv.jpg",
    title: "Galaxy Buds FE",
    description: "Samsung earbuds",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-32-54-xEbzryjnnfbMtDuOuU9N2zCMgNdJZs.jpg",
    title: "Gaming Setup",
    description: "Pro gaming accessories",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-33-56-vBi5eOwpXaOp7FlbQeG8c2WjcmIHhn.jpg",
    title: "SX9 Wireless Mic",
    description: "Professional audio",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-32-04-V2JlxdHsi72WyRYxwl1qwp8KOUBauX.jpg",
    title: "Smart Watch",
    description: "HainoTeko RW-34",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-33-00-PFfvUMQqLGWOO9wuXvMkqCncpdMB1l.jpg",
    title: "Gaming Desk",
    description: "Extended mousepad",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-33-44-clq4ykDwhk6hqtkdvTkkPwT46Xb4iA.jpg",
    title: "Hoco WS4",
    description: "32+ hours playtime",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-33-10-FQUPdMBKKbiW1woFyHnUe4ETjCCkGc.jpg",
    title: "VW Speaker",
    description: "Retro car design",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-32-34-vbKT7VvlTlCawJZ1wHDItpYVILlUi3.jpg",
    title: "Candc DC-M4",
    description: "USB-C wireless mic",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-33-21-2rPLtZBdpu7oPr8vKTLoKSsQitDWHd.jpg",
    title: "Drawing Tablet",
    description: "Kids creative tool",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-33-34-BZMwC9cnPCPDaLySrn1KqebsdeEdrM.jpg",
    title: "Intelligence Book",
    description: "Early education",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-33-05-BkxxRVAJvkb0zIrmtp7x73xoLTjioy.jpg",
    title: "Boombox920",
    description: "Waterproof speaker",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-32-28-JkWWE9CN5VoDpAGT3XJdVYVfIJRZAo.jpg",
    title: "Live Pods XT92",
    description: "Lenovo ThinkPlus",
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-03-27_15-33-52-YyEQTDkY8PyuDyAHC4QzwjGLX5h9U4.jpg",
    title: "Wireless Mic",
    description: "Pro content creation",
  },
]

// Random transition types for mobile
const transitions = [
  "translate-x-full",
  "-translate-x-full",
  "translate-y-full",
  "-translate-y-full",
  "scale-0",
  "rotate-180 scale-0",
]

function MobileProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionType, setTransitionType] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTransitionType(Math.floor(Math.random() * transitions.length))
      
      setTimeout(() => {
        setCurrentIndex(nextIndex)
        const newNextIndex = Math.floor(Math.random() * products.length)
        setNextIndex(newNextIndex === nextIndex ? (newNextIndex + 1) % products.length : newNextIndex)
        setIsTransitioning(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [nextIndex])

  const currentProduct = products[currentIndex]
  const nextProduct = products[nextIndex]

  return (
    <div className="relative w-full h-[350px] rounded-2xl overflow-hidden bg-card border border-border">
      {/* Next Image (behind - rendered first so it's behind) */}
      <Image
        src={nextProduct.image}
        alt={nextProduct.title}
        width={400}
        height={350}
        className="absolute inset-0 w-full h-full object-cover blur-sm"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-0">
        <h3 className="text-base font-bold text-foreground">{nextProduct.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{nextProduct.description}</p>
      </div>

      {/* Current Image (on top) */}
      <div
        className={`absolute inset-0 transition-all duration-500 ease-in-out z-10 ${
          isTransitioning ? `opacity-0 ${transitions[transitionType]}` : "opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0"
        }`}
      >
        <Image
          src={currentProduct.image}
          alt={currentProduct.title}
          width={400}
          height={350}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-base font-bold text-foreground">{currentProduct.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{currentProduct.description}</p>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {products.slice(0, 8).map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex % 8 ? "bg-primary w-4" : "bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function AboutSection() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [scrollDirection, setScrollDirection] = useState<"left" | "right" | "none">("none")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const animationRef = useRef<number | null>(null)
  const scrollPositionRef = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

  // Duplicate products for infinite loop
  const duplicatedProducts = [...products, ...products, ...products]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const carousel = carouselRef.current
    if (!carousel) return

    const scroll = () => {
      if (scrollDirection === "none") {
        animationRef.current = requestAnimationFrame(scroll)
        return
      }

      const speed = 2
      if (scrollDirection === "right") {
        scrollPositionRef.current += speed
      } else {
        scrollPositionRef.current -= speed
      }

      // Reset position for infinite loop
      const singleSetWidth = carousel.scrollWidth / 3
      if (scrollPositionRef.current >= singleSetWidth * 2) {
        scrollPositionRef.current = singleSetWidth
      } else if (scrollPositionRef.current <= 0) {
        scrollPositionRef.current = singleSetWidth
      }

      carousel.scrollLeft = scrollPositionRef.current
      animationRef.current = requestAnimationFrame(scroll)
    }

    // Initialize scroll position to middle set
    const singleSetWidth = carousel.scrollWidth / 3
    carousel.scrollLeft = singleSetWidth
    scrollPositionRef.current = singleSetWidth

    animationRef.current = requestAnimationFrame(scroll)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [scrollDirection, isMobile])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width
    const leftThreshold = width * 0.33
    const rightThreshold = width * 0.66

    if (x < leftThreshold) {
      setScrollDirection("left")
    } else if (x > rightThreshold) {
      setScrollDirection("right")
    } else {
      setScrollDirection("none")
    }
  }

  const handleMouseLeave = () => {
    setScrollDirection("none")
  }

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
            About <span className="text-primary">Mirt Suq</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg leading-relaxed text-pretty">
            Recently launched in the heart of Addis Ababa, Mirt Suq is your go-to hub for innovative gadgets and high-demand tech essentials. We bridge the gap between quality and affordability.{" "}
            <span className="text-primary font-semibold">Buy smart, pay less.</span>
          </p>
        </div>

        {/* Mobile: Single box with random transitions */}
        {isMobile && (
          <div className="md:hidden">
            <MobileProductSlider />
          </div>
        )}
      </div>

      {/* Desktop: Infinite Scroll Carousel */}
      {!isMobile && (
        <div
          className="relative overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Direction indicators */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className={`text-primary text-2xl transition-opacity duration-300 ${scrollDirection === "left" ? "opacity-100" : "opacity-30"}`}>
              {"<"}
            </div>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className={`text-primary text-2xl transition-opacity duration-300 ${scrollDirection === "right" ? "opacity-100" : "opacity-30"}`}>
              {">"}
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-6 md:gap-8 overflow-x-hidden py-8 px-6"
            style={{ scrollBehavior: "auto" }}
          >
            {duplicatedProducts.map((product, index) => (
              <div
                key={index}
                className={`relative flex-shrink-0 rounded-xl overflow-hidden bg-card border border-border transition-all duration-500 ${
                  hoveredIndex === index
                    ? "scale-125 z-20 border-primary/50 shadow-2xl shadow-primary/20"
                    : "scale-100 z-10"
                }`}
                style={{ width: 200, height: 260 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={260}
                  className="object-cover w-full h-full transition-transform duration-700"
                />
                {/* Overlay - Always visible for title */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                
                {/* Title - Always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-sm md:text-base font-bold text-foreground">
                    {product.title}
                  </h3>
                  {/* Description - Only on hover */}
                  <p className={`text-xs text-muted-foreground transition-all duration-300 ${
                    hoveredIndex === index ? "opacity-100 mt-1" : "opacity-0 h-0 overflow-hidden"
                  }`}>
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
