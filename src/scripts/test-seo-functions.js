function analyzeSEO() {
  const emailInput = document.getElementById('lead-email');
  const urlInput = document.getElementById('website-url');
  const email = emailInput && 'value' in emailInput ? emailInput.value.trim() : '';
  const url = urlInput && 'value' in urlInput ? urlInput.value.trim() : '';

  // Abrir modal con los datos ya capturados (si los hay)
  openLeadModal(email, url);
}

function analyzeSEO2() {
  // Mantener compatibilidad si hay un segundo formulario
  analyzeSEO();
}

// Modal logic
function openLeadModal(email, url) {
  const modal = document.getElementById('lead-modal');
  if (!modal) return;
  const emailField = document.getElementById('lead-modal-email');
  const urlField = document.getElementById('lead-modal-url');
  if (email && emailField) emailField.value = email;
  if (url && urlField) urlField.value = url;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLeadModal() {
  const modal = document.getElementById('lead-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function submitLeadAndShowResults() {
  const emailField = document.getElementById('lead-modal-email');
  const urlField = document.getElementById('lead-modal-url');
  const email = emailField && 'value' in emailField ? emailField.value.trim() : '';
  const url = urlField && 'value' in urlField ? urlField.value.trim() : '';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Por favor ingresa un correo válido');
    return;
  }
  if (!url || !/^https?:\/\//i.test(url)) {
    alert('Por favor ingresa una URL válida (incluye http/https)');
    return;
  }
  // Simular guardado de lead y mostrar resultados
  const submitBtn = document.querySelector('#lead-modal button[onclick="submitLeadAndShowResults()"]');
  if (submitBtn) {
    submitBtn.textContent = 'Enviando...';
    submitBtn.classList.add('opacity-50');
  }
  setTimeout(() => {
    closeLeadModal();
    document.getElementById('seo-results')?.classList.remove('hidden');
    document.getElementById('seo-results')?.scrollIntoView({ behavior: 'smooth' });
    const status = document.getElementById('seo-status');
    const working = document.getElementById('seo-status-working');
    const done = document.getElementById('seo-status-done');
    if (status) status.classList.remove('hidden');
    if (working && done) {
      working.classList.remove('hidden');
      // Cambiar a "enviado" tras unos segundos
      setTimeout(() => {
        working.classList.add('hidden');
        done.classList.remove('hidden');
        // Ocultar el bloque de estado después de un tiempo
        setTimeout(() => {
          if (status) status.classList.add('hidden');
        }, 8000);
      }, 2500);
    }
    if (submitBtn) {
      submitBtn.textContent = 'Ver resultados';
      submitBtn.classList.remove('opacity-50');
    }
  }, 1200);
}
