import { useEffect } from "react"

/**
 * Hook que previene que el usuario cierre la página en móvil
 * usando el truco del "dirty flag" - hace que el navegador crea 
 * que hay cambios sin guardar
 */
export function useExitIntent(shouldPrevent: boolean = true) {
  useEffect(() => {
    if (!shouldPrevent) return

    // Flag para marcar que hay algo sin guardar - el navegador lo respetará
    let isDirty = true

    // Handler que SIEMPRE retorna un valor si hay cambios
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ""
        return ""
      }
    }

    // En algunos navegadores, unload se dispara incluso después, garantizando detección
    const handleUnload = () => {
      // El navegador va a cerrar, pero beforeunload ya debería haber actuado
    }

    // Para móvil: Usar localStorage como señal de que estamos activos
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && isDirty) {
        // Guardar que estábamos en la página
        localStorage.setItem("mundosport_was_active", Date.now().toString())
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("unload", handleUnload)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Marcar como activo al cargar
    localStorage.setItem("mundosport_was_active", Date.now().toString())

    return () => {
      isDirty = false
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("unload", handleUnload)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      localStorage.removeItem("mundosport_was_active")
    }
  }, [shouldPrevent])
}
