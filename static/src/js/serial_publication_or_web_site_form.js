document.addEventListener('DOMContentLoaded', function() {

    //Tipo de persona
    const typePerson = document.getElementById('person_type');
    const typeEntityContainer = document.getElementById('entity_type_container');

    typePerson.addEventListener('change', function () {
        if (typePerson.value === 'legal_cuban' || typePerson.value === 'legal_foreign') {
            // Muestra el componente si se selecciona " juridoco"
            typeEntityContainer.style.display = 'block';
        } else {
            typeEntityContainer.style.display = 'none';
        }
    });

    // Representante Legal
    const hasLegalRepresentative = document.getElementById('has_legal_representative');
    const representativeDataContainer = document.getElementById('legal_representative_data');

    hasLegalRepresentative.addEventListener('change', function() {
        representativeDataContainer.style.display = hasLegalRepresentative.checked ? 'block' : 'none';
    });

    // Consultas en línea
    const onlineConsultYes = document.getElementById('consult_yes');
    const onlineConsultNo = document.getElementById('consult_no');
    const urlContainer = document.getElementById('url_container');

    onlineConsultYes.addEventListener('change', function() {
        urlContainer.style.display = onlineConsultYes.checked ? 'block' : 'none';
    });

    onlineConsultNo.addEventListener('change', function() {
        urlContainer.style.display = onlineConsultNo.checked ? 'none' : 'block';
    });

    // Tipo de publicacion
    const publicationType = document.getElementById('publication_type');
    const trafficDigitalContainer = document.getElementById('digital_traffic_routes_container');
    const consultOnlineContainer = document.getElementById('consult_online_container');
    const throwContainer = document.getElementById('throw_container');
    const printedPlaceContainer = document.getElementById('printed_place_container');
    const trafficContainer = document.getElementById('traffic_container');
    const exchangeContainer = document.getElementById('exchange_container');
   

    publicationType.addEventListener('change', function() {
        throwContainer.style.display = publicationType.value === 'printed' ? 'block' : 'none';
        printedPlaceContainer.style.display = publicationType.value === 'printed' ? 'block' : 'none';
        trafficContainer.style.display = publicationType.value === 'printed' ? 'block' : 'none';
        exchangeContainer.style.display = publicationType.value === 'printed' ? 'block' : 'none';
        consultOnlineContainer.style.display = publicationType.value === 'digital' ? 'block' : 'none';
        trafficDigitalContainer.style.display = publicationType.value === 'digital' ? 'block' : 'none';
    });

    // Tiene espejo
    const hasMirrorYes = document.getElementById('mirror_yes');
    const hasMirrorNo = document.getElementById('mirror_no');
    const hasMirrorContainer = document.getElementById('has_mirror_container');

    hasMirrorYes.addEventListener('change', function() {
        hasMirrorContainer.style.display = hasMirrorYes.checked ? 'block' : 'none';
    });

    hasMirrorNo.addEventListener('change', function() {
        hasMirrorContainer.style.display = hasMirrorNo.checked ? 'none' : 'block';
    });

    // Es copia fiel
    const fullCopyYes = document.getElementById('full_copy_yes');
    const fullCopyNo = document.getElementById('full_copy_no');
    const appendChangesContainer = document.getElementById('append_changes_container');

    fullCopyYes.addEventListener('change', function() {
        appendChangesContainer.style.display = fullCopyYes.checked ? 'none' : 'block';
    });

    fullCopyNo.addEventListener('change', function() {
        appendChangesContainer.style.display = fullCopyNo.checked ? 'block' : 'none';
    });

    // Es una publicacion seriada
    const serialPublicationYes = document.getElementById('serial_publication_yes');
    const serialPublicationyNo = document.getElementById('serial_publication_no');
    const rpnsContainer = document.getElementById('rnps_container');

    serialPublicationYes.addEventListener('change', function() {
        rpnsContainer.style.display = serialPublicationYes.checked ? 'block' : 'none';
    });

    serialPublicationyNo.addEventListener('change', function() {
        rpnsContainer.style.display = serialPublicationyNo.checked ? 'none' : 'block';
    });

    // Posee una o mas publicaciones seriadas
    const hasserialPublicationYes = document.getElementById('has_serial_publication_yes');
    const hasserialPublicationyNo = document.getElementById('has_serial_publication_no');
    const rpnsNumbersContainer = document.getElementById('rpns_numbers_container');

    hasserialPublicationYes.addEventListener('change', function() {
        rpnsNumbersContainer.style.display = hasserialPublicationYes.checked ? 'block' : 'none';
    });

    hasserialPublicationyNo.addEventListener('change', function() {
        rpnsNumbersContainer.style.display = hasserialPublicationyNo.checked ? 'none' : 'block';
    });
});