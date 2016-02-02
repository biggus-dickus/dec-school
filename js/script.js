// Masking the required fields
$('[name=birth_date]').mask('00.00.0000');
$('[name=phone]').mask('+38 000 000 00 00');

(function() {
  var form = document.forms['dod_form'];
  var selectWhere = form['where'];
  var customFieldContainer = document.getElementById('customFieldContainer');
  var submit = document.getElementById('send_form');
  var successMsg = document.getElementById('successMsg');

  // Toggling the custom input field
  selectWhere.addEventListener('change', function() {
    if (where.options['myVariant'].selected) {
      customFieldContainer.classList.remove('hidden');
    } else {
      customFieldContainer.classList.add('hidden');
    }
  });

  // Sending via xhr
  if (!('FormData' in window)) {
    return;
  }

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    if (form.checkValidity() == true && !submit.classList.contains('disabled')) {
      var data = new FormData(form);
      var xhr = new XMLHttpRequest();

      xhr.open('POST', '/forms/dod');

      xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        form.classList.add('hidden');
        }
      });

      xhr.send(data);
      successMsg.classList.remove('hidden');
    }
  });
})();
