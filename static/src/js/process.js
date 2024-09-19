odoo.define('df_website_process_ics.process', function (require) {
    "use strict";

    // Espera a que el DOM esté listo
    $(document).ready(function () {
        console.log('//////////////////////////////////////////////////////////////////////////////////////////////¡Hola desde process.js!');

        ///////////////////////////////////////////////////////////
        // Función genérica para MOSTRAR/OCULTAR CAMPOS basados en la selección y cambiar el atributo 'required'
        function toggleField(selectId, targetId, valuesToShow, clearChildren = []) {
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
                    targetInput.value = ""; // Restablece el valor al ocultar
                }
                // Si el campo se oculta, ocultar también los hijos dependientes
                clearChildren.forEach(function (childId) {
                    var childGroup = document.getElementById(childId);
                    if (childGroup) {
                        childGroup.style.display = 'none'; // Oculta el campo hijo
                        var childInput = childGroup.querySelector('select, input');
                        if (childInput) {
                            childInput.removeAttribute('required'); // Remueve 'required'
                            childInput.value = ""; // Restablece el valor al ocultar
                        }
                    }
                });
            }
        }

        // Asocia el evento `change` al select 
        $('#person_type').change(function () {
            toggleField('person_type', 'entity_type_group', ['legal_cuban', 'legal_foreign'], ['full_name_group', 'other_full_name_group']);
        });

        $('#entity_type').change(function () {
            toggleField('entity_type', 'full_name_group', ['state'], ['other_full_name_group']);
        });

        $('#full_name').change(function () {
            toggleField('full_name', 'other_full_name_group', ['other']);
        });

        $('#person_type').change(function () {
            toggleField('person_type', 'representation_license_group', ['national_foreign', 'legal_foreign']);
        });
        
        ////////////////////////////////////////////////////////////////////
        // Función genérica para MOSTRAR/OCULTAR CAMPOS si se escribe en un input y cambiar el atributo 'required'
        function toggleFieldInput(inputId, targetId) {
            var inputField = document.getElementById(inputId);
            var targetGroup = document.getElementById(targetId);
            var targetInput = targetGroup.querySelector('input, select'); // Busca el input o select dentro del div
        
            inputField.addEventListener('input', function () {
                if (inputField.value.trim() !== '') {  // Verifica si el campo no está vacío
                    targetGroup.style.display = 'block';  // Muestra el campo
                    if (targetInput) {
                        targetInput.setAttribute('required', 'true');  // Lo hace requerido
                    }
                } else {
                    targetGroup.style.display = 'none';  // Oculta el campo
                    if (targetInput) {
                        targetInput.removeAttribute('required');  // Quita el atributo requerido
                        targetInput.value = ''; // Elimina el valor del campo oculto para que no se envíe
                    }
                }
            });
        }
        
        // Asocia el evento `change` al input `cup_account_number`        
        toggleFieldInput('cup_account_number', 'cup_bank_branch_group');
        toggleFieldInput('mlc_account_number', 'mlc_account_number_group');
        toggleFieldInput('cc_account_number', 'cc_bank_branch_group');


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
