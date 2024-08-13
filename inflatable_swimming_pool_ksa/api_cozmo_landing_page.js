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


  var variant = $('#formInfo select[name="tier_variante"]').val();
  var product_color = $('#formInfo select[name="product_color"]').val();
  var price = $('#formInfo input[name="price_tiers"]').val();

// Create the data object for SheetDB
var sheetDBData = {
  name: "chemise",
  date: new Date().toString(),
  customer_name: fullname,
  phone: phone,
  city: "-",
  address: adresse,
  quantity: variant,
  price: price,
  product_notice: "",
  notice: "Color: " + product_color,
  status: "pending",
  fees_shipping: "",
  size: "product_size",
};

console.log("sheetDBData", sheetDBData);

// Insert into SheetDB API
fetch("https://sheetdb.io/api/v1/1torsnrc4ndad", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer 7r1osfye3822uciijcpi89y8gveyn9d3ruogcgcj"
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
        content_type: "home decoration",
        product_id: "1125",
      });

      document.location.href = "/inflatable_swimming_pool_ksa/order_success.html";

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
    document.location.href = "/inflatable_swimming_pool_ksa/order_success.html";
  });
});
