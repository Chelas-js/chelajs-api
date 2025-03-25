# Documentación de la API REST para Eventos

## Tabla de Contenido

- [Endpoint: PUT /events/:eventId](#put-eventseventid)
  - Request Body
  - Ejemplo Request Body
  - Success Response
- [Endpoint: GET /events](#get-events)
  - Success Response
  - Paginación
- [Endpoint: GET /events/:eventId](#get-eventseventid-1)
  - Success Response
  - Error Response
- [Endpoint: DELETE /events/:eventId](#delete-eventseventid)
  - Success Response
  - Error Response
- [Schemas](#schemas)
  - [Access Enum](#access-enum)
  - [EventSchema](#eventschema)
  - [CreateEventSchema](#createeventschema)

---

## Endpoint: PUT /events/:eventId

Este endpoint permite crear un nuevo evento o modificar un evento existente identificado por `:eventId`.

**Autenticación:** Requerida. Solo el usuario creador del evento puede modificarlo.

**Request Body:** `CreateEventSchema`

### Request Body

El cuerpo de la petición debe ser un objeto JSON que cumpla con el schema `CreateEventSchema`:

```typescript
export const CreateEventSchema = EventSchema.pick({
  name: z.string(),
  body: z.string().describe("markdown format"),
  cover: z.string().url().optional(),
  date: z.string().datetime(),
  access: z.nativeEnum(Access).optional(),
});
```

Donde:

- `name`: (String, Requerido) Nombre del evento.
- `body`: (String, Requerido) Descripción del evento en formato Markdown.
- `cover`: (String, Opcional) URL de la imagen de portada del evento. Debe ser una URL válida.
- `date`: (String, Requerido) Fecha y hora del evento en formato ISO 8601 (e.g., `2024-01-20T10:00:00Z`).
- `access`: (Enum, Opcional) Define el nivel de acceso al evento. Valores posibles: `PUBLIC`, `PRIVATE`. Si no se especifica, se asume `PUBLIC`. Ver [Access Enum](#access-enum) para más detalles.

### Ejemplo Request Body

```json
{
  "name": "Evento de Networking de ChelasJS",
  "body": "**¡No te pierdas nuestro próximo evento de networking!**\n\nConocerás a otros miembros de la comunidad ChelasJS y podrás compartir tus experiencias y proyectos.",
  "date": "2024-03-15T18:30:00Z",
  "cover": "https://ejemplo.com/imagenes/cover-evento-networking.png",
  "access": "PUBLIC"
}
```

### Success Response

**Código:** `200 OK` o `201 Created` (si se crea un nuevo evento)

**Body:** `EventSchema`

Retorna un objeto JSON que cumple con el schema `EventSchema` representando el evento creado o modificado.

```typescript
export const EventSchema = z.object({
  eventId: z.string(),
  name: z.string(),
  body: z.string().describe("markdown format"),
  cover: z.string().url().optional(),
  date: z.string().datetime(),
  access: z.nativeEnum(Access).optional(),
  createdAt: z.string().datetime(),
  createdBy: z.string(),
});
```

Donde:

- `eventId`: (String) Identificador único del evento.
- `name`: (String) Nombre del evento.
- `body`: (String) Descripción del evento en formato Markdown.
- `cover`: (String, Opcional) URL de la imagen de portada del evento.
- `date`: (String) Fecha y hora del evento en formato ISO 8601.
- `access`: (Enum, Opcional) Nivel de acceso al evento.
- `createdAt`: (String) Fecha y hora de creación del evento en formato ISO 8601.
- `createdBy`: (String) Identificador del usuario que creó el evento.

**Ejemplo Success Response:**

```json
{
  "eventId": "a1b2c3d4e5f6g7h8i9j0",
  "name": "Evento de Networking de ChelasJS",
  "body": "**¡No te pierdas nuestro próximo evento de networking!**\n\nConocerás a otros miembros de la comunidad ChelasJS y podrás compartir tus experiencias y proyectos.",
  "date": "2024-03-15T18:30:00Z",
  "cover": "https://ejemplo.com/imagenes/cover-evento-networking.png",
  "access": "PUBLIC",
  "createdAt": "2024-03-01T10:00:00Z",
  "createdBy": "user123"
}
```

---

## Endpoint: GET /events

Este endpoint permite listar todos los eventos disponibles.

### Success Response

**Código:** `200 OK`

**Body:** `Array<EventSchema>`

Retorna un array de objetos JSON, donde cada objeto cumple con el schema `EventSchema`, representando una lista de eventos.

**Ejemplo Success Response:**

```json
[
  {
    "eventId": "a1b2c3d4e5f6g7h8i9j0",
    "name": "Evento de Networking de ChelasJS",
    "body": "**¡No te pierdas nuestro próximo evento de networking!**\n\nConocerás a otros miembros de la comunidad ChelasJS y podrás compartir tus experiencias y proyectos.",
    "date": "2024-03-15T18:30:00Z",
    "cover": "https://ejemplo.com/imagenes/cover-evento-networking.png",
    "access": "PUBLIC",
    "createdAt": "2024-03-01T10:00:00Z",
    "createdBy": "user123"
  },
  {
    "eventId": "x9y8z7a6b5c4d3e2f1g0",
    "name": "Workshop de Bun.js",
    "body": "Aprende a utilizar Bun.js en este workshop práctico.",
    "date": "2024-03-22T19:00:00Z",
    "access": "PRIVATE",
    "createdAt": "2024-03-05T14:00:00Z",
    "createdBy": "user456"
  }
]
```

### Paginación

Este endpoint soporta paginación para manejar grandes cantidades de eventos. Los parámetros de paginación se pueden enviar en la query:

- `page`: (Number, Opcional) Número de página a retornar. Por defecto es 1.
- `limit`: (Number, Opcional) Cantidad de eventos por página. Por defecto y máximo es 100.

**Ejemplo de petición con paginación:**

```
GET /events?page=2&limit=50
```

---

## Endpoint: GET /events/:eventId

Este endpoint permite obtener la información detallada de un evento específico identificado por `:eventId`.

### Success Response

**Código:** `200 OK`

**Body:** `EventSchema`

Retorna un objeto JSON que cumple con el schema `EventSchema` representando el evento solicitado.

**Ejemplo Success Response:**

```json
{
  "eventId": "a1b2c3d4e5f6g7h8i9j0",
  "name": "Evento de Networking de ChelasJS",
  "body": "**¡No te pierdas nuestro próximo evento de networking!**\n\nConocerás a otros miembros de la comunidad ChelasJS y podrás compartir tus experiencias y proyectos.",
  "date": "2024-03-15T18:30:00Z",
  "cover": "https://ejemplo.com/imagenes/cover-evento-networking.png",
  "access": "PUBLIC",
  "createdAt": "2024-03-01T10:00:00Z",
  "createdBy": "user123"
}
```

### Error Response

**Código:** `404 Not Found`

Retornado si el evento con el `eventId` especificado no existe.

**Ejemplo Error Response:**

```json
{
  "statusCode": 404,
  "message": "Evento no encontrado",
  "error": "Not Found"
}
```

---

## Endpoint: DELETE /events/:eventId

Este endpoint permite eliminar un evento específico identificado por `:eventId`.

**Autenticación:** Requerida. Solo el usuario creador del evento puede eliminarlo.

### Success Response

**Código:** `204 No Content`

Retornado si el evento fue eliminado exitosamente. No retorna body.

### Error Response

**Código:** `404 Not Found`

Retornado si el evento con el `eventId` especificado no existe.

**Ejemplo Error Response:**

```json
{
  "statusCode": 404,
  "message": "Evento no encontrado",
  "error": "Not Found"
}
```

---

## Schemas

### Access Enum

Define los posibles niveles de acceso para un evento:

- `PUBLIC`: El evento es visible y accesible para todos.
- `PRIVATE`: El evento es visible y accesible solo para usuarios autorizados (ej. miembros de la comunidad).

```typescript
enum Access {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}
```

### EventSchema

```typescript
export const EventSchema = z.object({
  eventId: z.string(),
  name: z.string(),
  body: z.string().describe("markdown format"),
  cover: z.string().url().optional(),
  date: z.string().datetime(),
  access: z.nativeEnum(Access).optional(),
  createdAt: z.string().datetime(),
  createdBy: z.string(),
});
```

### CreateEventSchema

```typescript
export const CreateEventSchema = EventSchema.pick({
  name: z.string(),
  body: z.string().describe("markdown format"),
  cover: z.string().url().optional(),
  date: z.string().datetime(),
  access: z.nativeEnum(Access).optional(),
});
```
