
// Accessibility helpers and small utilities
document.addEventListener('DOMContentLoaded', function(){
  // set years
  var y = new Date().getFullYear();
  document.getElementById('year')?.textContent = y;
  document.getElementById('year2')?.textContent = y;
  document.getElementById('year3')?.textContent = y;

  // Simple input masks for cpf, telefone, cep
  function setMask(el, maskFunc){
    el.addEventListener('input', function(e){
      var val = el.value.replace(/\D/g, '');
      el.value = maskFunc(val);
    });
  }

  function cpfMask(v){
    return v.replace(/^(\d{3})(\d)/, '$1.$2').replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3').replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4').slice(0,14);
  }
  function telMask(v){
    if (v.length <= 10) return v.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/,'$1-$2').slice(0,14);
    return v.replace(/^(\d{2})(\d{5})(\d)/,'($1) $2-$3').slice(0,15);
  }
  function cepMask(v){
    return v.replace(/^(\d{5})(\d)/,'$1-$2').slice(0,9);
  }

  var cpfEl = document.getElementById('cpf');
  if (cpfEl) setMask(cpfEl, cpfMask);
  var telEl = document.getElementById('telefone');
  if (telEl) setMask(telEl, telMask);
  var cepEl = document.getElementById('cep');
  if (cepEl) setMask(cepEl, cepMask);

  // Client-side enhancement: validate pattern before submit and announce
  var form = document.getElementById('cadastroForm');
  if (form){
    form.addEventListener('submit', function(e){
      if (!form.reportValidity()){
        e.preventDefault();
        // announce error for screen readers
        var live = document.getElementById('formLive');
        if (!live){
          live = document.createElement('div');
          live.id = 'formLive';
          live.setAttribute('aria-live','polite');
          live.style.position='absolute';live.style.left='-9999px';
          document.body.appendChild(live);
        }
        live.textContent = 'Formulário contém erros. Verifique os campos destacados.';
      } else {
        // For demo, prevent actual submit and show success
        e.preventDefault();
        alert('Inscrição enviada! (demo)');
        form.reset();
      }
    });
  }

  // Keyboard focus styles improvement
  function handleFirstTab(e){
    if (e.key === 'Tab'){
      document.documentElement.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
});
