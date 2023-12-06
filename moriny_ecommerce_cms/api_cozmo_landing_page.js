$("#formInfo").submit(function (event) {
  // show loading icon and disable the button
  $("#save_guest_order").prop("disabled", true);
  $("#span_loading").show();

  // Prevent the default form submission
  event.preventDefault();

  // Get the updated data from the form
  var fullname = $('#formInfo input[name="fullname"]').val();
  var phone = $('#formInfo input[name="phone"]').val();
  // var adresse = $('#formInfo input[name="adresse"]').val();
  // var variant = $('#formInfo select[name="color"]').val();

  // Create the data object for SheetDB
  var sheetDBData = {
    name: "Moriny Ecommerce CMS",
    date: new Date().toString(),
    customer_name: fullname,
    phone: phone,
    city: "",
    address: "",
    quantity: "1",
    price: "1950 MAD",
    product_notice: "",
    notice: "",
    status: "pending",
    fees_shipping: "",
  };

  // Insert into SheetDB API
  fetch("https://sheetdb.io/api/v1/jw2mqwk10t99n", {
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
          value: 159,
          currency: "USD",
        });

        // To track the purchase event using Snap Pixel
        // snaptr("track", "PURCHASE", { value: 132, currency: "USD" });

        document.location.href = "/order_success.html";
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
});
