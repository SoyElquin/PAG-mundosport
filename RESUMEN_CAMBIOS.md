# Resumen de Cambios - Mundo de Todo Sport

## ✅ Cambios Implementados

### 1. **Eliminación del Slogan** ✓
- ❌ Removido: "Tu Tienda Deportiva de Confianza"
- ✅ Razón: No son exclusivamente tienda deportiva, venden de todo
- 📍 Ubicaciones: Hero section y Footer

### 2. **Tracking UTM y Scroll Automático** ✓
- ✅ URL con parámetros: `?src=meta_lpvt&utm_source=meta&utm_medium=cpc&utm_campaign=MundoSport&utm_content=video1#comollegar`
- ✅ Detección automática de parámetros UTM de Meta
- ✅ Scroll automático a sección `#comollegar` cuando viene de Meta Ads
- ✅ Permite comparar Landing Page Views vs visitas reales

### 3. **Facebook Pixel con Scroll** ✓
- ✅ Pixel instalado en `index.html`
- ✅ **PageView se dispara SOLO con scroll** (no en carga inicial)
- ✅ Se activa cuando el usuario hace scroll > 50px
- ✅ Incluye datos de engagement: `scroll_depth` y `engagement: "scrolled"`
- ⚠️ **IMPORTANTE**: Debes reemplazar `TU_PIXEL_ID` con tu ID real del pixel

### 4. **Popup con Exit Intent** ✓
- ✅ El popup aparece cuando el usuario intenta salir de la página
- ✅ Detecta movimiento del cursor hacia arriba (salir de ventana)
- ✅ Detecta intento de cerrar pestaña/ventana
- ❌ NO aparece automáticamente después de X segundos
- ✅ Trackea evento: `ViewContent` con `content_name: "exit_intent_coupon"`

### 5. **Gestión de Cookies** ✓
- ✅ Sistema de cookies implementado
- ✅ Banner se oculta automáticamente si ya fueron aceptadas
- ✅ Compatible con mejores prácticas de privacidad

### 6. **SEO y Meta Tags** ✓
- ✅ Meta description optimizada
- ✅ Keywords relevantes
- ✅ Open Graph tags para Facebook
- ✅ Twitter Cards
- ✅ Título optimizado: "Mundo de Todo Sport - Artículos Deportivos en Montería"

---

## 📋 Archivos Modificados

1. **`client/index.html`**
   - Facebook Pixel agregado (sin PageView automático)
   - Meta tags SEO
   - Open Graph tags

2. **`client/src/pages/Home.tsx`**
   - Slogan eliminado
   - Detección de parámetros UTM
   - Scroll automático a #comollegar
   - Pixel con scroll (> 50px)
   - Exit intent popup
   - ID "comollegar" en sección de ubicación

3. **`ideas.md`**
   - Documentación actualizada

4. **`GUIA_FACEBOOK_ADS.md`** (NUEVO)
   - Guía completa de configuración
   - Instrucciones paso a paso
   - Ejemplos de URLs con UTM

---

## 🎯 Eventos del Pixel Configurados

| Evento | Cuándo se Dispara | Parámetros |
|--------|-------------------|------------|
| **PageView** | Scroll > 50px | `scroll_depth`, `engagement: "scrolled"` |
| **ViewContent** | Exit intent (usuario intenta salir) | `content_name: "exit_intent_coupon"` |
| **Contact** | Clic en WhatsApp | `content_name: "whatsapp_main"` |
| **Lead** | Clic en "Redimir cupón" | `content_name: "coupon_redeem"`, `coupon_code: "#REDES"` |
| **FindLocation** | Clic en "Cómo llegar" | `content_name: "sede_lagranja"` |

---

## 🚀 Próximos Pasos

### 1. Configurar Facebook Pixel
```
⚠️ ACCIÓN REQUERIDA:
En client/index.html, línea 39, reemplaza:
fbq('init', 'TU_PIXEL_ID');

Por:
fbq('init', '123456789012345'); // Tu ID real del pixel
```

### 2. Configurar Meta Ads
Sigue la guía en `GUIA_FACEBOOK_ADS.md` para:
- Crear campaña en Meta Ads Manager
- Configurar URL con parámetros UTM
- Monitorear eventos del pixel

### 3. Probar Funcionalidad
- [ ] Instalar Facebook Pixel Helper (extensión Chrome)
- [ ] Verificar que PageView NO se dispare en carga inicial
- [ ] Hacer scroll y verificar que PageView se dispare
- [ ] Probar exit intent (mover cursor fuera de ventana)
- [ ] Probar URL con parámetros UTM: `?src=meta_lpvt&utm_source=meta#comollegar`
- [ ] Verificar scroll automático a sección de ubicación

---

## 📊 Análisis de Resultados

### Comparar en Meta Ads Manager:
1. **Landing Page Views** (reportado por Meta)
2. **PageView con scroll** (eventos del pixel)
3. **Sesiones con `src=meta_lpvt`** (Google Analytics si lo tienes)

### Fórmula de Discrepancia:
```
Discrepancia = (Landing Page Views - PageView Real) / Landing Page Views × 100%
```

Si la discrepancia es alta (>20%), puede indicar:
- Usuarios que abandonan antes de hacer scroll
- Problemas de carga de página
- Bloqueo de pixel por adblockers

---

## 🛠️ Herramientas Recomendadas

1. **Facebook Pixel Helper** (Chrome Extension)
   - Verifica instalación del pixel
   - Muestra eventos en tiempo real

2. **Meta Events Manager**
   - Monitorea todos los eventos
   - Verifica parámetros enviados

3. **Google Analytics** (opcional)
   - Compara con datos de Meta
   - Identifica discrepancias

---

## 📞 Soporte Técnico

Si encuentras problemas:
1. Revisa la consola del navegador (F12) para errores
2. Usa Facebook Pixel Helper para diagnosticar
3. Verifica que el ID del pixel sea correcto
4. Comprueba que los parámetros UTM estén en la URL

---

## 🎨 Diseño y Branding

### Colores Actuales:
- Rojo: #81040a
- Naranja: #fe6c08

### Información de Contacto:
- WhatsApp: +57 312 286 8911
- Ubicación: La Granja - Transv. 5 Diag 9 y 10
- Horario: Lunes a Domingo, 9:00 AM - 9:00 PM

### Redes Sociales:
- TikTok: @mundodetodo.sport
- Facebook: Mundo de Todo Sport
- Instagram: @mundodetodosport

---

**Fecha de Implementación**: Febrero 2026
**Versión**: 2.0
**Estado**: ✅ Listo para producción (después de configurar Pixel ID)
