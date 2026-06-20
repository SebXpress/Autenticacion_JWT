// importamos sentry antes de todo como prioridad
import './instrument.js';
import * as Sentry from '@sentry/node';
import express from 'express';
import { config } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import resourceRoutes from './routes/resource.routes.js';

const app = express();

app.use(express.json());

// TODO: Montar las rutas.
// 1. Usar /auth para authRoutes.
// 2. Usar /api para resourceRoutes (o directamente en la raíz).

app.use('/auth', authRoutes);
app.use('/', resourceRoutes);

// el manejador de errores de sentry debe ir despues de todas las rutas
Sentry.setupExpressErrorHandler(app);

// middleware general opcional para que el usuario no vea el error crudo
app.use((err, req, res, next) => {
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'ha ocurrido un fallo en el servidor,el equipo de soporte fue notificado'
    });
});

app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
});
