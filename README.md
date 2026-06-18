## Autenticación Stateless y Microservicios

### Investigación: Integración de Refresh Tokens

**1. Experiencia de Usuario y Seguridad Distribuida**
El token de 1 minuto nos permite proteger el sistema limitando a que se encuentre expuesta hacia posibles robos. Pero para evitar que el usuario deba estar logueandose a cada minuto se implementa un "Refresh Token", este es un token de larga duracion que se envia de manera silenciosa en segundo plano al servidor de identidad para obtener un nuevo AccesToken, lo que ayuda a no compometer la arquitectura ya que los microservicios de alpha y beta van a seguir siendo Stateless y al mismo tiempo el servidor de identidad va a mantener el control centralizado para poder revocar el Refresh token si logra detectar alguna anomalia.

**2. Almacenamiento y Ciclo de Vida**
El Refresh token nunca debe guardarse en el LocalStorage por parte del cliente, ya que al hacer esto es vulnerable a ataques de Cross site scripting, para lograr una mejor practica el proyecto debe almacenarse en el cliente dentro de una cookie segura configurada por el servidor tomando en cuenta ciertas directivas:
* `HttpOnly`: Bloquea el acceso al token desde JavaScript (mitiga XSS).
* `Secure`: Obliga a que la cookie solo viaje por conexiones encriptadas HTTPS.
* `SameSite=Strict`: Previene ataques CSRF. 
El ciclo de vida se gestiona automáticamente cuando el navegador envía esta cookie al endpoint de refresco del Servidor de Identidad.