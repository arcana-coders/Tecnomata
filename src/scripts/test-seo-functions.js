async function analyzeSEO() {
  const emailInput = document.getElementById('lead-email');
  const urlInput = document.getElementById('website-url');
  const email = emailInput && 'value' in emailInput ? emailInput.value.trim() : '';
  const url = urlInput && 'value' in urlInput ? urlInput.value.trim() : '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Por favor ingresa un correo válido');
    return;
  }
  if (!url || !/^https?:\/\//i.test(url)) {
    alert('Por favor ingresa una URL válida (incluye http/https)');
    return;
  }

  // Enviar datos directamente a Web3Forms
  try {
    const formData = new FormData();
    formData.append('access_key', 'ba14b143-143f-425b-b5f6-cea1e2bccdb3');
    formData.append('subject', 'Solicitud de Test SEO - tecnomata.com');
    formData.append('name', 'Solicitud Test SEO');
    formData.append('email', email);
    formData.append('message', `Solicitud de Test SEO para la página: ${url}`);
    formData.append('botcheck', '');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    
    if (result.success) {
      // Mostrar estado de éxito
      const status = document.getElementById('seo-status');
      const working = document.getElementById('seo-status-working');
      const done = document.getElementById('seo-status-done');
      if (status) status.classList.remove('hidden');
      if (working && done) {
        working.classList.remove('hidden');
        setTimeout(() => {
          working.classList.add('hidden');
          done.classList.remove('hidden');
          setTimeout(() => {
            if (status) status.classList.add('hidden');
          }, 8000);
        }, 2500);
      }
    } else {
      alert('Error al enviar la solicitud. Inténtalo nuevamente.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al enviar la solicitud. Inténtalo nuevamente.');
  }
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

async function submitLeadAndShowResults() {
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
  
  const submitBtn = document.querySelector('#lead-modal button[onclick="submitLeadAndShowResults()"]');
  if (submitBtn) {
    submitBtn.textContent = 'Enviando...';
    submitBtn.classList.add('opacity-50');
  }

  // Enviar datos reales a Web3Forms
  try {
    const formData = new FormData();
    formData.append('access_key', 'ba14b143-143f-425b-b5f6-cea1e2bccdb3');
    formData.append('subject', 'Solicitud de Test SEO - tecnomata.com');
    formData.append('name', 'Solicitud Test SEO');
    formData.append('email', email);
    formData.append('message', `Solicitud de Test SEO para la página: ${url}`);
    formData.append('botcheck', '');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    
    if (result.success) {
      // Éxito: mostrar resultados
      closeLeadModal();
      document.getElementById('seo-results')?.classList.remove('hidden');
      document.getElementById('seo-results')?.scrollIntoView({ behavior: 'smooth' });
      const status = document.getElementById('seo-status');
      const working = document.getElementById('seo-status-working');
      const done = document.getElementById('seo-status-done');
      if (status) status.classList.remove('hidden');
      if (working && done) {
        working.classList.remove('hidden');
        setTimeout(() => {
          working.classList.add('hidden');
          done.classList.remove('hidden');
          setTimeout(() => {
            if (status) status.classList.add('hidden');
          }, 8000);
        }, 2500);
      }
    } else {
      alert('Error al enviar la solicitud. Inténtalo nuevamente.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al enviar la solicitud. Inténtalo nuevamente.');
  }
  
  if (submitBtn) {
    submitBtn.textContent = 'Ver resultados';
    submitBtn.classList.remove('opacity-50');
  }
}
