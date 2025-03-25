# REST API Documentation for Participants

## Table of Contents

- [Endpoint: PUT /participants](#endpoint-put-participants)
  - Request Body
  - Example Request Body
  - Success Response
- [Endpoint: GET /participants](#endpoint-get-participants)
  - Success Response
  - Paginación
- [Endpoint: GET /participants/:participantId](#endpoint-get-participantsparticipantid)
  - Success Response
  - Error Response
- [Schemas](#schemas)
  - [RequestParticipantSchema](#requestparticipantschema)
  - [ParticipantSchema](#participantschema)

# Endpoint: PUT /participants

Permite actualizar la información del participante autenticado actual. Este endpoint permite modificar datos del perfil como el nombre, biografía, redes sociales, etiquetas de la comunidad, entre otros.

**Authentication Required:** Este endpoint **requiere autenticación**.

## Request Body

El cuerpo de la petición debe ser un objeto JSON que se ajusta al esquema `RequestParticipantSchema`.

```ts
export const RequestParticipantSchema = z.object({
  name: z.string(),
  bio: z.string().optional(),
  labels: z.array(z.string()),
  country: z.string().optional(),
  social: z
    .object({
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      twitter: z.string().url().optional(),
      website: z.string().url().optional(),
    })
    .optional(),
});
```

El esquema completo `RequestParticipantSchema` se puede encontrar en el archivo `src/participants/dtos/request-participant.dto.ts` (o similar).

Donde:

- `name`: Nombre del participante. _Tipo: string_.
- `bio`: Biografía o descripción del participante. _Tipo: string, opcional_.
- `labels`: Etiquetas o categorías asociadas al participante dentro de la comunidad. _Tipo: array de strings_.
- `country`: País de residencia del participante. _Tipo: string, opcional_.
- `social`: Objeto que contiene enlaces a redes sociales del participante. _Tipo: object, opcional_.
  - `linkedin`: URL del perfil de LinkedIn. _Tipo: string, URL válida, opcional_.
  - `github`: URL del perfil de GitHub. _Tipo: string, URL válida, opcional_.
  - `twitter`: URL del perfil de Twitter. _Tipo: string, URL válida, opcional_.
  - `website`: URL del sitio web personal o profesional. _Tipo: string, URL válida, opcional_.

## Example Request Body

```json
{
  "name": "John Doe",
  "bio": "Apasionado desarrollador web.",
  "labels": ["developer", "javascript", "react"],
  "country": "Argentina",
  "social": {
    "linkedin": "https://www.linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "twitter": "https://twitter.com/johndoeDev",
    "website": "https://johndoe.dev"
  }
}
```

## Success Response

Si la información del participante se actualiza correctamente, el servicio responderá con un código de estado HTTP `200 OK`.

**Status Code:** `200 OK`

El cuerpo de la respuesta, en caso de ser necesario, contendrá la representación actualizada del perfil del participante. _(Nota: No se especificó si se retorna un body en la respuesta exitosa, se asume que podría retornar el objeto actualizado o un mensaje de éxito)_.

# Endpoint: GET /participants

Permite obtener una lista paginada de los participantes existentes en la plataforma.

## Success Response

Si la petición es exitosa, el servicio responderá con un código de estado HTTP `200 OK`.

**Status Code:** `200 OK`

El cuerpo de la respuesta contendrá un objeto JSON con la siguiente estructura:

```json
{
  "data": [
    // Array de objetos Participant (estructura del perfil del participante)
    // ...
  ],
  "nextToken": "string" // Token para la siguiente página de resultados (opcional)
}
```

Donde:

- `data`: Un array de objetos, donde cada objeto representa un participante. La estructura de cada objeto dentro del array `data` se define por el [ParticipantSchema](#participantschema).
- `nextToken`: Un string opcional. Si existe más de una página de resultados, este campo contendrá un token que se puede utilizar en la siguiente petición GET a `/participants` para obtener la siguiente página de participantes. Si no hay más páginas, este campo no estará presente o será `null`.

## Paginación

Para obtener la siguiente página de resultados, se debe incluir el valor del `nextToken` recibido en la respuesta anterior como un query parameter en la siguiente petición GET a `/participants`.

Por ejemplo, si la respuesta anterior contiene `"nextToken": "abc123xyz"`, la siguiente petición para obtener la siguiente página sería:

`GET /participants?nextToken=abc123xyz`

# Endpoint: GET /participants/:participantId

<a name="endpoint-get-participantsparticipantid"></a>

Permite obtener la información de un participante específico, utilizando su `participantId`.

## Success Response

Si el participante con el `participantId` proporcionado existe, el servicio responderá con un código de estado HTTP `200 OK`.

**Status Code:** `200 OK`

El cuerpo de la respuesta contendrá un objeto JSON representando el participante solicitado, con la estructura definida por el [ParticipantSchema](#participantschema).

## Error Response

Si no se encuentra un participante con el `participantId` proporcionado en la base de datos, el servicio responderá con un código de estado HTTP `404 Not Found`.

**Status Code:** `404 Not Found`

# Schemas

## RequestParticipantSchema

<a name="requestparticipantschema"></a>

Esquema utilizado como body de la petición para actualizar la información del participante autenticado en el endpoint `PUT /participants`. Se define en el archivo `src/participants/dtos/request-participant.dto.ts` (o similar).

```ts
export const RequestParticipantSchema = z.object({
  name: z.string(),
  bio: z.string().optional(),
  labels: z.array(z.string()),
  country: z.string().optional(),
  social: z
    .object({
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      twitter: z.string().url().optional(),
      website: z.string().url().optional(),
    })
    .optional(),
});
```

- `name`: Nombre del participante. _Tipo: string_.
- `bio`: Biografía o descripción del participante. _Tipo: string, opcional_.
- `labels`: Etiquetas o categorías asociadas al participante dentro de la comunidad. _Tipo: array de strings_.
- `country`: País de residencia del participante. _Tipo: string, opcional_.
- `social`: Objeto que contiene enlaces a redes sociales del participante. _Tipo: object, opcional_.
  - `linkedin`: URL del perfil de LinkedIn. _Tipo: string, URL válida, opcional_.
  - `github`: URL del perfil de GitHub. _Tipo: string, URL válida, opcional_.
  - `twitter`: URL del perfil de Twitter. _Tipo: string, URL válida, opcional_.
  - `website`: URL del sitio web personal o profesional. _Tipo: string, URL válida, opcional_.

## ParticipantSchema

<a name="participantschema"></a>

Esquema que define la estructura de un participante, retornado en las respuestas de los endpoints, por ejemplo en el endpoint `GET /participants`. Se define en el archivo `src/participants/dtos/participant.dto.ts` (o similar).

```ts
export const ParticipantSchema = z.object({
  uid: z.string(),
  name: z.string(),
  bio: z.string().optional(),
  labels: z.array(z.string()),
  country: z.string().optional(),
  social: z
    .object({
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      twitter: z.string().url().optional(),
      website: z.string().url().optional(),
    })
    .optional(),
  updatedAt: z.string().datetime(),
});
```

- `uid`: Identificador único del participante. _Tipo: string_.
- `name`: Nombre del participante. _Tipo: string_.
- `bio`: Biografía o descripción del participante. _Tipo: string, opcional_.
- `labels`: Etiquetas o categorías asociadas al participante dentro de la comunidad. _Tipo: array de strings_.
- `country`: País de residencia del participante. _Tipo: string, opcional_.
- `social`: Objeto que contiene enlaces a redes sociales del participante. _Tipo: object, opcional_.
  - `linkedin`: URL del perfil de LinkedIn. _Tipo: string, URL válida, opcional_.
  - `github`: URL del perfil de GitHub. _Tipo: string, URL válida, opcional_.
  - `twitter`: URL del perfil de Twitter. _Tipo: string, URL válida, opcional_.
  - `website`: URL del sitio web personal o profesional. _Tipo: string, URL válida, opcional_.
- `updatedAt`: Fecha y hora de la última actualización del perfil del participante. _Tipo: string, formato datetime_.
