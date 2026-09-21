# 🛡️ KODIGO — Seguridad Web Moderna con Next.js y Supabase

> **Título de la Actividad**: Implementar capas de seguridad a nivel de servidor y estrategias de posicionamiento orgánico para aplicaciones web profesionales.
> **Tema Central**: Seguridad de Autenticación con Cookies `httpOnly` en Next.js App Router.

---

## 🚀 Descripción del Proyecto

Este repositorio contiene la solución completa para la tarea práctica de **Kodigo**, orientada al desarrollo de un sistema de autenticación robusto, seguro y moderno. La aplicación está construida utilizando **Next.js 15+ (App Router)**, **Supabase SSR** (`@supabase/ssr`), **Server Actions** y **Middleware de protección**, garantizando que los tokens de sesión no sean expuestos en el navegador (`localStorage`) y se manipulen exclusivamente mediante cookies con las banderas `httpOnly`, `Secure` y `SameSite`.

---

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15+ (App Router)
- **Base de Datos & Autenticación**: Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- **Lenguaje**: TypeScript (Tipado estricto)
- **Manejo de Formularios & Acciones**: Server Actions (`use server`)
- **Control de Acceso**: Next.js Middleware (`middleware.ts`)
- **Estilos & UI**: Tailwind CSS v4, Lucide Icons, Glassmorphism & Dark Mode

---

## 📁 Estructura del Proyecto

```
kodigo-next-supabase-auth/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx           # Página de inicio de sesión (Sign In)
│   │   ├── signup/
│   │   │   └── page.tsx           # Página de registro (Sign Up) con validaciones
│   │   ├── forgot-password/
│   │   │   └── page.tsx           # Solicitud de recuperación de contraseña
│   │   └── reset-password/
│   │       └── page.tsx           # Formulario para nueva contraseña
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts           # Route Handler para intercambio de código PKCE
│   ├── dashboard/
│   │   └── page.tsx               # Ruta privada (Dashboard) con datos del usuario
│   ├── actions/
│   │   └── auth.ts                # Server Actions (login, signup, logout, reset)
│   ├── layout.tsx                 # Root Layout con Navbar y Footer
│   ├── page.tsx                   # Landing Page informativa
│   └── globals.css                # Estilos globales y utilidades de UI
├── components/
│   ├── Navbar.tsx                 # Navegación con renderizado condicional por sesión
│   ├── Footer.tsx                 # Pie de página técnico
│   └── SubmitButton.tsx           # Botón con indicador interactivo de carga
├── utils/
│   └── supabase/
│       ├── client.ts              # Cliente Supabase para Client Components
│       ├── server.ts              # Cliente Supabase para Server Components y Actions
│       └── middleware.ts          # Gestión de cookies y actualización de sesión en Middleware
├── types/
│   └── auth.ts                    # Interfaces y tipos de TypeScript
├── middleware.ts                  # Interceptor de peticiones HTTP de Next.js
├── .env.example                   # Plantilla de variables de entorno
├── .env.local                     # Variables locales de Supabase
├── package.json
└── README.md
```

---

## 🔑 Capas de Seguridad Implementadas

### 1. Cookies `httpOnly`
- Los tokens JWT expedidos por Supabase son leídos y escritos del lado del servidor usando el cliente `@supabase/ssr` en `utils/supabase/server.ts`.
- Las cookies cuentan con las banderas:
  - `httpOnly`: Impide la lectura de los tokens mediante scripts de JavaScript (`document.cookie`), neutralizando el robo de sesión por vulnerabilidades XSS.
  - `SameSite=Lax`: Previene ataques CSRF al limitar el envío automático de la cookie en peticiones cross-site.
  - `Secure`: Garantiza que las cookies se transmitan únicamente a través de conexiones cifradas HTTPS.

### 2. Server Actions para Autenticación (`app/actions/auth.ts`)
- Toda la lógica de autenticación (registro, login, logout, reset) se ejecuta en el servidor (`use server`).
- Incluye validación de datos de entrada (email válido, longitud mínima de contraseña, coincidencia de confirmación).
- Sanitización de mensajes de error para no revelar información sensible.

### 3. Middleware de Protección (`middleware.ts`)
- Refresca la sesión de Supabase de manera transparente en cada petición mediante `updateSession()`.
- Protege automáticamente las rutas privadas (`/dashboard`, `/profile`).
- Redirige a usuarios no autenticados hacia `/login`.
- Redirige a usuarios ya autenticados que intentan acceder a `/login` o `/signup` directamente hacia su `/dashboard`.

---

## ⚙️ Pasos de Instalación y Configuración Local

### Prerrequisitos
- Node.js v18.17 o superior.
- Una cuenta gratuita en [Supabase.com](https://supabase.com).

### 1. Clonar o descargar el repositorio
```bash
git clone https://github.com/tu-usuario/kodigo-next-supabase-auth.git
cd kodigo-next-supabase-auth
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto a partir de `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-de-supabase
```

> **¿Dónde obtener las claves de Supabase?**
> 1. Ve a tu panel en [Supabase Console](https://supabase.com/dashboard).
> 2. Selecciona tu proyecto y dirígete a **Project Settings > API**.
> 3. Copia el **Project URL** y el **anon key / public key**.

### 4. Configurar Autenticación en Supabase
1. En tu panel de Supabase, dirígete a **Authentication > URL Configuration**.
2. Agrega `http://localhost:3000/auth/callback` en **Site URL** y en **Redirect URLs**.
3. (Opcional) En **Authentication > Providers**, asegúrate de que el proveedor de **Email** esté habilitado.

### 5. Ejecutar el servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador en [http://localhost:3000](http://localhost:3000).

---

## 🧪 Pruebas de Funcionamiento y Verificación

1. **Registro de Usuario**:
   - Ingresa a `/signup`, llena el formulario con un nombre, correo y contraseña de al menos 6 caracteres.
   - Presiona "Registrarse" y verifica que el usuario se cree y redirija correctamente.
2. **Verificación de Cookies `httpOnly`**:
   - Inicia sesión en `/login`.
   - Abre las Herramientas de Desarrollador del navegador (F12 > Application > Cookies).
   - Observa las cookies de Supabase (ej. `sb-*-auth-token`). Confirma que tienen marcada la casilla **HttpOnly**.
   - Abre la consola de JavaScript y escribe `console.log(document.cookie)`. Verifica que los tokens sensibles NO aparecen en la salida.
3. **Protección de Rutas (Middleware)**:
   - Cierra sesión o abre una ventana de incógnito e intenta ingresar directamente a `http://localhost:3000/dashboard`.
   - El middleware te redirigirá inmediatamente a `/login`.
   - Inicia sesión e intenta ingresar a `/login`; serás redirigido a `/dashboard`.

---

## 🚀 Despliegue en Producción (Vercel)

1. Sube tu código a un repositorio público de GitHub.
2. Ingresa a [Vercel](https://vercel.com) y crea un **New Project**.
3. Importa tu repositorio de GitHub.
4. En la sección **Environment Variables**, agrega:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Haz clic en **Deploy**.
6. En tu proyecto de Supabase (**Authentication > Redirect URLs**), añade la URL de producción proporcionada por Vercel (ej. `https://tu-app.vercel.app/auth/callback`).

---

## 👨‍💻 Autor
Proyecto desarrollado para la evaluación técnica de **KODIGO — Seguridad Web Moderna con Next.js y Supabase**.
