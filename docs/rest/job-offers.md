# Job Offers REST API Documentation

## Table of Contents

- [Endpoint: PUT /job_offers/:offerId](#endpoint-put-job_offersofferid)
  - Request Body
  - Example Request Body
  - Success Response
- [Endpoint: GET /job_offers](#endpoint-get-job_offers)
  - Success Response
  - Paginación
- [Endpoint: GET /job_offers/:offerId](#endpoint-get-job_offersofferid)
  - Success Response
  - Error Response
- [Endpoint: DELETE /job_offers/:offerId](#endpoint-delete-job_offersofferid)
  - Success Response
  - Error Response
- [Schemas](#schemas)
  - [Access Enum](#access-enum)
  - [CreateOfferSchema](#createofferschema)
  - [OfferSchema](#offerschema)

# Endpoint: PUT /job_offers/:offerId

Permite crear o actualizar una oferta de trabajo en la base de datos. Si la oferta con el `offerId` proporcionado no existe, se creará una nueva. Si ya existe, se actualizará con los datos proporcionados en el cuerpo de la petición. **Este endpoint requiere autenticación y autorización. Consulte la [documentación de autenticación](./authentication.md) para obtener detalles sobre cómo autenticar sus peticiones. Solo usuarios autenticados y autorizados pueden crear o modificar ofertas de trabajo.**

**Authentication and Authorization Required:** Este endpoint **requiere autenticación y autorización**. Consulte la [documentación de autenticación](./authentication.md) para obtener detalles sobre cómo autenticar sus peticiones. **Solo se permite la creación o modificación de ofertas a usuarios autenticados y autorizados.**

## Request Body

El cuerpo de la petición debe ser un objeto JSON que se ajusta al esquema `CreateOfferSchema`.

```ts
// CreateOfferSchema

export const CreateOfferSchema = z.object({
  offer_id: z.string(),
  title: z.string().nonempty(),
  expiration: z.string().datetime(),
  body: z.string(),
  labels: z.array(z.string()),
  target: z.string().url(),
  access: z.nativeEnum(Access),
});
```

El esquema completo `CreateOfferSchema` se puede encontrar en el archivo `src/job-offers/dtos/create-offert.dto.ts`.

Donde:

- `offer_id`: Identificador único de la oferta de trabajo. Debe ser de tipo string.
- `title`: Título de la oferta de trabajo. Debe ser de tipo string y no puede estar vacío.
- `expiration`: Fecha y hora de expiración de la oferta de trabajo. Debe ser de tipo string y formato datetime (ISO 8601).
- `body`: Descripción detallada del puesto de trabajo ofertado. Debe ser de tipo string.
- `labels`: Etiquetas o categorías asociadas a la oferta de trabajo. Debe ser un array de strings.
- `target`: URL donde se puede aplicar a la oferta de trabajo. Debe ser de tipo string y formato URL válido.
- `access`: Tipo de acceso a la oferta de trabajo. Debe ser un valor del enum `Access`. Ver la sección [Access Enum](#access-enum) para más detalles.

## Example Request Body

```json
{
  "title": "job1",
  "expiration": "2025-03-23T23:33:51.210Z",
  "body": "hola",
  "labels": [],
  "target": "https://example.com",
  "access": "public"
}
```

_Nota:_ El esquema `CreateOfferSchema` define el campo `offer_id` como requerido en el body de la petición. Sin embargo, el ejemplo de body proporcionado no incluye el campo `offer_id`. De acuerdo al esquema, para crear o actualizar una oferta, el body de la petición debería incluir el campo `offer_id` y su valor debería corresponder con el `:offerId` indicado en la URL del endpoint.

## Success Response

Si la oferta de trabajo se crea o actualiza correctamente, el servicio responderá con un código de estado HTTP `201 Created`.

**Status Code:** `201 Created`

El cuerpo de la respuesta contendrá el objeto de la oferta de trabajo que ha sido creado o actualizado en la base de datos. El formato del objeto retornado corresponderá a la representación de la oferta de trabajo creada o actualizada.

# Endpoint: GET /job_offers

Entrega una lista paginada de todas las ofertas de trabajo públicas. Este endpoint retorna todas las ofertas que tienen el campo `access` establecido como `public`. **Este endpoint requiere autenticación. Consulte la [documentación de autenticación](./authentication.md) para obtener detalles sobre cómo autenticar sus peticiones.**

**Authentication Required:** Este endpoint **requiere autenticación**. Consulte la [documentación de autenticación](./authentication.md) para obtener detalles sobre cómo autenticar sus peticiones.

## Success Response

Si la petición es exitosa, el servicio responderá con un código de estado HTTP `200 OK`.

**Status Code:** `200 OK`

El cuerpo de la respuesta contendrá un objeto JSON con la siguiente estructura:

```json
{
  "data": [
    // Array de objetos Offer (estructura de la oferta de trabajo)
    // ...
  ],
  "nextToken": "string" // Token para la siguiente página de resultados (opcional)
}
```

Donde:

- `data`: Un array de objetos, donde cada objeto representa una oferta de trabajo pública. La estructura de cada objeto dentro del array `data` se define por el [Offer Schema](#offerschema).
- `nextToken`: Un string opcional. Si existe más de una página de resultados, este campo contendrá un token que se puede utilizar en la siguiente petición GET a `/job_offers` para obtener la siguiente página de ofertas. Si no hay más páginas, este campo no estará presente o será `null`.

## Paginación

Para obtener la siguiente página de resultados, se debe incluir el valor del `nextToken` recibido en la respuesta anterior como un query parameter en la siguiente petición GET a `/job_offers`.

Por ejemplo, si la respuesta anterior contiene `"nextToken": "abc123xyz"`, la siguiente petición para obtener la siguiente página sería:

`GET /job_offers?nextToken=abc123xyz`

# Endpoint: GET /job_offers/:offerId

Permite obtener una oferta de trabajo específica por su `offerId`. **Este endpoint requiere autenticación. Consulte la [documentación de autenticación](./authentication.md) para obtener detalles sobre cómo autenticar sus peticiones. Para ofertas privadas, solo el propietario autenticado puede acceder a la información.**

**Authentication Required:** Este endpoint **requiere autenticación**. Consulte la [documentación de autenticación](./authentication.md) para obtener detalles sobre cómo autenticar sus peticiones. **El acceso a ofertas privadas está restringido al propietario autenticado.**

## Success Response

Si la oferta de trabajo existe y es accesible (es decir, no es privada o el usuario autenticado es el dueño de la oferta privada), el servicio responderá con un código de estado HTTP `200 OK`.

**Status Code:** `200 OK`

El cuerpo de la respuesta contendrá un objeto JSON que representa la oferta de trabajo solicitada, con la estructura definida por el [Offer Schema](#offerschema).

## Error Response

Si la oferta de trabajo con el `offerId` proporcionado no existe en la base de datos, o si la oferta existe pero es de tipo `private` y el usuario autenticado no es el dueño, el servicio responderá con un código de estado HTTP `404 Not Found`.

**Status Code:** `404 Not Found`

_Nota:_ Se asume que las ofertas `private` solo son accesibles a través de este endpoint al usuario autenticado que sea el dueño de la oferta. No se especifica un código de error diferente para ofertas privadas versus ofertas no existentes, se retorna `404 Not Found` en ambos casos para peticiones no autorizadas o no encontradas.

# Endpoint: DELETE /job_offers/:offerId

Permite eliminar una oferta de trabajo específica por su `offerId`. La eliminación solo será exitosa si el usuario que realiza la petición es el mismo usuario que creó la oferta. **Este endpoint requiere autenticación y autorización. Consulte la [documentación de autenticación](./authentication.md) para obtener detalles sobre cómo autenticar sus peticiones. Solo el propietario autenticado de la oferta puede eliminarla.**

**Authentication and Authorization Required:** Este endpoint **requiere autenticación y autorización**. Consulte la [documentación de autenticación](./authentication.md) para obtener detalles sobre cómo autenticar sus peticiones. **Solo el propietario autenticado de la oferta tiene autorización para eliminarla.**

## Success Response

Si la oferta de trabajo se elimina correctamente, el servicio responderá con un código de estado HTTP `204 No Content`.

**Status Code:** `204 No Content`

_Nota:_ Un código `204 No Content` indica que la operación de eliminación fue exitosa y no se retorna ningún contenido en el cuerpo de la respuesta.

## Error Response

- **Status Code:** `404 Not Found`

  Si la oferta de trabajo con el `offerId` proporcionado no existe en la base de datos.

- **Status Code:** `403 Forbidden`

  Si el usuario que intenta eliminar la oferta no es el mismo usuario que la creó. Este código indica que el usuario está autenticado, pero no tiene los permisos necesarios para eliminar esta oferta en particular.

# Schemas

## Access Enum

El enum `Access` define los posibles niveles de acceso para una oferta de trabajo. Se encuentra definido en el archivo `src/constants/access.enum.ts`.

```ts
export enum Access {
  public = "public",
  private = "private",
}
```

Los valores posibles para el enum `Access` son:

- `public`: La oferta de trabajo es visible para todos los usuarios. Valor string asociado: `"public"`.
- `private`: La oferta de trabajo es visible solo para usuarios autorizados. _(Nota: No se especifica el mecanismo de autorización)_. Valor string asociado: `"private"`.

## CreateOfferSchema

Esquema utilizado para crear o actualizar una oferta de trabajo mediante el endpoint `PUT /job_offers/:offerId`. Se define en el archivo `src/job-offers/dtos/create-offert.dto.ts`.

```ts
// CreateOfferSchema

export const CreateOfferSchema = z.object({
  offer_id: z.string(),
  title: z.string().nonempty(),
  expiration: z.string().datetime(),
  body: z.string(),
  labels: z.array(z.string()),
  target: z.string().url(),
  access: z.nativeEnum(Access),
});
```

- `offer_id`: Identificador único de la oferta de trabajo. _Tipo: string_.
- `title`: Título de la oferta de trabajo. No puede estar vacío. _Tipo: string_.
- `expiration`: Fecha y hora de expiración de la oferta de trabajo. Formato ISO 8601 datetime. _Tipo: string_.
- `body`: Descripción detallada del puesto de trabajo ofertado. _Tipo: string_.
- `labels`: Etiquetas o categorías asociadas a la oferta de trabajo. _Tipo: array de strings_.
- `target`: URL donde se puede aplicar a la oferta de trabajo. Debe ser una URL válida. _Tipo: string_.
- `access`: Tipo de acceso a la oferta de trabajo. Debe ser un valor del enum `Access`. Ver la sección [Access Enum](#access-enum) para más detalles. _Tipo: enum `Access`_.

## OfferSchema

Esquema que define la estructura de una oferta de trabajo, retornado en las respuestas de los endpoints, por ejemplo en el endpoint `GET /job_offers`. Se define en el archivo `src/job-offers/dtos/offert.dto.ts`.

```ts
// OfferSchema

export const OfferSchema = z.object({
  offer_id: z.string(),
  title: z.string(),
  expiration: z.string(),
  body: z.string(),
  labels: z.array(z.string()),
  target: z.string(),
  access: z.nativeEnum(Access),
  craetedAt: z.string(),
  createdBy: z.string(),
});
```

- `offer_id`: Identificador único de la oferta de trabajo. _Tipo: string_.
- `title`: Título de la oferta de trabajo. _Tipo: string_.
- `expiration`: Fecha y hora de expiración de la oferta de trabajo. _Tipo: string_.
- `body`: Descripción detallada del puesto de trabajo ofertado. _Tipo: string_.
- `labels`: Etiquetas o categorías asociadas a la oferta de trabajo. _Tipo: array de strings_.
- `target`: URL donde se puede aplicar a la oferta de trabajo. _Tipo: string_.
- `access`: Tipo de acceso a la oferta de trabajo. Valor del enum `Access`. Ver la sección [Access Enum](#access-enum) para más detalles. _Tipo: enum `Access`_.
- `craetedAt`: Fecha y hora de creación de la oferta de trabajo. _Tipo: string_.
- `createdBy`: Identificador del usuario que creó la oferta de trabajo. _Tipo: string_.
