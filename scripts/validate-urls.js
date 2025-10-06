// scripts/validate-urls.js - Validar URLs antes del envío
const urls = [
  'http://localhost:4322/',
  'http://localhost:4322/marketing-internet-morelos',
  'http://localhost:4322/disenador-web-morelos',
  'http://localhost:4322/agencia-publicidad-morelos', 
  'http://localhost:4322/asesor-marketing-morelos',
  'http://localhost:4322/sitemap-index.xml'
];

async function validateUrl(url) {
  try {
    const response = await fetch(url);
    return {
      url,
      status: response.status,
      ok: response.ok,
      contentType: response.headers.get('content-type')
    };
  } catch (error) {
    return {
      url,
      status: 'ERROR',
      ok: false,
      error: error.message
    };
  }
}

async function validateAllUrls() {
  console.log('🔍 Validando URLs para Google Search Console...\n');
  
  const results = await Promise.all(urls.map(validateUrl));
  
  results.forEach(result => {
    const status = result.ok ? '✅' : '❌';
    console.log(`${status} ${result.url}`);
    console.log(`   Status: ${result.status}`);
    if (result.contentType) {
      console.log(`   Content-Type: ${result.contentType}`);
    }
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
    console.log('');
  });

  const allValid = results.every(r => r.ok);
  
  if (allValid) {
    console.log('🎉 Todas las URLs están funcionando correctamente!');
    console.log('✅ Listo para enviar a Google Search Console');
  } else {
    console.log('⚠️  Algunas URLs tienen problemas. Revisa antes del envío.');
  }
}

// Ejecutar directamente
validateAllUrls();