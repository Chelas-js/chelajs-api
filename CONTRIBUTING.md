# Contribuciones

<!-- TOC -->
- [Resumen de Comandos](#resumen-de-comandos)
- [Requisitos](#requisitos)
- [Configuración del Entorno de Desarrollo](#configuración-del-entorno-de-desarrollo)
- [Ejecución Local](#ejecución-local)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Pruebas](#pruebas)
- [Formato de Código](#formato-de-código)
- [Mensajes de Commit](#mensajes-de-commit)
- [Regla de tipo para Commits de Pruebas](#regla-de-tipo-para-commits-de-pruebas)
- [Regla de tipo para Commits de Configuración y Dependencias](#regla-de-tipo-para-commits-de-configuración-y-dependencias)
- [Regla de tipo para Commits de Documentación](#regla-de-tipo-para-commits-de-documentación)
- [Sugerencia para Commits con Archivos de Pruebas](#sugerencia-para-commits-con-archivos-de-pruebas)
- [Recomendación sobre Commits por Tipo](#recomendación-sobre-commits-por-tipo)
- [Regla para identificar el alcance (scope) en los commits](#regla-para-identificar-el-alcance-scope-en-los-commits)
- [Documentación de la API REST](#documentación-de-la-api-rest)
- [Endpoint .know-token para Desarrollo Local](#endpoint-know-token-para-desarrollo-local)
<!-- /TOC -->

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

El punto de entrada principal de la aplicación es `src/main.ts`, y la configuración principal del módulo se encuentra en `src/app.module.ts`.

La organización del código sigue una estructura modular basada en dominios, donde cada dominio representa una funcionalidad principal de la API. A continuación se describen los principales directorios y archivos dentro de `src/`:

- **auth/**: Lógica de autenticación y autorización.
  - `auth.guard.ts`, `auth.module.ts`, `auth.service.ts`, `authantication.decoration.ts`, `firebaseAdmin.service.ts`
  - `dtos/`: Objetos de transferencia de datos para autenticación.
- **config/**: Configuración general de la aplicación.
  - `configuration.ts`
  - `dtos/`: DTOs para configuración.
- **constants/**: Definición de constantes y enumeraciones usadas en la aplicación.
  - `access.enum.ts`
- **dtos/**: DTOs compartidos entre diferentes módulos.
  - `pagination.dto.ts`
- **events/**: Funcionalidad relacionada con eventos.
  - `events.controller.ts`, `events.module.ts`, `events.repository.ts`, `events.service.ts`
  - `dtos/`: DTOs específicos para eventos.
- **job-offers/**: Gestión de ofertas de trabajo.
  - `job-offert.controller.ts`, `job-offert.module.ts`, `job-offert.repository.ts`, `job-offert.service.ts`
  - Archivos `.spec.ts`: Pruebas unitarias.
  - `dtos/`: DTOs para ofertas de trabajo.
- **know-token/**: Endpoint especial para obtener tokens de desarrollo.
  - `know-token.controller.ts`
- **participants/**: Gestión de participantes de la comunidad.
  - `participants.controller.ts`, `participants.module.ts`, `participants.repository.ts`, `participants.service.ts`, `ZodValidationPipe.ts`
  - `dtos/`: DTOs para participantes.

Cada dominio contiene sus propios controladores, servicios, repositorios y DTOs, siguiendo las mejores prácticas de NestJS para mantener el código modular y escalable.

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

## Mensajes de Commit

Para mantener un historial de cambios claro y consistente, **todos los mensajes de commit deben seguir el estándar [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/)**.

Un mensaje de commit debe tener la siguiente estructura:

```
tipo(alcance opcional): descripción breve

cuerpo opcional que explique el motivo del cambio y cualquier detalle relevante
```

- **tipo**: Indica la naturaleza del cambio. Ejemplos comunes: `feat` (nueva funcionalidad), `fix` (corrección de bug), `docs` (documentación), `refactor`, `test`, `chore`.
- **alcance**: (Opcional) Área del código afectada, entre paréntesis.
- **descripción breve**: Explicación concisa del cambio, en minúsculas y en tiempo presente.
- **cuerpo**: (Opcional) Explicación adicional que justifique el cambio, detalle relevante, contexto o motivación.

**Ejemplos:**
- `feat(auth): agregar autenticación con Google`

  Se implementa la autenticación utilizando OAuth2 con Google para permitir el inicio de sesión social.

- `fix(events): corregir error al crear eventos sin fecha`

  Se corrige un bug que impedía la creación de eventos cuando no se especificaba la fecha, ahora se asigna la fecha actual por defecto.

- `docs: actualizar guía de contribución`

  Se actualiza la documentación para reflejar los nuevos lineamientos de commits.

- `refactor(participants): simplificar lógica de validación`

  Se refactoriza el servicio de participantes para mejorar la legibilidad y reducir la duplicidad de código.

Consulta la [documentación oficial de Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/) para más detalles y ejemplos.

## Regla de tipo para Commits de Pruebas

Si modificas cualquier archivo dentro de una carpeta `tests/`, o el archivo tiene la extensión `.spec.ts` o `.test.ts`, **el tipo del commit debe ser `test`**.

Ejemplo:
- `test(job-offers): agregar pruebas para el repositorio`
- `test: actualizar tests de autenticación`

Esto ayuda a identificar rápidamente los cambios relacionados con pruebas en el historial de commits.

## Regla de tipo para Commits de Configuración y Dependencias

Si modificas cualquier archivo dentro de la carpeta `.github/` o los archivos `tsconfig.build.json`, `.tool-versions`, `bun.lock`, `nest-cli.json`, `package-lock.json`, `package.json` o `tsconfig.json`, **el tipo del commit debe ser `build`**.

Ejemplo:
- `build: actualizar dependencias en package.json`
- `build: modificar configuración de tsconfig.json`
- `build: agregar workflows en .github/`

Esto permite identificar fácilmente los cambios relacionados con la configuración del proyecto y la gestión de dependencias.

## Regla de tipo para Commits de Documentación

Si modificas cualquier archivo dentro de la carpeta `docs/`, **el tipo del commit debe ser `docs`**.

Ejemplo:
- `docs: actualizar documentación de autenticación`
- `docs(rest): agregar ejemplos de uso de endpoints`

Esto permite identificar fácilmente los cambios relacionados con la documentación del proyecto.

## Sugerencia para Commits con Archivos de Pruebas

Si estás trabajando en dos archivos y uno de ellos es un archivo de pruebas (por ejemplo, con extensión `.spec.ts`), **primero crea el commit para el archivo de pruebas**. Esto ayuda a mantener un historial de cambios más claro y facilita la revisión del código.

## Recomendación sobre Commits por Tipo

Si realizas cambios que afectan a diferentes tipos (por ejemplo, pruebas y documentación), **crea un commit separado por cada tipo**. Esto facilita la revisión, el seguimiento y la comprensión del historial de cambios.

## Regla para identificar el alcance (scope) en los commits

El **alcance** (scope) en los mensajes de commit debe corresponder al nombre de la carpeta principal ubicada directamente dentro del directorio `src/` donde se realiza la modificación.

- Por ejemplo, si modificas el archivo `src/auth/dtos/configuration.dto.ts`, el alcance es `auth`.
- Si modificas `src/events/events.service.ts`, el alcance es `events`.
- Si modificas `src/participants/dtos/participant.dto.ts`, el alcance es `participants`.

### Scopes disponibles

Actualmente, los scopes válidos en este proyecto son:

- auth
- config
- constants
- dtos
- events
- job-offers
- know-token
- participants

Si el archivo modificado está directamente bajo `src/` y no pertenece a ningún dominio (por ejemplo, `src/main.ts` o `src/app.module.ts`), **omite el alcance** en el mensaje de commit y utiliza solo el tipo y la descripción.

Esto ayuda a mantener los mensajes de commit claros y consistentes, facilitando el rastreo de cambios por dominio o funcionalidad.

## Documentación de la API REST

La documentación de la API REST se encuentra en la carpeta `docs/rest/`. Cada dominio tiene su propia documentación para describir sus funcionalidades.

Los documentos disponibles son:

- [Authentication](./docs/rest/authentication.md) describe la autenticación de la API REST.
- [Job Offers](./docs/rest/job-offers.md) muestra las APIs para gestionar las ofertas de trabajo.
- [Participants](./docs/rest/participants.md) muestra las APIs para gestionar información de los participantes de la comunidad.
- [Events](./docs/rest/events.md) muestra las APIs para gestionar eventos.

Al agregar o modificar funcionalidades de la API, asegúrate de actualizar la documentación correspondiente en estos archivos. Esto ayuda a mantener una documentación centralizada y actualizada de todos los endpoints y su funcionamiento.

## Endpoint `.know-token` para Desarrollo Local

Para facilitar las pruebas de la API en el entorno local, se ha implementado un endpoint especial llamado `.know-token`. Este endpoint permite a los desarrolladores obtener rápidamente un ID Token válido para autenticarse y probar las diferentes APIs.

**Importante:** Por medidas de seguridad, este endpoint solo permite acceder a los tokens generados por el usuario autenticado. No es posible obtener tokens de otros usuarios a través de este endpoint.

Puedes encontrar más detalles sobre cómo utilizar este endpoint en la documentación de autenticación: [Authentication](./docs/rest/authentication.md).

¡Con estos pasos, deberías tener tu entorno de desarrollo configurado y listo para comenzar a contribuir! Por favor, consulta otros documentos dentro del repositorio para obtener más información sobre la estructura del proyecto y las guías de contribución específicas.
