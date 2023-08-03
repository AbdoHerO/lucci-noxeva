<?php

$url = "https://noxeva.com/api/ordervisite";

if (isset($_POST['full_name']) && isset($_POST['phone']) && isset($_POST['adresse'])) {

    $data_array = array(
        "first_name" => $_POST['full_name'],
        "last_name" => "",
        "phone" => $_POST['phone'],
        "city" => $_POST['adresse'],
        "adresse" => $_POST['adresse'],
        "id_product" => "1035",
        "name_product" => "4-IN-1 MAKEUP PEN",
        "unit_price" => "139",
        "quantite" => "1",
        "variant" => "",
        "from_landing_page" => true
    );

    $data = http_build_query($data_array);

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $resp = curl_exec($ch);

    curl_close($ch);

    if ($e = curl_error($ch)) {
        echo $e;
    } else {
        echo $resp;
    }
}