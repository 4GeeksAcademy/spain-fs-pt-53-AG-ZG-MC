import os
import smtplib
from flask import url_for
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime, timedelta

def send_password_reset_email(receiver_email, username, reset_token):
    try:
        smtp_server = os.getenv("SMTP_SERVER")  # Obtén el servidor SMTP de las variables de entorno
        smtp_port = int(os.getenv("SMTP_PORT"))  # Obtén el puerto SMTP de las variables de entorno
        sender_email = os.getenv("SENDER_EMAIL")  # Obtén el correo electrónico del remitente de las variables de entorno
        sender_password = os.getenv("SENDER_PASSWORD")  # Obtén la contraseña del remitente de las variables de entorno
        base_url = os.getenv("BACKEND_URL")  # Agrega esta variable de entorno con la URL base de tu aplicación


        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = receiver_email
        msg['Subject'] = "Password Reset Request"

        # Cuerpo del correo electrónico con el enlace de restablecimiento de contraseña
        reset_link = f"{base_url}/reset-password?token={reset_token}"
        body = f"Hi {username},\n\nYou requested a password reset. Please click on the following link to reset your password:\n\n{reset_link}\n\nThis link is valid for 1 hour.\n\nIf you didn't request this, please ignore this email."
        msg.attach(MIMEText(body, 'plain'))

        # Inicia sesión en el servidor SMTP, envía el correo electrónico y cierra la sesión
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, msg.as_string())

    except Exception as e:
        print("Error sending password reset email:", e)
        # Puedes manejar el error de envío de correo electrónico de manera adecuada aquí
