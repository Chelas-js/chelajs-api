# Autenticación para la API REST

Muchos endpoints en esta API REST requieren autenticación para garantizar un acceso seguro y la autorización adecuada. Este documento describe el método de autenticación utilizado.

## Autenticación Basada en Tokens

Esta API utiliza la autenticación basada en tokens. Para autenticar las peticiones, debe incluir un encabezado `Authorization` en sus peticiones HTTP. El encabezado debe usar el esquema `Bearer` e incluir su token de autenticación.

**Formato del Encabezado Authorization:**

```
Authorization: Bearer TU_TOKEN_API
```

Donde `TU_TOKEN_API` es su token de autenticación único.

**Ejemplo usando curl:**

```shell
curl --request GET \
  --url "https://api.chelajs.cl/job_offers" \
  --header "Authorization: Bearer TU_TOKEN_API"
```

**Explicación:**

- **Encabezado `Authorization`:** Este es el encabezado HTTP estándar utilizado para las credenciales de autenticación.
- **Esquema `Bearer`:** Indica que se está utilizando un token Bearer para la autorización. Los tokens Bearer son un estándar ampliamente utilizado para la autenticación basada en tokens.
- **`TU_TOKEN_API`:** Reemplace este marcador de posición con su token de API real. Este token se le proporciona (o se genera a través de un proceso de inicio de sesión - _Nota: Los detalles sobre la adquisición del token no se proporcionan en esta documentación_).

**Notas Importantes:**

- **Adquisición del Token:** (_Nota: Como no se proporcionó información sobre cómo obtener un token, esta sección se mantiene general. Si tiene detalles, reemplace el texto de marcador de posición a continuación_). Esta documentación no cubre actualmente cómo obtener su token de API. Por favor, consulte la documentación o instrucciones separadas sobre cómo adquirir un token de API válido para la autenticación.
- **Requisitos del Endpoint:** Consulte la documentación de cada endpoint específico para determinar si se requiere autenticación. Los endpoints que requieren autenticación típicamente devolverán un código de estado `401 No Autorizado` o `403 Prohibido` si falta la autenticación o no es válida.
- **Seguridad:** Mantenga sus tokens de API confidenciales. No los exponga en código del lado del cliente o repositorios públicos. Trate sus tokens de API como contraseñas.

Este mecanismo de autenticación asegura que solo usuarios y aplicaciones autorizadas puedan acceder a los recursos protegidos dentro de la API. Siempre incluya un encabezado `Authorization: Bearer TU_TOKEN_API` válido cuando interactúe con endpoints que requieran autenticación.
