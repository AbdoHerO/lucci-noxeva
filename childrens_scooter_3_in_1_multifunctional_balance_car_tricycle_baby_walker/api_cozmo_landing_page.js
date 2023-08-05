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
      id_product: "1130",
      name_product: "Children Scooter Tricycle Baby 3 In 1 Multi-Function Balance Bike Ride On Toys",
      unit_price: "399",
      quantite: "1",
      variant: "",
      from_landing_page: true,
    },
    success: function (response) {
      // To track the purchase event using Facebook Pixel
      fbq("track", "Purchase", {
        value: 10,
        currency: "USD",
        content_name: "Children Scooter Tricycle Baby 3 In 1 Multi-Function Balance Bike Ride On Toys",
        content_type: "Enfants et jouet",
        product_id: "1130",
      });

      document.location.href = "/childrens_scooter_3_in_1_multifunctional_balance_car_tricycle_baby_walker/order_success.html";

      // hide loading icon and enable the button
      // $("#save_guest_order").prop("disabled", false);
      // $("#span_loading").hide();
      console.log("response", response);
      // swal({
      //   title: "تمت الطلبية بنجاح!",
      //   text: "سيتصل بك قريقنا لتأكيد الطلبية",
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
