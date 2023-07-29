$(function () {
  function display(bool) {
    if (bool) {
      $("#container").show();
    } else {
      $("#container").hide();
    }
  }

  display(false);

  window.addEventListener("message", function (event) {
    var item = event.data;
    if (item.type === "ui") {
      if (item.status == true) {
        display(true);
      } else {
        display(false);
      }
    }
  });
  document.onkeyup = function (data) {
    if (data.which == 27) {
      $.post("http://nui2/exit", JSON.stringify({}));
      return;
    }
  };
  $("#close").click(function () {
    $.post("http://nui2/exit", JSON.stringify({}));
    return;
  });
  $("#submit").click(function () {
    let inputValue = $("#input").val();
    if (inputValue.length >= 100) {
      $.post(
        "http://nui2/error",
        JSON.stringify({
          error: "Input was greater than 100",
        })
      );
      return;
    } else if (!inputValue) {
      $.post(
        "http://nui2/error",
        JSON.stringify({
          error: "There was no value in the input field",
        })
      );
      return;
    }
    $.post(
      "http://nui2/main",
      JSON.stringify({
        text: inputValue,
      })
    );
    return;
  });
});

var $tabs = $(".tabs > div"),
  _currhash,
  $currTab;

function showTab() {
  if ($currTab.length > 0) {
    $tabs.removeClass("active");
    $currTab.addClass("active");
  }
}
$tabs.each(function () {
  var _id = $(this).attr("id");
  $(this).attr("id", _id + "_tab");
});

function anchorWatch() {
  if (document.location.hash.length > 0) {
    if (_currhash !== document.location.hash) {
      _currhash = document.location.hash;
      $currTab = $(_currhash + "_tab");
      showTab();
    }
  }
}
setInterval(anchorWatch, 300);
