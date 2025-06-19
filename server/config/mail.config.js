export const getMailConfig = () => {
    const port = process.env.MAIL_PORT || 465;
    const host = process.env.MAIL_HOST;
    const secure = process.env.MAIL_SECURE === "true" || false;
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASSWORD;

    if (!port || !host || !user || !pass) {
        throw new Error("Mail configuration is not defined in .env file");
    }
    return {
        port,
        host,
        secure,
        auth: {
            user,
            pass,
        },
    };
}