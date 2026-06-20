// configuracion inicial de sentry
import * as Sentry from '@sentry/node';
import { config } from './config/env.js';

Sentry.init({
    dsn: config.SENTRY_DSN,
    tracesSampleRate: 1.0, 
});