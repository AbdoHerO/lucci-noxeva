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
  var price = $('#formInfo input[name="price_pieces"]').val();

  // Create the data object for SheetDB
  var sheetDBData = {
    name: "Foldable Car Windshield Umbrellas",
    date: new Date().toString(),
    customer_name: fullname,
    phone: phone,
    city: "KSA",
    address: adresse,
    quantity: quantity,
    price: quantity == 2 ? "99" : "139",
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
          value: 26,
          currency: "USD",
          content_name:
            "Foldable Car Windshield Umbrellas, Large Size Car Windshield Sun Shade Umbrella for Front Windows, Suitable for Windshields of Various Car Models",
          content_type: "Car Accessories",
          product_id: "1121",
        });
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
      city: "KSA",
      adresse: adresse,
      id_product: "1121",
      name_product:
        "Foldable Car Windshield Umbrellas, Large Size Car Windshield Sun Shade Umbrella for Front Windows, Suitable for Windshields of Various Car Models",
      unit_price: price,
      quantite: quantity,
      variant: variant,
      from_landing_page: true,
    },
    success: function (response) {
      // To track the purchase event using Facebook Pixel
      // fbq("track", "Purchase", {
      //   value: 39,
      //   currency: "USD",
      //   content_name:
      //     "Foldable Car Windshield Umbrellas, Large Size Car Windshield Sun Shade Umbrella for Front Windows, Suitable for Windshields of Various Car Models",
      //   content_type: "Car Accessories",
      //   product_id: "1121",
      // });

      document.location.href =
        "/foldable_car_windshield_umbrellas_ksa/order_success.html";

      // hide loading icon and enable the button
      // $("#save_guest_order").prop("disabled", false);
      // $("#span_loading").hide();
    },
    error: function (xhr, status, error) {
      // hide loading icon and enable the button
      $("#save_guest_order").prop("disabled", false);
      $("#span_loading").hide();
      console.log("Error :", error);
      // Display an error message if the update fails
      // alert("وقع حطأ اثناء الطلب , يرجى المحاولة لاحقا ");
      document.location.href =
        "/foldable_car_windshield_umbrellas_ksa/order_success.html";
    },
  });
});
