# Imagen base
FROM node:20

# Activar corepack (maneja pnpm)
RUN corepack enable

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias con pnpm
RUN pnpm install

# Copiar el resto del proyecto
COPY . .

# Compilar
RUN pnpm build

# Exponer puerto
EXPOSE 3000

# Ejecutar app
CMD ["node", "dist/app.js"]