export function litoResponse(data: Record<string, unknown>, status: number) {
    return new Response(JSON.stringify({ data }), { status });
}
