window.addEventListener("load", function () {
  $(".loader").hide();
  $("body").removeClass("body_fixed");

  // To track the ViewContent event using TikTok Pixel
  ttq.track("ViewContent");
});

// document.addEventListener("DOMContentLoaded", function () {
//     var loaderWrapper = document.getElementById("loader-wrapper");
//     loaderWrapper.style.display = "none";
//   });
