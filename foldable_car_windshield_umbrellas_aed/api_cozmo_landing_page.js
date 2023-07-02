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

  // Send an AJAX request to insert the order record

  $.ajax({
    url: "https://cozmo.ma/api/ordervisite",
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
      id_product: "1121",
      name_product: "Foldable Car Windshield Umbrellas, Large Size Car Windshield Sun Shade Umbrella for Front Windows, Suitable for Windshields of Various Car Models",
      unit_price: "552.13",
      quantite: "1",
      variant: "",
      from_landing_page: true,
    },
    success: function (response) {
      // To track the purchase event using Facebook Pixel
      fbq("track", "Purchase", {
        value: 54.18,
        currency: "USD",
        content_name: "Foldable Car Windshield Umbrellas, Large Size Car Windshield Sun Shade Umbrella for Front Windows, Suitable for Windshields of Various Car Models",
        content_type: "Car Accessories",
        product_id: "1121",
      });

      // hide loading icon and enable the button
      $("#save_guest_order").prop("disabled", false);
      $("#span_loading").hide();
      console.log("response", response);
      swal({
        title: "تمت الطلبية بنجاح!",
        text: "سيتصل بك قريقنا لتأكيد الطلبية",
        icon: "success",
        buttons: {
          confirm: {
            className: "btn btn-success",
          },
        },
      });
    },
    error: function (xhr, status, error) {
      // hide loading icon and enable the button
      $("#save_guest_order").prop("disabled", false);
      $("#span_loading").hide();
      console.log("Error :", error);
      // Display an error message if the update fails
      alert("وقع حطأ اثناء الطلب , يرجى المحاولة لاحقا ");
    },
  });
});
