;(function(){
  const TOKEN   = "7e8cc85dc93f1146f2804199b89cf419"; // seu CPF_CNPJ_TOKEN
  const PACKAGE = 1;                                 // seu CPF_CNPJ_PACKAGE

  function onReady(fn) {
    if (document.readyState !== 'loading') return fn();
    document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function(){
    // Ajuste estes seletores conforme seu tema de checkout
    const cpfField  = document.querySelector('input[name="checkout[contact_identification]"]');
    const nameField = document.querySelector('input[name="checkout[shipping_address][name]"]');
    if (!cpfField || !nameField) return;

    cpfField.addEventListener('blur', async () => {
      const raw = cpfField.value.replace(/\D/g, '');
      if (raw.length !== 11) return;

      try {
        const resp = await fetch(
          `https://api.cpfcnpj.com.br/${TOKEN}/${PACKAGE}/${raw}`
        );
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        if (data.status === 1 && data.nome) {
          nameField.value = data.nome.trim();
        }
      } catch (e) {
        // Se falhar, não faz nada e mantém o valor que o cliente digitou
        console.warn("Validador CPF.CNPJ falhou:", e);
      }
    });
  });
})();
