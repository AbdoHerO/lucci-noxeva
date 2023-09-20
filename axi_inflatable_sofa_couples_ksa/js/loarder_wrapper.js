window.addEventListener("load", function () {
  $(".loader").hide();
  $("body").removeClass("body_fixed");

  // To track the ViewContent event using TikTok Pixel
  ttq.track("ViewContent", {
    contents: [
      {
        content_id: "1125",
        content_name: "axi_inflatable_sofa",
        quantity: 1,
        price: 110,
      },
    ],
    content_type: "product",
    value: 110,
    currency: "USD",
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//     var loaderWrapper = document.getElementById("loader-wrapper");
//     loaderWrapper.style.display = "none";
//   });
