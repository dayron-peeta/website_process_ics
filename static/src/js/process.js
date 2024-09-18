odoo.define('df_website_process_ics.process', function (require) {
    "use strict";

    // Espera a que el DOM esté listo
    $(document).ready(function () {
        console.log('//////////////////////////////////////////////////////////////////////////////////////////////¡Hola desde process.js!');

        // Función genérica para MOSTRAR/OCULTAR CAMPOS basados en la selección y cambiar el atributo 'required'
        function toggleField(selectId, targetId, valuesToShow) {
            var select = document.getElementById(selectId);
            var targetGroup = document.getElementById(targetId);
            var targetInput = targetGroup.querySelector('select, input'); // Busca el input o select dentro del div

            // Muestra el campo solo si el valor seleccionado está en `valuesToShow`
            if (valuesToShow.includes(select.value)) {
                targetGroup.style.display = 'block'; // Muestra el campo
                if (targetInput) {
                    targetInput.setAttribute('required', 'true'); // Establece 'required' cuando se muestra
                }
            } else {
                targetGroup.style.display = 'none';  // Oculta el campo
                if (targetInput) {
                    targetInput.removeAttribute('required'); // Remueve 'required' cuando se oculta
                }
            }
        }


        // Asocia el evento `change` al select
        $('#person_type').change(function () {
            // Llama a `toggleField` pasando un array con los valores que deben mostrar el campo
            toggleField('person_type', 'entity_type_group', ['legal_cuban', 'legal_foreign']);
        });

        $('#entity_type').change(function () {
            toggleField('entity_type', 'full_name_group', ['state']);
        });

        $('#full_name').change(function () {
            toggleField('full_name', 'other_full_name_group', ['other']);
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
