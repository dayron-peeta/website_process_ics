odoo.define('df_website_process_ics.process', function (require) {
    "use strict";

    // Espera a que el DOM esté listo
    $(document).ready(function () {
        console.log('//////////////////////////////////////////////////////////////////////////////////////////////¡Hola desde process.js!');

        //código JavaScript aquí
        // Función para mostrar/ocultar el campo "other_full_name".
        function toggleOtherFullName() {
            var select = document.getElementById('full_name');
            var otherFullNameGroup = document.getElementById('other_full_name_group');
            
            if (select.value === 'other') {
                otherFullNameGroup.style.display = 'block'; // Muestra el campo
            } else {
                otherFullNameGroup.style.display = 'none';  // Oculta el campo
            }
        }

         // Asocia el evento `change` al select de `full_name`
        $('#full_name').change(function () {
            toggleOtherFullName();  // Llama a la función cuando el valor cambia
        });

        $(document).ready(function () {
            $('select[name="representative_province"]').change(function () {
                var province_id = $(this).val();
                console.log('//////////////////////////////////////////////////////////////////////////////////////////////¡Hola desde process.js!');
                $.ajax({
                    url: '/get_municipalities',
                    data: { 'province_id': province_id },
                    success: function (data) {
                        var municipalities = $('select[name="representative_municipality"]');
                        municipalities.empty();
                        $.each(data, function (index, municipality) {
                            municipalities.append('<option value="' + municipality.id + '">' + municipality.name + '</option>');
                        });
                    }
                });
            });
        });

    });



});
