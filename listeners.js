$(document).ready(function() {
  
  $(document).on("input", "#colorpicker", function(){
    const backgroundColor = $(this).val();
    $("th, .rightcol").css("background-color", backgroundColor);
  })

  $(".gearIcon").click(function(){
    $el = $(".settingsModal");
    if ($el.is(":hidden")){
      $el.css("display", "flex");
    } else {
      $el.css("display", "none");
    }
  })

  $(".closeIcon").click(function(){
    $(".settingsModal").css("display", "none");
  })
});
