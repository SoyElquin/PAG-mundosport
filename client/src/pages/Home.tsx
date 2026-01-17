import { useState, useEffect, useCallback } from "react"
import {
  MessageCircle,
  MapPin,
  Clock,
  ArrowRight,
  Gift,
  Sparkles,
  Zap,
  Trophy,
  Star,
  ShoppingBag,
  Heart,
  X,
  PartyPopper,
  Crown,
} from "lucide-react"

// Declarar fbq para TypeScript
declare global {
  interface Window {
    fbq: (action: string, event: string, params?: Record<string, unknown>) => void
  }
}

// Helper para trackear eventos de Facebook Pixel
const trackFbEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params)
  }
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 0, minutes: 0, seconds: 0 })
  const couponCode = "#REDES"
  const [scrollY, setScrollY] = useState(0)

  // Estado para el cupón flotante estilo Temu
  const [showFloatingCoupon, setShowFloatingCoupon] = useState(false)
  const [couponDismissed, setCouponDismissed] = useState(false)
  const [couponAnimating, setCouponAnimating] = useState(false)

  const testimonials = [
    {
      name: "Valeria Uparela Humanez",
      text: "Excelente atención, ropa y productos a muy buen precio",
      stars: 5,
    },
    {
      name: "Oscar Uparela osorio",
      text: "Mercancía de excelente calidad y una muy buena atención",
      stars: 5,
    },
    {
      name: "Wilfrido Vargas",
      text: "Muy buenos precios, muy buena atención , recomendado",
      stars: 5,
    },
    {
      name: "Julio Cesar Humanez Peñata",
      text: "Precios super economicos",
      stars: 5,
    },
    {
      name: "Nataly Genes luna",
      text: "Excelente",
      stars: 5,
    },
  ]
  const testimonialsRibbon = [...testimonials, ...testimonials]

  useEffect(() => {
    const deadline = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
    const timer = setInterval(() => {
      const now = new Date()
      const difference = deadline.getTime() - now.getTime()
      if (difference > 0) {
        const dayMs = 1000 * 60 * 60 * 24
        setTimeLeft({
          days: Math.max(0, Math.ceil(difference / dayMs)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }, 1000)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Efecto para mostrar el cupón flotante después de 3 segundos
  useEffect(() => {
    if (couponDismissed) return

    const showTimer = setTimeout(() => {
      setShowFloatingCoupon(true)
      trackFbEvent("ViewContent", { content_name: "floating_coupon_shown" })
    }, 3000)

    return () => clearTimeout(showTimer)
  }, [couponDismissed])

  // Auto-ocultar el cupón flotante después de 12 segundos y animarlo hacia la sección de cupón
  useEffect(() => {
    if (!showFloatingCoupon || couponDismissed) return

    const hideTimer = setTimeout(() => {
      setCouponAnimating(true)
      setTimeout(() => {
        setShowFloatingCoupon(false)
        setCouponAnimating(false)
        setCouponDismissed(true)
      }, 800)
    }, 12000)

    return () => clearTimeout(hideTimer)
  }, [showFloatingCoupon, couponDismissed])

  const handleWhatsAppClick = useCallback(() => {
    trackFbEvent("Contact", { content_name: "whatsapp_main" })
    window.open("https://wa.me/573193747486?text=%C2%A1Hola!%F0%9F%98%89", "_blank")
  }, [])

  const handleCouponRedeemClick = useCallback(() => {
    const message = `Vengo por el código ${couponCode}. ¿Qué productos tienen?`
    trackFbEvent("Lead", { content_name: "coupon_redeem", coupon_code: couponCode })
    window.open(`https://wa.me/573193747486?text=${encodeURIComponent(message)}`, "_blank")
  }, [couponCode])

  const handleMapClick = useCallback((sede: "cantaclaro" | "lagranja") => {
    trackFbEvent("FindLocation", { content_name: `sede_${sede}` })
    const urls = {
      cantaclaro:
        "https://www.google.com/maps/search/?api=1&query=Calle+27+%2331-04%2C+Monter%C3%ADa%2C+C%C3%B3rdoba%2C+Colombia",
      lagranja:
        "https://www.google.com/maps/search/?api=1&query=Transversal+5+%2311-15%2C+Monter%C3%ADa%2C+C%C3%B3rdoba%2C+Colombia",
    }
    window.open(urls[sede], "_blank")
  }, [])

  const handleViewStoresClick = useCallback(() => {
    trackFbEvent("ViewContent", { content_name: "view_stores" })
    document.getElementById("sedes")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleSocialClick = useCallback((platform: string) => {
    trackFbEvent("ViewContent", { content_name: `social_${platform}` })
  }, [])

  const handleFloatingCouponClick = useCallback(() => {
    trackFbEvent("Lead", { content_name: "floating_coupon_click" })
    setCouponAnimating(true)
    setTimeout(() => {
      setShowFloatingCoupon(false)
      setCouponAnimating(false)
      setCouponDismissed(true)
      document.getElementById("cupon-section")?.scrollIntoView({ behavior: "smooth" })
    }, 500)
  }, [])

  const dismissFloatingCoupon = useCallback(() => {
    setCouponAnimating(true)
    setTimeout(() => {
      setShowFloatingCoupon(false)
      setCouponAnimating(false)
      setCouponDismissed(true)
    }, 300)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 overflow-x-hidden">
      <div
        className="fixed inset-0 bg-gradient-to-br from-yellow-100/20 via-orange-100/20 to-red-100/20 pointer-events-none scroll-parallax"
      />

      {/* FLOATING COUPON - Estilo Temu */}
      {showFloatingCoupon && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm transition-all duration-500 ${
            couponAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
          onClick={dismissFloatingCoupon}
        >
          <div
            className={`relative bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400 rounded-2xl sm:rounded-3xl p-1 shadow-2xl max-w-[340px] sm:max-w-sm w-full transform transition-all duration-500 ${
              couponAnimating ? "translate-y-20 opacity-0 scale-90" : "translate-y-0 opacity-100 scale-100"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={dismissFloatingCoupon}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-white rounded-full p-1.5 sm:p-2 shadow-lg z-10 hover:scale-110 transition-transform"
              type="button"
              aria-label="Cerrar cupón"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>

            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
              {/* Header con confeti */}
              <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 animate-bounce" />
                <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 animate-pulse" />
                <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 animate-bounce" />
              </div>

              {/* Mensaje de exclusividad */}
              <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4">
                <p className="text-[10px] sm:text-xs font-bold text-red-600 uppercase tracking-wide">
                  ⚡ Reservado solo para ti ⚡
                </p>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-1 sm:mb-2">¡Eres cliente VIP! 🌟</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Hemos guardado un <span className="font-bold text-red-600">descuento exclusivo</span> que solo tú puedes
                usar
              </p>

              {/* Código del cupón */}
              <div className="relative mb-3 sm:mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-orange-300 rounded-lg sm:rounded-xl blur-md opacity-60" />
                <div className="relative bg-gradient-to-r from-red-50 to-orange-50 border-2 sm:border-3 border-dashed border-red-400 rounded-lg sm:rounded-xl py-2 sm:py-3 px-3 sm:px-4">
                  <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent tracking-wider">
                    {couponCode}
                  </p>
                </div>
              </div>

              {/* Urgencia */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 text-orange-600">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                <p className="text-[10px] sm:text-xs font-bold">Válido solo por tiempo limitado</p>
              </div>

              {/* CTA */}
              <button
                onClick={handleFloatingCouponClick}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
                type="button"
              >
                <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>¡Quiero mi descuento!</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>

              <p className="text-[9px] sm:text-[10px] text-gray-400 mt-2 sm:mt-3">
                Menciona el código en caja para aplicar
              </p>
            </div>
          </div>
        </div>
      )}

      {/* HEADER - Info rápida */}
      <header className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 sm:py-3 px-3 sm:px-4 text-center text-[11px] sm:text-sm font-bold">
        <p>⏰ Lunes a Domingo: 9:00 AM - 9:00 PM</p>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

        <div className="relative container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-20 text-center space-y-4 sm:space-y-6 md:space-y-8">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <div className="inline-block bg-white px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 rounded-2xl sm:rounded-3xl shadow-2xl mb-3 sm:mb-4">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent leading-tight">
                ROPA EL MEJOR PRECIO
              </h1>
            </div>

            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-pulse" />
              <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-white font-black drop-shadow-lg">
                De Todo y Baratico
              </p>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-pulse" />
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white font-bold mb-2 sm:mb-3 drop-shadow-lg">
              🎒 TEMPORADA ESCOLAR 2026 🎒
            </p>
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-yellow-100 font-semibold drop-shadow-md">
              Todo lo que necesitas para el regreso a clases
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-8 shadow-2xl border-2 sm:border-4 border-white/50">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6">
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500 animate-bounce" />
                <p className="text-red-600 font-black text-base sm:text-lg md:text-2xl">¡OFERTA TERMINA EN!</p>
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500 animate-bounce" />
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {[
                  { label: "Días", value: timeLeft.days },
                  { label: "Horas", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Seg", value: timeLeft.seconds },
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl sm:rounded-2xl blur opacity-75" />
                    <div className="relative bg-gradient-to-br from-red-500 to-orange-500 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-6 transform hover:scale-105 transition-all duration-300 shadow-xl">
                      <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-white mb-0.5 sm:mb-1">
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-base text-white font-bold opacity-90">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 text-gray-600 text-xs sm:text-sm font-semibold">
                ⚡ ¡No dejes pasar esta oportunidad!
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center pt-2 max-w-md sm:max-w-none mx-auto px-2">
            <button
              onClick={handleWhatsAppClick}
              className="group relative w-full sm:w-auto justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 sm:px-6 md:px-10 py-3 sm:py-3.5 md:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              type="button"
            >
              <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 relative z-10 flex-shrink-0" />
              <span className="relative z-10 whitespace-nowrap">Escribir ahora</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform relative z-10 flex-shrink-0" />
            </button>

            <button
              onClick={handleViewStoresClick}
              className="group relative w-full sm:w-auto justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-5 sm:px-6 md:px-10 py-3 sm:py-3.5 md:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              type="button"
            >
              <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 relative z-10 flex-shrink-0" />
              <span className="relative z-10 whitespace-nowrap">📍 Ver Tiendas</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform relative z-10 flex-shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* CUPÓN SECTION */}
      <section id="cupon-section" className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-10 sm:py-14 md:py-16">
        <div className="relative bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_70%)]" />

          <div className="relative p-4 sm:p-6 md:p-10">
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping">
                    <Gift className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white opacity-75" />
                  </div>
                  <Gift className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white relative z-10" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-lg">
                Cupon exclusivo
              </h2>

              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl transform hover:scale-[1.02] transition-transform">
                  <p className="text-gray-700 font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                    Menciona este código en caja
                  </p>

                  <div className="relative mb-4 sm:mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-orange-200 rounded-xl sm:rounded-2xl blur-xl" />
                    <div className="relative w-full bg-gradient-to-r from-red-100 to-orange-100 border-3 sm:border-4 border-dashed border-red-500 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent tracking-widest">
                        {couponCode}
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border-2 border-green-500 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-green-700 font-bold text-base sm:text-lg md:text-xl flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
                      <Trophy className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <span>¡DESCUENTO ESPECIAL INSTANTÁNEO!</span>
                    </p>
                  </div>

                  <button
                    onClick={handleCouponRedeemClick}
                    className="mt-4 sm:mt-6 w-full bg-black hover:bg-gray-900 text-white font-black py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mx-auto text-sm sm:text-base md:text-lg"
                    type="button"
                  >
                    <span>Redimir ahora</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sedes" className="w-full py-10 sm:py-12 px-3 sm:px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-8 sm:mb-12">
            🏪 Visítanos en Nuestras Sedes 🏪
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Sede Cantaclaro */}
            <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] md:hover:scale-105 transition-all duration-300">
              <div className="relative bg-gradient-to-r from-red-500 to-orange-500 p-4 sm:p-6 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-1.5 sm:mb-2 mx-auto relative z-10" />
                <h3 className="text-xl sm:text-2xl font-black text-white relative z-10">Sede Cantaclaro</h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-4 sm:mb-6">
                  <iframe
                    title="Mapa Sede Cantaclaro"
                    src="https://www.google.com/maps?q=Calle%2027%20%2331-04%2C%20Monter%C3%ADa%2C%20C%C3%B3rdoba%2C%20Colombia&output=embed"
                    className="w-full h-48 sm:h-64 border-0"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <div className="space-y-4 sm:space-y-5 mb-4 sm:mb-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-red-100 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-7 sm:h-7 text-red-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-base sm:text-lg">Calle 27 #31-04</p>
                      <p className="text-gray-600 font-semibold text-sm sm:text-base">Frente a Droguería La Botica</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="bg-blue-100 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                      <Clock className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">Lunes a Domingo</p>
                      <p className="text-gray-600 text-sm sm:text-base">9:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleMapClick("cantaclaro")}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 transition-all shadow-xl transform hover:scale-[1.02]"
                  type="button"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                  <span className="whitespace-nowrap">Abrir en Google Maps</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                </button>
              </div>
            </div>

            {/* Sede La Granja */}
            <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] md:hover:scale-105 transition-all duration-300">
              <div className="relative bg-gradient-to-r from-orange-500 to-yellow-500 p-4 sm:p-6 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-1.5 sm:mb-2 mx-auto relative z-10" />
                <h3 className="text-xl sm:text-2xl font-black text-white relative z-10">Sede La Granja</h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-4 sm:mb-6">
                  <iframe
                    title="Mapa Sede La Granja"
                    src="https://www.google.com/maps?q=Transversal%205%20%2311-15%2C%20Monter%C3%ADa%2C%20C%C3%B3rdoba%2C%20Colombia&output=embed"
                    className="w-full h-48 sm:h-64 border-0"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <div className="space-y-4 sm:space-y-5 mb-4 sm:mb-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-orange-100 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-7 sm:h-7 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-base sm:text-lg">Transversal 5 #11-15</p>
                      <p className="text-gray-600 font-semibold text-sm sm:text-base">
                        Diagonal a Panadería La Insuperable
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="bg-blue-100 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                      <Clock className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">Lunes a Domingo</p>
                      <p className="text-gray-600 text-sm sm:text-base">9:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleMapClick("lagranja")}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 transition-all shadow-xl transform hover:scale-[1.02]"
                  type="button"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                  <span className="whitespace-nowrap">Abrir en Google Maps</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-10 sm:py-14 md:py-16 px-3 sm:px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 p-4 sm:p-5 md:p-8">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-center text-white drop-shadow-lg">
                🎁 ¡Síguenos y Activa tu Cupón! 🎁
              </h2>
              <p className="text-center text-white text-xs sm:text-sm md:text-lg mt-1.5 sm:mt-2 font-semibold">
                Entérate de ofertas exclusivas antes que nadie
              </p>
            </div>

            <div className="p-4 sm:p-5 md:p-8">
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                <a
                  href="https://www.instagram.com/almacen.elmejorprecio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick("instagram")}
                  className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white hover:shadow-xl sm:hover:shadow-2xl transform hover:scale-[1.02] md:hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  <img
                    src="/icons/instagram.svg"
                    alt="Instagram"
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-3 sm:mb-4 mx-auto relative z-10 group-hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                  <p className="font-black text-center text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2 relative z-10">
                    Seguir en Instagram
                  </p>
                  <p className="text-center text-xs sm:text-sm opacity-90 relative z-10">@almacen.elmejorprecio</p>
                  <div className="mt-3 sm:mt-4 text-center relative z-10">
                    <span className="bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                      ¡Síguenos ahora!
                    </span>
                  </div>
                </a>

                <a
                  href="https://www.tiktok.com/@ropa.elmejorprecio"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick("tiktok")}
                  className="group relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-950 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white hover:shadow-xl sm:hover:shadow-2xl transform hover:scale-[1.02] md:hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  <img
                    src="/icons/tiktok.svg"
                    alt="TikTok"
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-3 sm:mb-4 mx-auto relative z-10 group-hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                  <p className="font-black text-center text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2 relative z-10">
                    Seguir en TikTok
                  </p>
                  <p className="text-center text-xs sm:text-sm opacity-90 relative z-10">@ropa.elmejorprecio</p>
                  <div className="mt-3 sm:mt-4 text-center relative z-10">
                    <span className="bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                      ¡Únete ahora!
                    </span>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/RopaElMejorPrecio"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick("facebook")}
                  className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white hover:shadow-xl sm:hover:shadow-2xl transform hover:scale-[1.02] md:hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  <img
                    src="/icons/facebook.svg"
                    alt="Facebook"
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-3 sm:mb-4 mx-auto relative z-10 group-hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                  <p className="font-black text-center text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2 relative z-10">
                    Seguir en Facebook
                  </p>
                  <p className="text-center text-xs sm:text-sm opacity-90 relative z-10">Ropa El Mejor Precio</p>
                  <div className="mt-3 sm:mt-4 text-center relative z-10">
                    <span className="bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                      ¡Dale Me Gusta!
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-10 sm:py-16 mt-6 sm:mt-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_70%)]" />

        <div className="relative container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              ROPA EL MEJOR PRECIO
            </h3>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-200">De Todo y Baratico</p>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <h4 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6">⭐ ¿Por qué elegirnos? ⭐</h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 inline-flex">
                    <ShoppingBag className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <p className="mt-3 sm:mt-4 font-black text-sm sm:text-base">Gran variedad</p>
                  <p className="text-xs sm:text-sm text-gray-300 font-semibold">Todo para la familia</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 inline-flex">
                    <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <p className="mt-3 sm:mt-4 font-black text-sm sm:text-base">Precios increíbles</p>
                  <p className="text-xs sm:text-sm text-gray-300 font-semibold">Barato de verdad</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                  <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 inline-flex">
                    <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <p className="mt-3 sm:mt-4 font-black text-sm sm:text-base">Atención cercana</p>
                  <p className="text-xs sm:text-sm text-gray-300 font-semibold">Te atendemos como en casa</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <h4 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">💬 Testimonios</h4>
              <p className="text-gray-300 font-semibold mb-4 sm:mb-6 text-sm sm:text-base">
                Lo que dicen nuestros clientes
              </p>

              <div className="marquee rounded-xl sm:rounded-2xl">
                <div
                  className="marqueeTrack"
                  style={{
                    ["--marquee-duration" as never]: "22s",
                  }}
                >
                  {testimonialsRibbon.map((t, idx) => (
                    <div
                      key={`${t.name}-${idx}`}
                      className={`${idx === 0 ? "" : "ml-4 sm:ml-6"} flex-shrink-0 w-[240px] sm:w-[280px] md:w-[340px]`}
                    >
                      <div className="h-full bg-white/10 border border-white/15 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <p className="font-black text-white text-sm sm:text-base truncate">{t.name}</p>
                          <div className="flex items-center gap-0.5 sm:gap-1 text-yellow-300 flex-shrink-0">
                            {Array.from({ length: t.stars }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-200 font-semibold text-xs sm:text-sm">{t.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10 text-center">
            <div>
              <h4 className="font-black text-base sm:text-lg mb-2 sm:mb-3">📍 Ubicaciones</h4>
              <p className="text-gray-300 text-xs sm:text-sm mb-1 sm:mb-2">Cantaclaro: Calle 27 #31-04</p>
              <p className="text-gray-300 text-xs sm:text-sm">La Granja: Transversal 5 #11-15</p>
            </div>

            <div>
              <h4 className="font-black text-base sm:text-lg mb-2 sm:mb-3">⏰ Horario</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Lunes - Domingo</p>
              <p className="text-gray-200 text-xs sm:text-sm font-black">9:00 AM - 9:00 PM</p>
            </div>

            <div>
              <h4 className="font-black text-base sm:text-lg mb-2 sm:mb-3">💬 Contacto</h4>
              <p className="text-gray-300 text-xs sm:text-sm">WhatsApp: +57 319 3747486</p>
              <p className="text-gray-300 text-xs sm:text-sm">Montería, Córdoba</p>
            </div>
          </div>

          <div className="border-t border-gray-700/70 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="font-bold text-xs sm:text-sm">© 2026 Ropa El Mejor Precio. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <button
        onClick={handleViewStoresClick}
        className="fixed bottom-20 sm:bottom-24 md:bottom-28 right-4 sm:right-6 z-50 bg-white/90 hover:bg-white rounded-full p-1 sm:p-1.5 shadow-2xl ring-2 ring-white/80 transform hover:scale-110 transition-all animate-bounce"
        aria-label="Ir a ubicaciones"
        type="button"
      >
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full object-cover"
          loading="lazy"
        />
      </button>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-green-500 hover:bg-green-600 text-white p-2.5 sm:p-3 md:p-4 rounded-full shadow-2xl transform hover:scale-110 sm:hover:scale-125 transition-all animate-bounce z-50"
        aria-label="Contactar por WhatsApp"
        type="button"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
      </button>
    </div>
  )
}
