$(function(){
  function resize() {
    var height = $(window).height() - ($("#header").outerHeight() + $("#footer").outerHeight()) - 75;
    $("#text").height(height);
    $(".panel").height(height);
  }
  resize();
  $(window).resize(_.debounce(resize,300));

  function syncScroll() {
    var textarea = {
      size: $('#text')[0].scrollHeight,
      visibleSize: $('#text').height(),
      position: $('#text').scrollTop()
    };
    var preview = {
      size: $('#preview')[0].scrollHeight,
      visibleSize: $('#preview').height(),
      position: $('#preview').scrollTop()
    }
    var ratio = textarea.position / (textarea.size - textarea.visibleSize);
    $('#preview').scrollTop((preview.size - preview.visibleSize) * ratio);
  }
  $('#text').scroll(syncScroll);

  function render() {
    $.ajax({
      type: "POST",
      url: "/render",
      data: {
        format: $('#format').val(),
        data: $("#text").val()
      },
      success: function(data) {
        $('#preview').empty().append(data);
        syncScroll();
      }
    });
  }
  $("#format").change(render);
  $("#text").bind('input',_.debounce(render,300));

  var helpCaches = {};
  function showHelp() {
    var fmt = $('#format').val();
    var renderHelp = function(data) {
      $('#showhelp').addClass('on').text('Show Preview');
      helpCaches[fmt] = $("#text").val();
      $("#text").val(data);
      render();
//    $('#help').empty().append(data).show();
//    $('#preview').hide();
    }
    if (helpCaches[fmt]) {
      renderHelp(helpCaches[fmt]);
    }
    else {
      $.ajax({
        type: "GET",
        url: "/help/"+fmt,
        success: function(data) {
          helpCaches[fmt] = data;
          renderHelp(data);
        }
      });
    }
  }
  function hideHelp() {
    $('#showhelp').removeClass('on').text('Show Template');
    var fmt = $('#format').val();
    var data = $("#text").val();
    $("#text").val(helpCaches[fmt]);
    helpCaches[fmt] = data;
    render();
//  $('#help').hide();
//  $('#preview').show();
  }
  $('#showhelp').click(function() {
    if ($('#showhelp').hasClass('on')) {
      hideHelp();
    }
    else {
      showHelp();
    }
  });
});
