declare global {
    interface Request {
        params: Record<string, unknown>;
    }
}
