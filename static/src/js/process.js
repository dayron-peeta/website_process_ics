
$(document).ready(function () {
    $('select[name="province_id"]').change(function () {
        var province_id = $(this).val();
        $.ajax({
            url: '/get_municipalities',  
            data: { 'province_id': province_id },
            success: function (data) {
                var municipalities = $('select[name="municipality_id"]');
                municipalities.empty();
                $.each(data, function (index, municipality) {
                    municipalities.append('<option value="' + municipality.id + '">' + municipality.name + '</option>');
                });
            }
        });
    });
});
