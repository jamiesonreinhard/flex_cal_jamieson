$(document).ready(function() {
  $(document).on("input", "#colorpicker", function(){
    const backgroundColor = $(this).val();
    $("th, .rightcol").css("background-color", backgroundColor);
  })
});
