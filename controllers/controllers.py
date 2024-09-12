# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class DfManagementProcessIcs(http.Controller):

    @http.route('/process/publication',  type='http', auth="public", website=True)
    def process_publication(self, **kw):
        values = {}
        return request.render('df_website_process_ics.process_publication', values)

    @http.route('/process/country_brand/application_form', type='http', auth='public', website=True)
    def application_form(self, **kw):
        provinces = request.env['df_management_process.cuban_province'].sudo().search([])
        return request.render('df_website_process_ics.view_country_brand_application_form', {
            'provinces': provinces, # Pasar las provincias al QWeb
    })
        

    @http.route('/process/country_brand/application_submit', type='http', auth='public', methods=['POST'], website=True)
    def application_form_submit(self, **post):
        # Process the submitted data from the form
        request.env['country.brand.application'].sudo().create({
            'person_type': post.get('person_type'),
            'entity_type': post.get('entity_type'),
            'other_entity_type': post.get('other_entity_type'),
            'full_name': post.get('full_name'),
            'other_full_name': post.get('other_full_name'),
            'id_number': post.get('id_number'),
            'phone': post.get('phone'),
            'email': post.get('email'),
            'website': post.get('website'),
            'social_profiles': post.get('social_profiles'),
            'address': post.get('address'),
            'country_id': post.get('country_id'),
            'province_id': post.get('province_id'),
            'municipality_id': post.get('municipality_id'),
            'postal_code': post.get('postal_code'),
            'legal_certification': post.get('legal_certification').read(),  # This should handle file upload
            'commercial_registration': post.get('commercial_registration'),
            'cup_account_number': post.get('cup_account_number'),
            'cup_bank_branch': post.get('cup_bank_branch'),
            'mlc_account_number': post.get('mlc_account_number'),
            'mlc_bank_branch': post.get('mlc_bank_branch'),
            'cc_account_number': post.get('cc_account_number'),
            'cc_bank_branch': post.get('cc_bank_branch'),
            'representation_license': post.get('representation_license'),
            'representative_name': post.get('representative_name'),
            'representative_id': post.get('representative_id'),
            'representative_email': post.get('representative_email'),
            'representative_address': post.get('representative_address'),
            'representative_country': post.get('representative_country'),
            'representative_province': post.get('representative_province'),
            'representative_municipality': post.get('representative_municipality'),
            'representative_postal_code': post.get('representative_postal_code'),
            'representation_certificate': post.get('representation_certificate'),  # This should handle file upload
            'usage_type': post.get('usage_type'),
            'applications': ','.join(post.getlist('applications')),  # For multiple checkboxes
            'other_organizational_application': post.get('other_organizational_application'),
            'other_g_s_application': post.get('other_g_s_application'),
            'event_name': post.get('event_name'),
            'event_duration': post.get('event_duration'),
            'event_modality': post.get('event_modality'),
            'event_venue': post.get('event_venue'),
            'event_documentation': post.get('event_documentation'),  # This should handle file upload
            'event_country': post.get('event_country'),
            'event_province': post.get('event_province'),
            'event_municipality': post.get('event_municipality'),
            'event_scope': post.get('event_scope')
        })

        # Redirect to success page
        return request.redirect('/country_brand_application/success')


    @http.route('/process/website',  type='http', auth="public", website=True)
    def process_website(self, **kw):
        values = {}
        return request.render('df_website_process_ics.process_website', values)


class CubanLocationController(http.Controller):

    @http.route('/get_municipalities', type='json', auth='public')
    def get_municipalities(self, province_id):
        municipalities = request.env['df_management_process.cuban_municipality'].sudo().search([('province_id', '=', province_id)])
        return [{'id': m.id, 'name': m.name} for m in municipalities]
