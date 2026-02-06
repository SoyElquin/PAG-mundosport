# Guía de Configuración: Facebook Pixel y Meta Ads para Mundo de Todo Sport

## 📊 Configuración del Facebook Pixel

### 1. Instalación del Pixel (si aún no está instalado)

Agrega este código en el `<head>` de tu archivo `client/index.html`:

```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'TU_PIXEL_ID'); // Reemplaza TU_PIXEL_ID con tu ID real
</script>
<noscript>
  <img height="1" width="1" style="display:none"
       src="https://www.facebook.com/tr?id=TU_PIXEL_ID&ev=PageView&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->
```

**IMPORTANTE**: NO incluyas `fbq('track', 'PageView');` en el código de instalación, ya que esto se maneja automáticamente con scroll en el código React.

---

## 🎯 Configuración de Meta Ads Manager

### 2. Crear Campaña con Parámetros UTM

#### URL de Destino para tus Anuncios:
```
https://tudominio.com/?src=meta_lpvt&utm_source=meta&utm_medium=cpc&utm_campaign=MundoSport&utm_content=video1#comollegar
```

**Desglose de Parámetros:**
- `src=meta_lpvt` - Identificador único para Landing Page Views de Meta
- `utm_source=meta` - Fuente del tráfico (Meta/Facebook)
- `utm_medium=cpc` - Medio de la campaña (costo por clic)
- `utm_campaign=MundoSport` - Nombre de tu campaña
- `utm_content=video1` - Variante del contenido (puedes cambiar a video2, video3, etc.)
- `#comollegar` - Ancla para scroll automático a la sección de ubicación

#### Pasos en Meta Ads Manager:

1. **Crear Nueva Campaña**
   - Ve a Meta Ads Manager
   - Clic en "Crear" > "Campaña"
   - Objetivo: "Tráfico" o "Conversiones"

2. **Configurar el Conjunto de Anuncios**
   - Ubicación: Montería, Córdoba, Colombia
   - Edad: Ajusta según tu público objetivo
   - Intereses: Deportes, compras, artículos deportivos, etc.

3. **Crear el Anuncio**
   - En "Destino del sitio web", pega la URL completa con parámetros UTM
   - Sube tu video o imagen
   - Escribe el texto del anuncio

4. **Parámetros de URL Dinámicos (Opcional Avanzado)**
   
   Para trackear mejor cada anuncio, puedes usar:
   ```
   https://tudominio.com/?src=meta_lpvt&utm_source=meta&utm_medium=cpc&utm_campaign=MundoSport&utm_content={{ad.name}}&fbclid={{ad.id}}#comollegar
   ```

---

## 📈 Eventos del Pixel Configurados

### Eventos que se Disparan Automáticamente:

1. **PageView** (con scroll)
   - Se dispara cuando el usuario hace scroll más de 50px
   - Incluye datos: `scroll_depth` y `engagement: "scrolled"`
   - **NO se dispara en la carga inicial de la página**

2. **ViewContent** (exit intent)
   - Se dispara cuando el usuario intenta salir de la página
   - Muestra el popup de oferta exclusiva
   - Incluye: `content_name: "exit_intent_coupon"`

3. **Contact** (WhatsApp)
   - Se dispara al hacer clic en el botón de WhatsApp
   - Incluye: `content_name: "whatsapp_main"`

4. **Lead** (Cupón)
   - Se dispara al hacer clic en "Redimir cupón"
   - Incluye: `content_name: "coupon_redeem"` y `coupon_code: "#REDES"`

5. **FindLocation** (Mapa)
   - Se dispara al hacer clic en "Cómo llegar"
   - Incluye: `content_name: "sede_lagranja"`

---

## 🔍 Análisis y Comparación de Resultados

### En Meta Ads Manager:

1. **Ver Landing Page Views**
   - Ve a tu campaña
   - Columnas > Personalizar columnas
   - Busca y agrega "Landing Page Views"
   - Compara con "Clics en el enlace"

2. **Eventos del Pixel**
   - Ve a "Eventos Manager" en Meta Business Suite
   - Selecciona tu Pixel
   - Verás todos los eventos disparados en tiempo real

### En Google Analytics (si lo tienes):

1. **Ver Tráfico de Meta**
   - Adquisición > Todo el tráfico > Fuente/Medio
   - Busca: `meta / cpc`

2. **Comparar Métricas**
   - Landing Page Views (Meta) vs Sesiones con `src=meta_lpvt` (GA)
   - Esto te dirá si hay discrepancias entre lo que Meta reporta y lo que realmente llega

---

## 🍪 Gestión de Cookies

El código ya incluye:
- Detección automática de cookies existentes
- El banner de cookies se oculta si ya fueron aceptadas
- Compatible con GDPR/LGPD

---

## 🚨 Comportamiento del Popup de Oferta

### Exit Intent Activado:
El popup aparece cuando:
1. El usuario mueve el cursor fuera de la ventana (hacia arriba)
2. El usuario intenta cerrar la pestaña/ventana
3. **NO aparece automáticamente después de X segundos**

### Ventajas:
- Reduce tasa de rebote
- Captura usuarios que están por irse
- Aumenta conversiones de último momento

---

## ✅ Checklist de Verificación

Antes de lanzar tus anuncios, verifica:

- [ ] Pixel de Facebook instalado en `index.html`
- [ ] ID del Pixel reemplazado (no dejar "TU_PIXEL_ID")
- [ ] URL con parámetros UTM correcta en Meta Ads
- [ ] Probar la URL manualmente para verificar scroll a #comollegar
- [ ] Verificar que el popup aparece con exit intent
- [ ] Confirmar que PageView se dispara solo con scroll (usar Facebook Pixel Helper)
- [ ] Probar en móvil y desktop

---

## 🛠️ Herramientas Útiles

1. **Facebook Pixel Helper** (Extensión de Chrome)
   - Verifica que el pixel esté instalado correctamente
   - Muestra qué eventos se disparan y cuándo

2. **Meta Events Manager**
   - Monitorea eventos en tiempo real
   - Verifica que los parámetros se envíen correctamente

3. **Google Analytics** (opcional)
   - Compara datos con Meta Ads
   - Identifica discrepancias

---

## 📞 Soporte

Si tienes problemas:
1. Verifica la consola del navegador (F12) para errores
2. Usa Facebook Pixel Helper para diagnosticar
3. Compara eventos en Meta Events Manager vs comportamiento real

---

## 🎯 Ejemplo de Configuración Completa

### URL para Anuncio de Video 1:
```
https://mundodetodosport.com/?src=meta_lpvt&utm_source=meta&utm_medium=cpc&utm_campaign=MundoSport&utm_content=video1#comollegar
```

### URL para Anuncio de Video 2:
```
https://mundodetodosport.com/?src=meta_lpvt&utm_source=meta&utm_medium=cpc&utm_campaign=MundoSport&utm_content=video2#comollegar
```

### URL para Anuncio de Imagen:
```
https://mundodetodosport.com/?src=meta_lpvt&utm_source=meta&utm_medium=cpc&utm_campaign=MundoSport&utm_content=imagen1#comollegar
```

Cambia `utm_content` para cada variante de anuncio y podrás comparar cuál funciona mejor.

---

**Última actualización**: Febrero 2026
**Versión**: 1.0
