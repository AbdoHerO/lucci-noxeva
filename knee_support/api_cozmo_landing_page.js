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
  var variant = $('#formInfo select[name="quantity_variante"]').val();
  var quantity = $('#formInfo input[name="quantity_pieces"]').val();


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
      id_product: "1126",
      name_product: "Knee Pads Sport Kneepad Gym Sports Leg Protector Sport Adhesive Strapping Long Knee Support Self-Adhesive",
      unit_price: "124.5",
      quantite: quantity,
      variant: variant,
      from_landing_page: true,
    },
    success: function (response) {
      // To track the purchase event using Facebook Pixel
      fbq("track", "Purchase", {
        value: 15,
        currency: "USD",
        content_name: "Knee Pads Sport Kneepad Gym Sports Leg Protector Sport Adhesive Strapping Long Knee Support Self-Adhesive",
        content_type: "Sports & outdoors",
        product_id: "1126",
      });

      document.location.href = "/knee_support/order_success.html";
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
      // Display an error message if the update fails
      alert("وقع حطأ اثناء الطلب , يرجى المحاولة لاحقا ");
    },
  });
});
