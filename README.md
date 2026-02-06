# Optimización de imágenes (logo.webp)

Instrucciones para generar `logo.webp` optimizado desde `logo.png` en Windows (también válido en macOS/Linux con las mismas herramientas).

Opciones rápidas:

1) Usando cwebp (Google WebP tools)

```bash
# instalar en Windows (chocolatey) o usar binarios
# choco install webp
cwebp -q 80 client/public/images/logo.png -o client/public/images/logo.webp
```

Ajusta `-q` (calidad) entre 60-90 según balance calidad/size.

2) Usando ImageMagick (magick)

```bash
# instalar ImageMagick
magick client/public/images/logo.png -quality 80 client/public/images/logo.webp
```

3) Usando Node + sharp (automatizable)

```bash
# instalar sharp en el proyecto (si no está)
pnpm add -D sharp

# script rápido (node):
node -e "(async()=>{const sharp=require('sharp');await sharp('client/public/images/logo.png').toFormat('webp',{quality:80}).toFile('client/public/images/logo.webp');console.log('logo.webp creado');})()"
```

Validación rápida:

- Asegúrate de que `client/public/images/logo.webp` existe.
- Abre la página o sirve el build y confirma que el favicon y el logo se cargan correctamente.

Comprobaciones de tamaño:

```bash
# Windows PowerShell
Get-Item client/public/images/logo.png | Select-Object Name, @{N='SizeKB';E={[math]::Round($_.Length/1024,2)}}
Get-Item client/public/images/logo.webp | Select-Object Name, @{N='SizeKB';E={[math]::Round($_.Length/1024,2)}}
```

Notas:

- Hecho esto, los cambios en `index.html` y `src/pages/Home.tsx` ya referencian `/images/logo.webp` como prioridad.
- Si necesitas que convierta más imágenes (preview.webp, etc.), puedo añadir scripts automáticos, pero no puedo generar los binarios sin tu aprobación para ejecutarlos aquí o sin los archivos originales.
