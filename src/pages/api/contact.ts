// Placeholder deshabilitado: el sitio ahora usa Web3Forms y es 100% estático.
// Mantener el archivo vacío evita errores si el hosting no limpia cache.
export async function GET() {
  return new Response(JSON.stringify({ disabled: true, service: 'web3forms' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
