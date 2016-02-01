(function() {
  var form = document.forms['lp_form'];
  var selectWhere = form['where'];
  var customFieldContainer = document.getElementById('customFieldContainer');

  selectWhere.addEventListener('change', function() {
    if (where.options['myVariant'].selected) {
      customFieldContainer.classList.remove('hidden');
    } else {
      customFieldContainer.classList.add('hidden');
    }
  });
})();

$(function(){
    $('[name=birth_date]').mask('00.00.0000');
    $('[name=phone]').mask('+38 000 000 00 00');
    /*
    $('[name=birth_date]').inputmask('dd.mm.yyyy',
        {'placeholder': 'ДД.ММ.ГГГГ',
          onincomplete: function(){ $('[name=birth_date]').val('') }});
    $('[name=phone]').inputmask('+38(999)999-99-99',
        {'placeholder': '+38(XXX)XXX-XX-XX',
          onincomplete: function(){ $('[name=phone]').val('') }});
        */

    $('#send_lp').on('click', function() {
        var button = $(this);
        $(button).buttonLoader('start');

        $.ajax({
            url: '/forms/lp',
            type: 'post',
            data: $('[name=lp_form]').serialize(),
            success: function(data) {
              var response = JSON.parse(data);
              var inputs = ['school', 'fio_parent', 'email', 'phone', 'birth_date'];

                for(var i = 0; i < inputs.length; i++) {
                  $('[name=' + inputs[i] + ']').parent().removeClass('has-error');
                  $('[name=' + inputs[i] + ']').parent().addClass('has-success has-feedback');
                  $('[name=' + inputs[i] + ']').parent().append('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>')
                  $('[name=' + inputs[i] + ']').parent().find('.glyphicon-remove').removeClass('glyphicon-remove').addClass('glyphicon-ok');
                }

                if(response.type == "error") {
                    $(button).buttonLoader('stop');
                    for(var val in response[0]) {
                      $('[name=' + val + ']').parent().removeClass('has-success');
                      $('[name=' + val + ']').parent().removeClass('has-feedback');
                      $('[name=' + val + ']').parent().addClass('has-error has-feedback');
                      $('[name=' + val + ']').parent().append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
                      $('[name=' + val + ']').parent().find('.glyphicon-ok').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                    }
                }

                if(response.type == "ok") {
                  ga('send', 'pageview', '/conversion/lp');
                  $("#lp_form .container-mini h3").text("Ваша заявка успешно отправлена.");
                  $("[name=lp_form]").slideUp();
                }
            }
        });
    });
});
