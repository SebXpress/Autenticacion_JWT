//importamos sentry que fue recienteemente agregado
import * as Sentry from '@sentry/node';
export class ResourceController {
    static getAlphaPrivateData(req, res) {
        // error operacional: simulamos un fallo critico de base de datos
        // al lanzar la excepcion cruda, sentry lo capturara automaticamente
        throw new Error("conexion perdida con la base de datos central");

        // el codigo inferior nunca se ejecutara debido al throw
        return res.status(200).json({
            service: 'Microservicio Alpha'
        });
    }

    static getBetaPrivateData(req, res) {
        try {
            // simulamos que un proceso interno fallo en beta
            throw new Error("division por cero al calcular metricas del usuario");
        } catch (error) {
            // captura explicita del error reportando a sentry
            Sentry.withScope((scope) => {
                // agregamos etiquetas personalizadas para el dashboard
                scope.setTag("microservice", "beta");
                scope.setTag("error_type", "calculo_metricas");

                // adjuntamos el contexto del usuario (sin contraseñas)
                // req.user existe gracias a nuestro middleware stateless
                scope.setUser({ 
                    id: req.user.sub, 
                    username: req.user.name 
                });

                // disparamos la alerta manualmente
                Sentry.captureException(error);
            });

            // respondemos al cliente de forma controlada
            return res.status(500).json({
                error: 'InternalError',
                message: 'ocurrio un fallo interno en beta, pero ya fue reportado a monitoreo.'
            });
        }
    }
}