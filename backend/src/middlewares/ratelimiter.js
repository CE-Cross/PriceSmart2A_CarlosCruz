import rateLimit from "express-rate-limit";

/**
 * La limitación de peticiones es a nivel de servidor y no de maquina
 */
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // Intervalo de tiempo
    max: 100, //Cantidad máxima de intervenciones en ese tiempo
    message: {
        status: 429,
        error: "Too many request"
    } 
});

export default limiter;