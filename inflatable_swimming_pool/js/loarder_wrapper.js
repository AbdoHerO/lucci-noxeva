window.addEventListener("load", function () {
  $(".loader").hide();
  $("body").removeClass("body_fixed");

  // To track the ViewContent event using TikTok Pixel
  ttq.track("ViewContent", {
    contents: [
      {
        content_id: "1046",
        content_name: "inflatable_swimming_pool",
        quantity: 1,
        price: 159.9,
      },
    ],
    content_type: "inflatable_swimming_pool",
    value: 159.9,
    currency: "USD",
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//     var loaderWrapper = document.getElementById("loader-wrapper");
//     loaderWrapper.style.display = "none";
//   });
