# Instrucciones para Claude Code - Wedding Frontend

## Entorno de desarrollo
- **Sistema**: Windows con WSL2 Ubuntu 22.04
- **Comando preferido**: Usar siempre WSL2 para ejecutar comandos de desarrollo
- **Ruta del proyecto**: `/mnt/d/GIT/wedding-frontend/`
- **Puerto del servidor**: 3000 

## Comandos de ejecución

### Ejecutar frontend
```bash
wsl.exe --exec bash -c "cd /mnt/d/GIT/wedding-frontend && npm start"
```

### Otros comandos útiles
```bash
# Instalar dependencias
wsl.exe --exec bash -c "cd /mnt/d/GIT/wedding-frontend && npm install"

# Build para producción
wsl.exe --exec bash -c "cd /mnt/d/GIT/wedding-frontend && npm run build"

# Verificar estado del proyecto
wsl.exe --exec bash -c "cd /mnt/d/GIT/wedding-frontend && ls -la"

# Verificar versión de Node
wsl.exe --exec bash -c "node --version && npm --version"
```

## Configuración del proyecto
- **Framework**: React
- **Estilos**: Tailwind CSS
- **Puerto**: 3000 (o 3001 si hay conflicto)
- **API Backend**: http://localhost:8585/api

## Configuración importante
- **config.js**: Contiene la URL del API backend (puerto 8585)
- **CORS**: El backend permite conexiones desde cualquier origen para desarrollo

## Estructura del proyecto
- **Frontend**: React con componentes funcionales
- **Gestión de estado**: useState/useEffect hooks
- **Comunicación API**: Fetch nativo
- **Datos de la boda**: 
  - Fecha: 21 de noviembre de 2026
  - Lugar: Masia de les Casotes, Onda
  - Pareja: Julio & Cristina

## Notas importantes
- **SIEMPRE** trabajar directamente en `/mnt/d/GIT/wedding-frontend/` desde WSL2
- **NO** crear copias en `~/projects/` o directorios similares
- **Usar WSL2** para evitar problemas de comandos en Windows
- El proyecto backend hermano está en `/mnt/d/GIT/wedding-backend/`
- Node.js versión 20.19.4 instalado vía nvm en WSL2

## URLs importantes
- **Frontend**: http://localhost:3000 (o 3001)
- **API Backend**: http://localhost:8585/api
- **Configuración API**: src/config.js

## Variables de entorno
- **REACT_APP_API_URL**: URL del backend (por defecto http://localhost:8585/api)

## Troubleshooting
- Si hay problemas de puerto 3000, React sugerirá usar 3001
- Verificar que el backend esté ejecutándose en puerto 8585
- Si fallan comandos Windows, usar equivalentes WSL2
- Verificar config.js apunte al puerto correcto del backend