export default class AppConfig {

    static get HTTP_SERVER_BASE_URL(): string {
        return import.meta.env.VITE_HTTP_SERVER_BASE_URL as string
    }

    static get WS_SERVER_BASE_URL(): string {
        return import.meta.env.VITE_WS_SERVER_BASE_URL as string
    }

}