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

        // $('#usage_type').change(function () {
        //     toggleField('usage_type', 'organizational_applications_group', ['organizational']);
        // });
        // $('#usage_type').change(function () {
        //     toggleField('usage_type', 'gods_and_services_applications_group', ['goods_services']);
        // });
        // $('#usage_type').change(function () {
        //     toggleField('usage_type', 'event_info_group', ['events']);
        // });
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

        // Asocia el evento `change` al input         
        toggleFieldInput('cup_account_number', 'cup_bank_branch_group');
        toggleFieldInput('mlc_account_number', 'mlc_bank_branch_group');
        toggleFieldInput('cc_account_number', 'cc_bank_branch_group');

        //////////////////////////////////////////////////////////////////////////////
        //Función genérica para MOSTRAR/OCULTAR CAMPOS si se marca un checkbox y cambiar el atributo 'required'
        function toggleFieldWithCheckbox(checkboxId, targetId) {
            var checkbox = document.getElementById(checkboxId);
            var targetGroup = document.getElementById(targetId);
            var targetInput = targetGroup.querySelector('input, select'); // Busca el input o select dentro del div

            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {
                    targetGroup.style.display = 'block';  // Muestra el campo
                    if (targetInput) {
                        targetInput.setAttribute('required', 'true');  // Lo hace requerido
                    }
                } else {
                    targetGroup.style.display = 'none';  // Oculta el campo
                    if (targetInput) {
                        targetInput.removeAttribute('required');  // Quita el atributo requerido
                        targetInput.value = '';  // Elimina el valor del campo oculto para que no se envíe
                    }
                }
            });
        }

        // Asocia la función genérica a diferentes checkboxes y campos
        toggleFieldWithCheckbox('checkbox_others_gods_and_services', 'other_g_s_application_group');
        toggleFieldWithCheckbox('checkbox_others_organizational', 'other_org_application_group');

        /////////////////////////////////////////////////////////////////////////////////////
        //Función genérica para MOSTRAR/OCULTAR SECCIONES al seleccionar y cambiar el atributo 'required'
        function toggleSection(selectId, targetId, valuesToShow, requiredInside = []) {
            var select = document.getElementById(selectId);
            var targetGroup = document.getElementById(targetId);

            // Muestra el campo solo si el valor seleccionado está en `valuesToShow`
            if (valuesToShow.includes(select.value)) {
                targetGroup.style.display = 'block'; // Muestra el campo

                // Agregar 'required' a los campos especificados
                requiredInside.forEach(fieldId => {
                    const field = document.querySelector(`#${targetId} input[name="${fieldId}"], #${targetId} select[name="${fieldId}"]`);
                    if (field) {
                        field.setAttribute('required', 'true'); // Establece 'required' cuando se muestra
                    }
                });

            } else {
                targetGroup.style.display = 'none'; // Oculta el campo

                // Quitar 'required' y restablecer valores a todos los campos dentro de la sección
                const inputsAndSelects = targetGroup.querySelectorAll('input, select');
                inputsAndSelects.forEach(field => {
                    if (field.hasAttribute('required')) {
                        field.removeAttribute('required'); // Remueve 'required'
                    }
                    field.value = ""; // Restablece el valor al ocultar

                    // Si es un checkbox, desmarcarlo
                    if (field.type === 'checkbox') {
                        field.checked = false; // Desmarcar el checkbox
                    }
                });
            }
        }

        //llamada a la función
        $('#usage_type').change(function () {
            toggleSection('usage_type', 'organizational_applications_group', ['organizational'], []);
            toggleSection('usage_type', 'gods_and_services_applications_group', ['goods_services'], []);
            toggleSection('usage_type', 'event_info_group', ['events'], ['event_name', 'event_duration', 'event_modality', 'event_venue', 'event_documentation', 'event_country', 'event_province', 'event_municipality', 'event_scope']);
        });


        //botones Next, Previous and Submit//////////////////////////////////////////////////////////////////////////////////////////////
        // Función para validar campos requeridos en la pestaña activa
        function validateRequiredFields() {
            const activeTab = document.querySelector('.tab-pane.show'); // Obtiene la pestaña activa
            const inputs = activeTab.querySelectorAll('input, select'); // Selecciona todos los inputs y selects
            let valid = true;

            // Validar campos requeridos
            inputs.forEach(function (input) {
                if (input.required && !input.value) {
                    valid = false;
                    input.classList.add('is-invalid');
                    input.classList.remove('is-valid'); // Elimina la clase de válido si hay un error
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid'); // Agrega la clase de válido si el campo está correcto
                }
            });

            return valid; // Retorna si los campos son válidos o no
        }

        const nextButtons = document.querySelectorAll('.next-tab');
        const prevButtons = document.querySelectorAll('.prev-tab');

        // Función para ocultar todas las pestañas
        function hideAllTabs() {
            const tabs = document.querySelectorAll('.tab-pane');
            tabs.forEach(tab => {
                tab.classList.remove('show', 'active', 'fade');
            });
        }

        // Función para mostrar una pestaña específica y actualizar el estado de las pestañas
        function showTab(target) {
            hideAllTabs();
            const tab = document.querySelector(target);
            tab.classList.add('show', 'active', 'fade');

            // Cambia el estado de las pestañas
            const tabs = document.querySelectorAll('.nav-link');
            tabs.forEach(t => {
                if (t.getAttribute('data-bs-target') === target) {
                    t.classList.add('active'); // Agrega la clase 'active' a la pestaña actual
                } else {
                    t.classList.remove('active'); // Quita la clase 'active' de las demás pestañas
                }
            });
        }

        // Manejo del botón "Siguiente"
        nextButtons.forEach(button => {
            button.addEventListener('click', function () {
                if (validateRequiredFields()) {
                    showTab(button.getAttribute('data-target'));
                }
            });
        });

        // Manejo del botón "Atrás"
        prevButtons.forEach(button => {
            button.addEventListener('click', function () {
                showTab(button.getAttribute('data-target'));
            });
        });

        // Manejo del botón "Enviar Solicitud"
        document.getElementById('submit-button').addEventListener('click', function () {
            if (validateRequiredFields()) {
                console.log('TODOS LOS DATOS VALIDADOS')
                document.querySelector('form').submit(); // Envía el formulario
            }
        });

        // Inicializa la primera pestaña visible
        showTab('#nav-application');


        ////////////////////////////////////////////////////////////////////////////////////
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
