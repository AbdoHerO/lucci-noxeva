$("#formInfo").submit(function (event) {
  // show loading icon and disable the button
  $("#save_guest_order").prop("disabled", true);
  $("#span_loading").show();

  // Prevent the default form submission
  event.preventDefault();

  // Get the updated data from the form
  var fullname = $('#formInfo input[name="fullname"]').val();
  var phone = $('#formInfo input[name="phone"]').val();
  var adresse = $('#formInfo input[name="adresse"]').val();
  var variant = $('#formInfo select[name="color"]').val();

  // Create the data object for SheetDB
  var sheetDBData = {
    name: "inflatable_swimming_pool",
    date: new Date().toString(),
    customer_name: fullname,
    phone: phone,
    city: adresse,
    address: adresse,
    quantity: "1",
    price: "1101 MAD",
    product_notice: variant,
    notice: "",
    status: "pending",
    fees_shipping: "",
  };

  // Insert into SheetDB API
  fetch("https://sheetdb.io/api/v1/06f3h8j6ekqmo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: sheetDBData }),
  })
    .then(function (response) {
      console.log("sent");
      if (response.ok) {
        // Handle successful response from SheetDB
        console.log("Order added to SheetDB successfully");

        // To track the purchase event using Facebook Pixel
        fbq("track", "Purchase", {
          value: 10,
          currency: "USD",
          content_name: "inflatable_swimming_pool",
          content_type: "Sports & outdoors",
          product_id: "1046",
        });

        // To track the purchase event using Snap Pixel
        // snaptr("track", "PURCHASE", { value: 132, currency: "USD" });
      } else {
        // Handle error response from SheetDB
        console.log("Failed to add order to SheetDB");
        // throw new Error("Failed to add order to SheetDB");
      }
    })
    .catch(function (error) {
      console.log("NOT sent");
      console.log("Error:", error);
      // Display an error message if the request fails
      // alert("Failed to add order to SheetDB. Please try again later.");
    });

  // Send an AJAX request to insert the order record
  $.ajax({
    url: "https://noxeva.com/api/ordervisite",
    type: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    cors: true,
    data: {
      first_name: fullname,
      last_name: "",
      phone: phone,
      city: "",
      adresse: adresse,
      id_product: "1046",
      name_product: "inflatable_swimming_pool",
      unit_price: "1101",
      quantite: "1",
      variant: variant,
      from_landing_page: true,
    },
    success: function (response) {
      // To track the purchase event using TikTok Pixel
      // ttq.track("CompletePayment");

      document.location.href = "/inflatable_swimming_pool/order_success.html";
      // hide loading icon and enable the button
      //   $("#save_guest_order").prop("disabled", false);
      //   $("#span_loading").hide();
      // console.log("response", response);

      // swal({
      //   title: "تمت الطلبية بنجاح!",
      //   text: "سيتصل بك فريقنا لتأكيد الطلبية",
      //   icon: "success",
      //   buttons: {
      //     confirm: {
      //       className: "btn btn-success",
      //     },
      //   },
      // });
    },
    error: function (xhr, status, error) {
      // hide loading icon and enable the button
      $("#save_guest_order").prop("disabled", false);
      $("#span_loading").hide();
      console.log("Error :", error);

      // // Display an error message if the update fails
      // alert("وقع حطأ اثناء الطلب , يرجى المحاولة لاحقا ");

      document.location.href = "/inflatable_swimming_pool/order_success.html";
    },
  });
});
