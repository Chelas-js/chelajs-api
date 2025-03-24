# Contribuciones

¡Gracias por tu interés en contribuir a este proyecto API!

Este documento proporciona una guía para contribuir al proyecto `chelajs-api`. Sigue estas instrucciones para configurar tu entorno de desarrollo y empezar a colaborar.

## Resumen de Comandos

Aquí tienes un resumen rápido de los comandos más comunes que necesitarás para contribuir:

- **Clonar el repositorio:** `git clone https://github.com/Chelas-js/chelajs-api.git`
- **Navegar al directorio del proyecto:** `cd chelajs-api`
- **Instalar dependencias:** `bun i`
- **Instalar bun (usando asdf opcional):** `asdf install`
- **Iniciar el servidor de desarrollo:** `bun start:dev`
- **Formatear el código:** `bun fmt`
- **Ejecutar pruebas:** `bun test`

## Requisitos

Este proyecto utiliza las siguientes herramientas:

- **bun**: El proyecto utiliza [bun](https://bun.sh/) como gestor de paquetes y entorno de ejecución de JavaScript. La versión mínima requerida de `bun` está especificada en el archivo `.tool-versions` dentro del repositorio. Por favor, consulta este archivo para asegurarte de estar utilizando una versión compatible.

  Si utilizas **asdf** (https://asdf-vm.com/) para gestionar versiones de herramientas, puedes instalar la versión de `bun` requerida fácilmente:

  ```bash
  asdf install
  ```

  Este comando leerá el archivo `.tool-versions` y instalará la versión de `bun` especificada (y otras herramientas si están listadas en el archivo). Si no tienes `bun` instalado a través de `asdf`, asegúrate de seguir las instrucciones de instalación en la [documentación oficial de bun](https://bun.sh/docs/installation).

## Configuración del Entorno de Desarrollo

Para comenzar a contribuir, sigue estos pasos:

1. **Clona el repositorio:**

   Abre tu terminal y ejecuta el siguiente comando para clonar el repositorio de GitHub en tu máquina local:

   ```bash
   git clone https://github.com/Chelas-js/chelajs-api.git
   cd chelajs-api
   ```

2. **Instala las dependencias:**

   Asegúrate de tener [bun](https://bun.sh/) instalado (ver sección de Requisitos más abajo). Una vez instalado, ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```bash
   bun i
   ```

   Este comando utilizará `bun` para instalar todas las dependencias necesarias listadas en el archivo `bun.lockb`.

## Ejecución Local

Para iniciar el proyecto en tu entorno local y comenzar a desarrollar, utiliza el siguiente comando:

```bash
bun start:dev
```

Este comando iniciará el servidor de desarrollo y recargará la aplicación automáticamente al detectar cambios en el código.

## Estructura del Proyecto

Este proyecto está construido utilizando [NestJS](https://nestjs.com/), un framework progresivo de Node.js para construir aplicaciones de servidor eficientes y escalables.

El punto de entrada principal de la aplicación se encuentra en el archivo `src/main.ts`.

El proyecto está organizado en **dominios**. Cada dominio representa una parte específica de la funcionalidad de la API y reside en una carpeta dentro del directorio `src/`.

Por ejemplo, el dominio de `job-offers` se encuentra en `src/job-offers/`. Dentro de cada dominio, encontrarás:

- **Controladores:** Responsables de manejar las peticiones HTTP y enrutar a los servicios correspondientes. Ejemplo: `src/job-offers/job-offert.controller.ts`.
- **Servicios:** Contienen la lógica de negocio y la interacción con la base de datos u otras fuentes de datos. Ejemplo: `src/job-offers/job-offert.service.ts`.

## Pruebas

Para mantener un estándar de calidad mínimo, **toda nueva funcionalidad debe ser probada**.

Las pruebas unitarias deben ser escritas en archivos con la extensión `.spec.ts` y ubicarse en el mismo directorio que el archivo que se está probando.

Por ejemplo, las pruebas para `src/job-offers/job-offert.service.ts` deben estar en el archivo `src/job-offers/job-offert.service.spec.ts`.

Se recomienda utilizar el módulo `bun:test` para ejecutar las pruebas. Para ejecutar las pruebas, simplemente ejecuta el siguiente comando en la terminal:

```bash
bun test
```

Puedes encontrar más información y documentación en [https://bun.sh/docs/cli/test](https://bun.sh/docs/cli/test).

## Formato de Código

Este proyecto sigue las reglas de estilo predeterminadas de [Prettier](https://prettier.io/) para mantener la consistencia en el formato del código.

**Antes de enviar cualquier cambio**, asegúrate de formatear tu código utilizando el siguiente comando:

```bash
bun fmt
```

Este comando aplicará automáticamente el formato de Prettier a todo el código del proyecto.

## Documentación de la API

**Todas las APIs deben estar documentadas en el archivo `docs/api.md`**. Al agregar o modificar funcionalidades de la API, asegúrate de actualizar la documentación correspondiente en este archivo. Esto ayuda a mantener una documentación centralizada y actualizada de todos los endpoints y su funcionamiento.

¡Con estos pasos, deberías tener tu entorno de desarrollo configurado y listo para comenzar a contribuir! Por favor, consulta otros documentos dentro del repositorio para obtener más información sobre la estructura del proyecto y las guías de contribución específicas.
