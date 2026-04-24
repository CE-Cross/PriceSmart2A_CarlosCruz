const HTMLRecoveryEmail = (code, email) => {
    return(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #66a181; display: flex; justify-content: center; align-items: center; flex-direction: column;">
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <h1 style="color: #333; text-align: center;">¿Olvidaste tu contraseña?</h1>
                <p style="color: #666; line-height: 1.6;">Hola <strong>${email}</strong>,</p>
                <p style="color: #666; line-height: 1.6;">A continuación se te presenta el codigo de verificación. Favor de digitarlo para continuar con el proceso de cambio de contraseña</p>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; display: flex; flex-direction: row; align-items: center; justify-content: center; flex-direction: column;">
                    <p style="margin: 0; color: #333; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; display: flex; justify-content: center; align-items: center; flex-direction: column; text-align: center; font-size: 40px;">${code}</p>
                </div>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; text-align: center;">Este es un correo automático, por favor no responder.</p>
            </div>
        </body>
        </html>`
    )
}