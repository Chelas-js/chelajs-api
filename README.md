# Chelajs API

Bienvenido al repositorio de la API de Chelajs, el corazón del backend de [chelajs.cl](https://chelajs.cl). Este proyecto, creado con dedicación para la comunidad, se construye sobre [NestJS](https://nestjs.com/), un framework progresivo de Node.js, para ofrecer una API robusta y escalable.

Aquí encontrará las APIs que impulsan nuestro sitio web, gestionando datos esenciales como información de participantes, ofertas laborales y mucho más. Nos esforzamos por construir una plataforma que sirva a la comunidad de Javascript Chile, facilitando la conexión y el crecimiento profesional de sus miembros.

## Documentación

La documentación de la API REST se encuentra organizada en la carpeta [`docs/rest/`](./docs/rest/). Le invitamos a consultar los siguientes documentos para obtener una comprensión detallada de nuestros endpoints y esquemas:

- **[Documentación de Autenticación](./docs/rest/authentication.md):** Descubre cómo autenticar tus peticiones a la API y obtener acceso seguro a los recursos protegidos.

- **[Documentación de Participantes](./docs/rest/participants.md):** Explore los endpoints destinados a la gestión de la información de los participantes de la comunidad, incluyendo la consulta y actualización de perfiles.

- **[Documentación de Ofertas de Trabajo](./docs/rest/job-offers.md):** Infórmese sobre las funcionalidades para la gestión de ofertas laborales, desde la creación y consulta hasta la eliminación de las mismas.

## Primeros Pasos

Para comenzar a utilizar y contribuir a este proyecto, siga estos pasos iniciales:

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Chelas-js/chelajs-api.git
   cd chelajs-api
   ```

2. **Instalar dependencias:**
   Asegúrese de tener [bun](https://bun.sh/) instalado según las indicaciones del [documento de contribuciones](./CONTRIBUTING.md). Luego, ejecute:

   ```bash
   bun i
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   bun start:dev
   ```
   Este comando iniciará el servidor en modo desarrollo, con recarga automática al detectar cambios en el código.

## Contribuciones

Agradecemos enormemente su interés en contribuir a Chelajs API. Para conocer las directrices de contribución, configuración del entorno de desarrollo, estructura del proyecto y cómo realizar pruebas, consulte nuestro [documento de contribuciones](./CONTRIBUTING.md).

Su participación es fundamental para el crecimiento y la mejora continua de este proyecto comunitario.

## Código de Conducta

Como comunidad inclusiva y diversa, nos regimos por un [código de conducta](./CODE_OF_CONDUCT.md) que todos los participantes deben seguir y respetar. Le animamos a leerlo para asegurar un ambiente colaborativo y respetuoso para todos.

## Seguridad

La seguridad es una prioridad en Chelajs API. Para conocer nuestras políticas de seguridad, versiones soportadas y cómo reportar vulnerabilidades, consulte nuestro [documento de seguridad](./SECURITY.md).

¡Esperamos que disfrute explorando y contribuyendo a Chelajs API!
