import { useState, useEffect } from "react";
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
} from "lucide-react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 0, minutes: 0, seconds: 0 });
  const couponCode = "#REDES";
  const [scrollY, setScrollY] = useState(0);

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
  ];
  const testimonialsRibbon = [...testimonials, ...testimonials];

  useEffect(() => {
    const deadline = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
    const timer = setInterval(() => {
      const now = new Date();
      const difference = deadline.getTime() - now.getTime();
      if (difference > 0) {
        const dayMs = 1000 * 60 * 60 * 24;
        setTimeLeft({
          days: Math.max(0, Math.ceil(difference / dayMs)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/573193747486?text=%C2%A1Hola!%F0%9F%98%89", "_blank");
  };

  const handleCouponRedeemClick = () => {
    const message = `Vengo por el código ${couponCode}. ¿Qué productos tienen?`;
    window.open(`https://wa.me/573193747486?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleMapClick = (sede: "cantaclaro" | "lagranja") => {
    const urls = {
      cantaclaro:
        "https://www.google.com/maps/search/?api=1&query=Calle+27+%2331-04%2C+Monter%C3%ADa%2C+C%C3%B3rdoba%2C+Colombia",
      lagranja:
        "https://www.google.com/maps/search/?api=1&query=Transversal+5+%2311-15%2C+Monter%C3%ADa%2C+C%C3%B3rdoba%2C+Colombia",
    };
    window.open(urls[sede], "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-gradient-to-br from-yellow-100/20 via-orange-100/20 to-red-100/20 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      {/* HEADER - Info rápida */}
      <header className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 px-4 text-center text-xs sm:text-sm font-bold">
        <p>⏰ Lunes a Domingo: 9:00 AM - 9:00 PM</p>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

        <div className="relative container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center space-y-6 sm:space-y-8">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <div className="inline-block bg-white px-6 py-4 md:px-8 md:py-4 rounded-3xl shadow-2xl mb-4">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                ROPA EL MEJOR PRECIO
              </h1>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              <p className="text-xl sm:text-2xl md:text-4xl text-white font-black drop-shadow-lg">De Todo y Baratico</p>
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl md:text-3xl text-white font-bold mb-3 drop-shadow-lg">🎒 TEMPORADA ESCOLAR 2026 🎒</p>
            <p className="text-base sm:text-lg md:text-2xl text-yellow-100 font-semibold drop-shadow-md">
              Todo lo que necesitas para el regreso a clases
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl border-4 border-white/50">
              <div className="flex items-center justify-center gap-2 mb-5 sm:mb-6">
                <Zap className="w-8 h-8 text-red-500 animate-bounce" />
                <p className="text-red-600 font-black text-xl sm:text-2xl">¡OFERTA TERMINA EN!</p>
                <Zap className="w-8 h-8 text-red-500 animate-bounce" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                {[
                  { label: "Días", value: timeLeft.days },
                  { label: "Horas", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Seg", value: timeLeft.seconds },
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl blur opacity-75" />
                    <div className="relative bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-4 md:p-6 transform hover:scale-105 sm:hover:scale-110 transition-all duration-300 shadow-xl">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1">
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div className="text-xs sm:text-sm md:text-base text-white font-bold opacity-90">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-gray-600 text-sm font-semibold">⚡ ¡No dejes pasar esta oportunidad!</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center pt-2 max-w-xl sm:max-w-none mx-auto">
            <button
              onClick={handleWhatsAppClick}
              className="group relative w-full sm:w-auto justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-7 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 rounded-2xl font-bold text-base sm:text-lg md:text-xl shadow-2xl transform hover:scale-105 sm:hover:scale-110 transition-all duration-300 flex items-center gap-2 sm:gap-3"
            >
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
              <span className="relative z-10">Escribir ahora</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform relative z-10" />
            </button>

            <button
              onClick={() => document.getElementById("sedes")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative w-full sm:w-auto justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-7 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 rounded-2xl font-bold text-base sm:text-lg md:text-xl shadow-2xl transform hover:scale-105 sm:hover:scale-110 transition-all duration-300 flex items-center gap-2 sm:gap-3"
            >
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
              <span className="relative z-10">📍 Ver Tiendas</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform relative z-10" />
            </button>
          </div>
        </div>
      </section>

      {/* CUPÓN SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_70%)]" />

          <div className="relative p-6 sm:p-8 md:p-10">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping">
                    <Gift className="w-16 h-16 sm:w-20 sm:h-20 text-white opacity-75" />
                  </div>
                  <Gift className="w-16 h-16 sm:w-20 sm:h-20 text-white relative z-10" />
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-lg">Cupon exclusivo</h2>

              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl transform hover:scale-105 transition-transform">
                  <p className="text-gray-700 font-bold text-base sm:text-lg mb-4">Menciona este código en caja</p>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-orange-200 rounded-2xl blur-xl" />
                    <div className="relative w-full bg-gradient-to-r from-red-100 to-orange-100 border-4 border-dashed border-red-500 rounded-2xl p-6">
                      <p className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent tracking-widest">
                        {couponCode}
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4">
                    <p className="text-green-700 font-bold text-xl flex items-center justify-center gap-2">
                      <Trophy className="w-6 h-6" />
                      ¡DESCUENTO ESPECIAL INSTANTÁNEO!
                    </p>
                  </div>

                  <button
                    onClick={handleCouponRedeemClick}
                    className="mt-6 w-full bg-black hover:bg-gray-900 text-white font-black py-3 px-6 rounded-2xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mx-auto text-base sm:text-lg"
                    type="button"
                  >
                    Redimir ahora
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REDES SOCIALES */}
      <section className="w-full py-14 md:py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 p-5 sm:p-8">
              <h2 className="text-2xl sm:text-4xl font-black text-center text-white drop-shadow-lg">🎁 ¡Síguenos y Activa tu Cupón! 🎁</h2>
              <p className="text-center text-white text-sm sm:text-lg mt-2 font-semibold">Entérate de ofertas exclusivas antes que nadie</p>
            </div>

            <div className="p-5 sm:p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <a
                  href="https://www.instagram.com/almacen.elmejorprecio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 sm:p-8 text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  <img
                    src="/icons/instagram.svg"
                    alt="Instagram"
                    className="w-12 h-12 sm:w-16 sm:h-16 mb-4 mx-auto relative z-10 group-hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                  <p className="font-black text-center text-lg sm:text-xl mb-2 relative z-10">Seguir en Instagram</p>
                  <p className="text-center text-sm opacity-90 relative z-10">@almacen.elmejorprecio</p>
                  <div className="mt-4 text-center relative z-10">
                    <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">¡Síguenos ahora!</span>
                  </div>
                </a>

                <a
                  href="https://www.tiktok.com/@ropa.elmejorprecio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-950 rounded-2xl p-6 sm:p-8 text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  <img
                    src="/icons/tiktok.svg"
                    alt="TikTok"
                    className="w-12 h-12 sm:w-16 sm:h-16 mb-4 mx-auto relative z-10 group-hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                  <p className="font-black text-center text-lg sm:text-xl mb-2 relative z-10">Seguir en TikTok</p>
                  <p className="text-center text-sm opacity-90 relative z-10">@ropa.elmejorprecio</p>
                  <div className="mt-4 text-center relative z-10">
                    <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">¡Únete ahora!</span>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/RopaElMejorPrecio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 sm:p-8 text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  <img
                    src="/icons/facebook.svg"
                    alt="Facebook"
                    className="w-12 h-12 sm:w-16 sm:h-16 mb-4 mx-auto relative z-10 group-hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                  <p className="font-black text-center text-lg sm:text-xl mb-2 relative z-10">Seguir en Facebook</p>
                  <p className="text-center text-sm opacity-90 relative z-10">Ropa El Mejor Precio</p>
                  <div className="mt-4 text-center relative z-10">
                    <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">¡Dale Me Gusta!</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="hidden w-full py-12 px-4 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-3xl font-black mb-2">La oferta termina en 4 días.</h2>
          <p className="text-white/90 font-bold mb-8">Aprovecha antes de que se acabe</p>

          <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
            <div className="bg-yellow-300 rounded-xl p-4 shadow-lg">
              <div className="text-3xl md:text-4xl font-black text-red-700">{timeLeft.days}</div>
              <div className="text-xs font-bold text-gray-800 uppercase">Días</div>
            </div>
            <div className="bg-yellow-300 rounded-xl p-4 shadow-lg">
              <div className="text-3xl md:text-4xl font-black text-red-700">{timeLeft.hours}</div>
              <div className="text-xs font-bold text-gray-800 uppercase">Horas</div>
            </div>
            <div className="bg-yellow-300 rounded-xl p-4 shadow-lg">
              <div className="text-3xl md:text-4xl font-black text-red-700">{timeLeft.minutes}</div>
              <div className="text-xs font-bold text-gray-800 uppercase">Minutos</div>
            </div>
            <div className="bg-yellow-300 rounded-xl p-4 shadow-lg">
              <div className="text-3xl md:text-4xl font-black text-red-700">{timeLeft.seconds}</div>
              <div className="text-xs font-bold text-gray-800 uppercase">Segundos</div>
            </div>
          </div>
        </div>
      </section>

      {/* UBICACIONES */}
      <section id="sedes" className="w-full py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-12">
            🏪 Visítanos en Nuestras Sedes 🏪
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Sede Cantaclaro */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              <div className="relative bg-gradient-to-r from-red-500 to-orange-500 p-6 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
                <MapPin className="w-10 h-10 text-white mb-2 mx-auto relative z-10" />
                <h3 className="text-2xl font-black text-white relative z-10">Sede Cantaclaro</h3>
              </div>
              <div className="p-6">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-6">
                  <iframe
                    title="Mapa Sede Cantaclaro"
                    src="https://www.google.com/maps?q=Calle%2027%20%2331-04%2C%20Monter%C3%ADa%2C%20C%C3%B3rdoba%2C%20Colombia&output=embed"
                    className="w-full h-64 border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <div className="space-y-5 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-xl flex-shrink-0">
                      <MapPin className="w-7 h-7 text-red-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">Calle 27 #31-04</p>
                      <p className="text-gray-600 font-semibold">Frente a Droguería La Botica</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                      <Clock className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Lunes a Domingo</p>
                      <p className="text-gray-600">9:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleMapClick("cantaclaro")}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all shadow-xl transform hover:scale-105"
                >
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  Abrir en Google Maps
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Sede La Granja */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              <div className="relative bg-gradient-to-r from-orange-500 to-yellow-500 p-6 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
                <MapPin className="w-10 h-10 text-white mb-2 mx-auto relative z-10" />
                <h3 className="text-2xl font-black text-white relative z-10">Sede La Granja</h3>
              </div>
              <div className="p-6">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-6">
                  <iframe
                    title="Mapa Sede La Granja"
                    src="https://www.google.com/maps?q=Transversal%205%20%2311-15%2C%20Monter%C3%ADa%2C%20C%C3%B3rdoba%2C%20Colombia&output=embed"
                    className="w-full h-64 border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <div className="space-y-5 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-xl flex-shrink-0">
                      <MapPin className="w-7 h-7 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">Transversal 5 #11-15</p>
                      <p className="text-gray-600 font-semibold">Diagonal a Panadería La Insuperable</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                      <Clock className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Lunes a Domingo</p>
                      <p className="text-gray-600">9:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleMapClick("lagranja")}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all shadow-xl transform hover:scale-105"
                >
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  Abrir en Google Maps
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 mt-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_70%)]" />

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              ROPA EL MEJOR PRECIO
            </h3>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <p className="text-2xl font-bold text-gray-200">De Todo y Baratico</p>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h4 className="text-2xl font-black mb-6">⭐ ¿Por qué elegirnos? ⭐</h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-3 inline-flex">
                    <ShoppingBag className="w-7 h-7 text-white" />
                  </div>
                  <p className="mt-4 font-black">Gran variedad</p>
                  <p className="text-sm text-gray-300 font-semibold">Todo para la familia</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-3 inline-flex">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <p className="mt-4 font-black">Precios increíbles</p>
                  <p className="text-sm text-gray-300 font-semibold">Barato de verdad</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl p-3 inline-flex">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <p className="mt-4 font-black">Atención cercana</p>
                  <p className="text-sm text-gray-300 font-semibold">Te atendemos como en casa</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h4 className="text-2xl font-black mb-4">💬 Testimonios</h4>
              <p className="text-gray-300 font-semibold mb-6">Lo que dicen nuestros clientes</p>

              <div className="marquee rounded-2xl">
                <div
                  className="marqueeTrack"
                  style={{
                    ["--marquee-duration" as never]: "22s",
                  }}
                >
                  {testimonialsRibbon.map((t, idx) => (
                    <div
                      key={`${t.name}-${idx}`}
                      className={`${idx === 0 ? "" : "ml-6"} flex-shrink-0 w-[280px] md:w-[340px]`}
                    >
                      <div className="h-full bg-white/10 border border-white/15 rounded-2xl p-6">
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <p className="font-black text-white">{t.name}</p>
                          <div className="flex items-center gap-1 text-yellow-300">
                            {Array.from({ length: t.stars }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-200 font-semibold">{t.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-center md:text-left">
            <div>
              <h4 className="font-black text-lg mb-3">📍 Ubicaciones</h4>
              <p className="text-gray-300 text-sm mb-2">Cantaclaro: Calle 27 #31-04</p>
              <p className="text-gray-300 text-sm">La Granja: Transversal 5 #11-15</p>
            </div>

            <div>
              <h4 className="font-black text-lg mb-3">⏰ Horario</h4>
              <p className="text-gray-300 text-sm">Lunes - Domingo</p>
              <p className="text-gray-200 text-sm font-black">9:00 AM - 9:00 PM</p>
            </div>

            <div>
              <h4 className="font-black text-lg mb-3">💬 Contacto</h4>
              <p className="text-gray-300 text-sm">WhatsApp: +57 319 3747486</p>
              <p className="text-gray-300 text-sm">Montería, Córdoba</p>
            </div>
          </div>

          <div className="border-t border-gray-700/70 pt-8 text-center text-gray-400">
            <p className="font-bold">© 2026 Ropa El Mejor Precio. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <button
        onClick={() => document.getElementById("sedes")?.scrollIntoView({ behavior: "smooth" })}
        className="fixed bottom-24 sm:bottom-28 right-6 z-50 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-2xl ring-2 ring-white/80 transform hover:scale-110 transition-all animate-bounce"
        aria-label="Ir a ubicaciones"
        type="button"
      >
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover"
          loading="lazy"
        />
      </button>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl transform hover:scale-125 transition-all animate-bounce z-50"
        aria-label="Contactar por WhatsApp"
        type="button"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
      </button>
    </div>
  );
}
