import { useState, useEffect, useCallback, useRef } from "react"
import {
  MessageCircle,
  MapPin,
  Clock,
  ArrowRight,
  Gift,
  Sparkles,
  Zap,
  Star,
  ShoppingBag,
  Heart,
  X,
  PartyPopper,
  Crown,
  Award,
} from "lucide-react"

// Declarar fbq para TypeScript
declare global {
  interface Window {
    fbq: (action: string, event: string, params?: Record<string, unknown>) => void
  }
}

// Helper para trackear eventos de Facebook Pixel - SOLO SE DISPARA CON SCROLL
let pixelFired = false
const trackFbEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params)
  }
}

const trackPageView = () => {
  if (!pixelFired && typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView")
    pixelFired = true
  }
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 0, minutes: 0, seconds: 0 })
  const couponCode = "#REDES"

  // Estado para el cupón flotante estilo Temu
  const [showFloatingCoupon, setShowFloatingCoupon] = useState(false)
  const [couponDismissed, setCouponDismissed] = useState(false)
  const [couponAnimating, setCouponAnimating] = useState(false)

  // Estado para el popup de salida inteligente
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [exitPopupDismissed, setExitPopupDismissed] = useState(false)
  const mouseYRef = useRef(0)
  const hasScrolledRef = useRef(false)
  const userConfirmedExitRef = useRef(false) // Flag para saber si el usuario confirmó salida
  const dismissCountRef = useRef(0) // Contador de veces que el usuario cierra el popup
  const [loadMap, setLoadMap] = useState(false)
  const comollegarRef = useRef<HTMLElement | null>(null)

  // TESTIMONIOS DE MUNDO DE TODO SPORT
  const testimonials = [
    {
      name: "Carlos Martínez",
      text: "Excelente variedad de productos y muy buenos precios",
      stars: 5,
    },
    {
      name: "María González",
      text: "Encontré todo lo que necesitaba, muy recomendado",
      stars: 5,
    },
    {
      name: "Luis Pérez",
      text: "Buena atención y productos de calidad",
      stars: 5,
    },
    {
      name: "Ana Rodríguez",
      text: "Los mejores precios de Montería",
      stars: 5,
    },
    {
      name: "Jorge Ramírez",
      text: "Excelente servicio, siempre encuentro lo que busco",
      stars: 5,
    },
  ]
  const testimonialsRibbon = [...testimonials, ...testimonials]

  // Detectar parámetros UTM y redirigir a #comollegar
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const source = urlParams.get('src') || urlParams.get('utm_source')

    if (source === 'meta_lpvt' || source === 'meta') {
      // Pequeño delay para que la página cargue
      setTimeout(() => {
        const section = document.getElementById('comollegar') || document.getElementById('sedes')
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
    }
  }, [])

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

    const handleScroll = () => {
      // Disparar PageView solo cuando hay scroll
      if (!hasScrolledRef.current && window.scrollY > 0) {
        hasScrolledRef.current = true
        trackPageView()
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Observer para cargar el iframe del mapa solo cuando la sección está cerca
  useEffect(() => {
    if (!comollegarRef.current) return
    if (loadMap) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setLoadMap(true)
      })
    }, { rootMargin: '200px' })
    obs.observe(comollegarRef.current)
    return () => obs.disconnect()
  }, [comollegarRef, loadMap])

  // Efecto para mostrar el cupón flotante después de 10 segundos
  useEffect(() => {
    if (couponDismissed) return

    const showTimer = setTimeout(() => {
      setShowFloatingCoupon(true)
      trackFbEvent("ViewContent", { content_name: "floating_coupon_shown" })
    }, 10000)

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
    window.open("https://wa.me/573122868911?text=%C2%A1Hola!%F0%9F%98%89", "_blank")
  }, [])

  const handleCouponRedeemClick = useCallback(() => {
    const message = `Vengo por el código ${couponCode}. ¿Qué productos tienen?`
    trackFbEvent("Lead", { content_name: "coupon_redeem", coupon_code: couponCode })
    window.open(`https://wa.me/573122868911?text=${encodeURIComponent(message)}`, "_blank")
  }, [couponCode])

  const handleMapClick = useCallback(() => {
    trackFbEvent("FindLocation", { content_name: "sede_lagranja" })
    // URL de Google Maps para Mundo de Todo Sport
    window.open("https://maps.app.goo.gl/n6hovMMUAzD2QbQJ6", "_blank")
  }, [])

  const handleViewStoresClick = useCallback(() => {
    trackFbEvent("ViewContent", { content_name: "view_stores" })
    setLoadMap(true)
    document.getElementById("comollegar")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleSocialClick = useCallback((platform: string) => {
    trackFbEvent("ViewContent", { content_name: `social_${platform}` })
  }, [])

  // Esta funcion ya no se usa explicitamente en el boton flotante, pero la dejo por si acaso
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

  // Detectar intento de salida del usuario
  useEffect(() => {
    if (couponDismissed) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseYRef.current = e.clientY
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Si el mouse sale por arriba de la página (intento de cerrar pestaña/ir a URL)
      if (e.clientY <= 0 && !showFloatingCoupon) {
        setShowExitPopup(true)
        trackFbEvent("ExitIntent", { content_name: "exit_popup_shown" })
      }
    }

    // Detectar intento de retroceso o recarga (beforeunload)
    // CRUCIAL: Esto SIEMPRE bloquea en móvil a menos que el usuario confirme salida
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Solo dejar salir si el usuario explícitamente confirmó
      if (!userConfirmedExitRef.current) {
        e.preventDefault()
        e.returnValue = '' // Chrome, Edge, Firefox requieren esto
        setShowExitPopup(true)
        trackFbEvent("ExitIntent", { content_name: "exit_popup_beforeunload" })
        return ''
      }
    }

    // Visibility change: on some mobile browsers beforeunload is unreliable
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !userConfirmedExitRef.current && !showFloatingCoupon) {
        setShowExitPopup(true)
        trackFbEvent("ExitIntent", { content_name: "exit_popup_visibility_hidden" })
      }
    }

    // pagehide fires on some navigations (mobile browsers)
    const handlePageHide = (e: PageTransitionEvent) => {
      if (!userConfirmedExitRef.current && !showFloatingCoupon) {
        setShowExitPopup(true)
        trackFbEvent("ExitIntent", { content_name: "exit_popup_pagehide" })
      }
    }

    // Handle back button: push a history state and intercept popstate to show popup
    const handlePopState = (e: PopStateEvent) => {
      if (!userConfirmedExitRef.current && !showFloatingCoupon) {
        setShowExitPopup(true)
        trackFbEvent("ExitIntent", { content_name: "exit_popup_popstate" })
        // Re-push state to keep user on page (soft trap). This is respectful only when showing an offer.
        history.pushState(null, document.title, location.href)
      }
    }

    // prime history to intercept back on mobile
    try {
      history.pushState(null, document.title, location.href)
    } catch (e) {
      // ignore
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pagehide', handlePageHide as EventListener)
    window.addEventListener('popstate', handlePopState)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pagehide', handlePageHide as EventListener)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [showFloatingCoupon, couponDismissed])

  const dismissExitPopup = useCallback(() => {
    dismissCountRef.current += 1
    // Si el usuario cierra el popup 2 veces, permitir que salga sin bloqueo
    if (dismissCountRef.current >= 2) {
      userConfirmedExitRef.current = true
    }
    setShowExitPopup(false)
    setExitPopupDismissed(true)
  }, [])

  const handleExitPopupClaim = useCallback(() => {
    trackFbEvent("Lead", { content_name: "exit_popup_claim" })
    setShowExitPopup(false)
    setExitPopupDismissed(true)
    document.getElementById("cupon-section")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* 
         NOTA: Usamos bg-white como base, pero el usuario pidió que fuera 'tal cual' la otra pagina.
         La otra página tiene un gradiente de fondo. Voy a poner el gradiente pero muy suave y blanco, 
         o mantener el blanco puro que es la identidad actual de Mundo de Todo Sport.
         El usuario anterior pidió "fondo blanco". Voy a respetar "bg-white" para ser fiel a la identidad visual definida previamente.
      */}

      {/* FLOATING COUPON - Estilo Temu */}
      {showFloatingCoupon && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm transition-all duration-500 ${couponAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          onClick={dismissFloatingCoupon}
        >
          <div
            className={`relative bg-gradient-to-br from-red-600 via-orange-600 to-red-700 rounded-2xl sm:rounded-3xl p-1 shadow-2xl max-w-[340px] sm:max-w-sm w-full transform transition-all duration-500 ${couponAnimating ? "translate-y-20 opacity-0 scale-90" : "translate-y-0 opacity-100 scale-100"
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
                <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 animate-bounce" />
                <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 animate-pulse" />
                <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 animate-bounce" />
              </div>

              {/* Mensaje de exclusividad */}
              <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4">
                <p className="text-[10px] sm:text-xs font-bold text-red-700 uppercase tracking-wide">
                  ⚡ Reservado solo para ti ⚡
                </p>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-1 sm:mb-2">¡Eres cliente VIP! 🌟</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Hemos guardado un <span className="font-bold text-red-700">descuento exclusivo</span> que solo tú puedes
                usar
              </p>

              {/* Código del cupón */}
              <div className="relative mb-3 sm:mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-lg sm:rounded-xl blur-md opacity-60" />
                <div className="relative bg-gradient-to-r from-red-50 to-orange-50 border-2 sm:border-3 border-dashed border-red-500 rounded-lg sm:rounded-xl py-2 sm:py-3 px-3 sm:px-4">
                  <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-red-700 to-orange-600 bg-clip-text text-transparent tracking-wider">
                    {couponCode}
                  </p>
                </div>
              </div>

              {/* Urgencia */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 text-orange-700">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                <p className="text-[10px] sm:text-xs font-bold">Válido solo por tiempo limitado</p>
              </div>

              {/* CTA */}
              <button
                onClick={handleCouponRedeemClick}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
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

      {/* EXIT INTENT POPUP */}
      {showExitPopup && (
        <div
          className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md transition-all duration-500 animate-in fade-in"
          onClick={dismissExitPopup}
        >
          <div
            className="relative bg-gradient-to-br from-red-600 via-orange-600 to-red-700 rounded-3xl p-1 shadow-2xl max-w-md w-full transform transition-all duration-500 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={dismissExitPopup}
              className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg z-10 hover:scale-110 transition-transform"
              type="button"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center">
              {/* Emoji grande */}
              <div className="text-6xl mb-4 animate-bounce">
                {dismissCountRef.current >= 1 ? '👋' : '😱'}
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                {dismissCountRef.current >= 1 ? '¿Seguro que te vas?' : '¡ESPERA! ¡No te vayas!'}
              </h3>

              <p className="text-base sm:text-lg text-gray-700 mb-4 font-bold">
                {dismissCountRef.current >= 1 ? (
                  'No te cobraremos nada, solo queremos darte una oportunidad más'
                ) : (
                  <>
                    Tenemos una <span className="text-red-600">OFERTA ESPECIAL</span> solo para ti
                  </>
                )}
              </p>

              {/* Código del cupón */}
              <div className="relative mb-5">
                <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-orange-300 rounded-xl blur-lg opacity-60" />
                <div className="relative bg-gradient-to-r from-red-50 to-orange-50 border-3 border-dashed border-red-500 rounded-xl py-4 px-4">
                  <p className="text-xs text-gray-600 font-bold mb-1">USA ESTE CÓDIGO:</p>
                  <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent tracking-wider">
                    {couponCode}
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border-2 border-red-400 rounded-xl p-3 mb-5">
                <p className="text-red-800 font-bold text-sm flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  ¡Descuento exclusivo al mencionar el código!
                </p>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  onClick={handleExitPopupClaim}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-black py-4 px-6 rounded-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-xl text-base"
                  type="button"
                >
                  <Gift className="w-5 h-5" />
                  <span>{dismissCountRef.current >= 1 ? '¡Está bien, quiero mi descuento!' : '¡SÍ! Quiero mi descuento'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={dismissExitPopup}
                  className="w-full text-gray-500 hover:text-gray-700 font-semibold py-2 text-sm transition-colors"
                  type="button"
                >
                  {dismissCountRef.current >= 1 ? 'Ok, déjame irme' : 'No gracias, prefiero pagar precio completo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* HEADER - Info rápida */}
      <header className="bg-gradient-to-r from-red-800 to-orange-700 text-white py-2 sm:py-3 px-3 sm:px-4 text-center text-[11px] sm:text-sm font-bold">
        <p>⏰ Lunes a Domingo: 9:00 AM - 9:00 PM</p>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden site-hero">
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-orange-600 to-red-700 opacity-95 site-hero-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

        <div className="relative container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-20 text-center space-y-4 sm:space-y-6 md:space-y-8">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <div className="inline-block bg-white px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 rounded-2xl sm:rounded-3xl shadow-2xl mb-3 sm:mb-4">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-red-700 via-orange-600 to-red-700 bg-clip-text text-transparent leading-tight">
                MUNDO DE TODO SPORT
              </h1>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-red-100 font-bold mb-2 sm:mb-3 drop-shadow-sm">
              🎒 TEMPORADA ESCOLAR 2026 🎒
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-8 shadow-2xl border-2 sm:border-4 border-white/50">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6">
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-600 animate-bounce" />
                <p className="text-red-700 font-black text-base sm:text-lg md:text-2xl">¡OFERTA TERMINA EN!</p>
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-600 animate-bounce" />
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {[
                  { label: "Días", value: timeLeft.days },
                  { label: "Horas", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Seg", value: timeLeft.seconds },
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl sm:rounded-2xl blur opacity-75" />
                    <div className="relative bg-gradient-to-br from-red-600 to-orange-600 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-6 transform hover:scale-105 transition-all duration-300 shadow-xl">
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
              className="group relative w-full sm:w-auto justify-center bg-gradient-to-r from-blue-700 to-purple-800 hover:from-blue-800 hover:to-purple-900 text-white px-5 sm:px-6 md:px-10 py-3 sm:py-3.5 md:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              type="button"
            >
              <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 relative z-10 flex-shrink-0" />
              <span className="relative z-10 whitespace-nowrap">Ver ubicación</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform relative z-10 flex-shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* CUPÓN SECTION */}
      <section id="cupon-section" className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-10 sm:py-14 md:py-16">
        <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
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
                Cupón exclusivo
              </h2>

              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl transform hover:scale-[1.02] transition-transform">
                  <p className="text-gray-700 font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                    Menciona este código en caja
                  </p>

                  <div className="relative mb-4 sm:mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-orange-300 rounded-xl sm:rounded-2xl blur-xl" />
                    <div className="relative w-full bg-gradient-to-r from-red-100 to-orange-100 border-3 sm:border-4 border-dashed border-red-600 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-red-700 to-orange-600 bg-clip-text text-transparent tracking-widest">
                        {couponCode}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleCouponRedeemClick}
                    className="mt-4 sm:mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-black py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mx-auto text-sm sm:text-base md:text-lg shadow-lg"
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

      <section id="comollegar" className="w-full py-10 sm:py-12 px-3 sm:px-4 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-8 sm:mb-12">
            😀 Ven a Visítarnos 👈
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {/* Sede La Granja (UNICA SEDE DE MUNDO DE TODO SPORT) */}
            <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] md:hover:scale-105 transition-all duration-300">
              <div className="relative bg-gradient-to-r from-red-700 to-orange-600 p-4 sm:p-6 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-1.5 sm:mb-2 mx-auto relative z-10" />
                <h3 className="text-xl sm:text-2xl font-black text-white relative z-10">Mundo de Todo Sport</h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-4 sm:mb-6">
                  <div ref={(el) => (comollegarRef.current = el as HTMLElement)}>
                    {loadMap ? (
                      <iframe
                        title="Mapa Mundo de Todo Sport"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15774.096421085911!2d-75.91162852761718!3d8.736656453826122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5a3149bdf3320f%3A0x81db1251c71627ab!2sMundo%20de%20Todo%20Sport!5e0!3m2!1ses-419!2sco!4v1770391755052!5m2!1ses-419!2sco"
                        className="w-full h-64 sm:h-80 border-0"
                        referrerPolicy="no-referrer-when-downgrade"
                        loading="lazy"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-64 sm:h-80 bg-gray-100 flex items-center justify-center text-center p-4">
                        <div>
                          <p className="font-bold text-gray-700 mb-2">Mapa (cargado bajo demanda)</p>
                          <p className="text-xs text-gray-500 mb-3">Pulsa para cargar el mapa y ahorrar datos en la primera vista.</p>
                          <div className="flex items-center justify-center">
                            <button onClick={() => setLoadMap(true)} className="px-4 py-2 bg-red-600 text-white rounded-lg">Cargar mapa</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5 mb-4 sm:mb-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-orange-100 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-7 sm:h-7 text-orange-700" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-base sm:text-lg">La Granja - Transv. 5 Diag 9 y 10</p>
                      <p className="text-gray-600 font-semibold text-sm sm:text-base">
                        Al Lado del MiniMarket
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
                  onClick={handleMapClick}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 transition-all shadow-xl transform hover:scale-[1.02]"
                  type="button"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                  <span className="whitespace-nowrap">Ver en Google Maps</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8 sm:py-12 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="bg-gradient-to-r from-blue-700 to-purple-800 rounded-[2rem] shadow-2xl shadow-purple-900/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
            <div className="text-center md:text-left space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                ¡Únete a nuestra comunidad! 🚀
              </h2>
              <p className="text-purple-200 font-medium">
                Síguenos y no te pierdas ninguna oferta
              </p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/mundodetodosport/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick("instagram")}
                className="group flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 p-[2px] rounded-full hover:scale-110 transition-transform shadow-md">
                  <div className="w-full h-full bg-slate-900/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <img loading="lazy" src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-purple-200 group-hover:text-pink-400 transition-colors">Instagram</span>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@mundodetodo.sport"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick("tiktok")}
                className="group flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-[#69C9D0] to-[#EE1D52] p-[2px] rounded-full hover:scale-110 transition-transform shadow-md">
                  <div className="w-full h-full bg-slate-900/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <img loading="lazy" src="/icons/tiktok.svg" alt="TikTok" className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-purple-200 group-hover:text-white transition-colors">TikTok</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/mundodetodosport/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick("facebook")}
                className="group flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 p-[2px] rounded-full hover:scale-110 transition-transform shadow-md">
                  <div className="w-full h-full bg-slate-900/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <img loading="lazy" src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-purple-200 group-hover:text-blue-400 transition-colors">Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-10 sm:py-16 mt-6 sm:mt-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_70%)]" />

        <div className="relative container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              MUNDO DE TODO SPORT
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <h4 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6">⭐ ¿Por qué elegirnos? ⭐</h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                  <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 inline-flex">
                    <ShoppingBag className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <p className="mt-3 sm:mt-4 font-black text-sm sm:text-base">Gran variedad</p>
                  <p className="text-xs sm:text-sm text-gray-300 font-semibold">Artículos deportivos</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                  <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 inline-flex">
                    <Award className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <p className="mt-3 sm:mt-4 font-black text-sm sm:text-base">Calidad garantizada</p>
                  <p className="text-xs sm:text-sm text-gray-300 font-semibold">Productos de primera</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                  <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 inline-flex">
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
                    ["--marquee-duration" as never]: "12s",
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
              <h4 className="font-black text-base sm:text-lg mb-2 sm:mb-3">📍 Ubicación</h4>
              <p className="text-gray-300 text-xs sm:text-sm mb-1 sm:mb-2">La Granja - Transv. 5 Diag 9 y 10</p>
              <p className="text-gray-300 text-xs sm:text-sm">Al Lado del MiniMarket</p>
            </div>

            <div>
              <h4 className="font-black text-base sm:text-lg mb-2 sm:mb-3">⏰ Horario</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Lunes - Domingo</p>
              <p className="text-gray-200 text-xs sm:text-sm font-black">9:00 AM - 9:00 PM</p>
            </div>

            <div>
              <h4 className="font-black text-base sm:text-lg mb-2 sm:mb-3">💬 Contacto</h4>
              <p className="text-gray-300 text-xs sm:text-sm">WhatsApp: +57 312 286 8911</p>
              <p className="text-gray-300 text-xs sm:text-sm">Montería, Córdoba</p>
            </div>
          </div>

          <div className="border-t border-gray-700/70 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="font-bold text-xs sm:text-sm">© 2026 Mundo de Todo Sport. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <button
        onClick={handleViewStoresClick}
        className="fixed bottom-20 sm:bottom-24 md:bottom-28 right-4 sm:right-6 z-50 bg-white/90 hover:bg-white rounded-full p-1 sm:p-1.5 shadow-2xl ring-2 ring-white/80 transform hover:scale-110 transition-all animate-bounce w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center overflow-hidden"
        aria-label="Ir a ubicación"
        type="button"
      >
        <picture className="w-full h-full rounded-full overflow-hidden">
          <source srcSet="/images/logo.webp" type="image/webp" />
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-full h-full rounded-full object-cover"
            loading="lazy"
          />
        </picture>
      </button>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all z-50 overflow-hidden animate-bounce"
        aria-label="Contactar por WhatsApp"
        type="button"
      >
        <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
      </button>
    </div>
  )
}
