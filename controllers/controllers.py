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
        return http.request.render('df_website_process_ics.view_country_brand_application_form', {})

    @http.route('/process/country_brand/application_submit', type='http', auth='public', methods=['POST'], website=True)
    def application_form_submit(self, **post):
        # Process the submitted data from the form
        request.env['country.brand.application'].sudo().create({
            'person_type': post.get('person_type'),
            'entity_type': post.get('entity_type'),
            'full_name': post.get('full_name'),
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
            'legal_certification': post.get('legal_certification'),
            'commercial_registration': post.get('commercial_registration'),
            'cup_account_number': post.get('cup_account_number'),
            'cup_bank_branch': post.get('cup_bank_branch'),
            'mlc_account_number': post.get('mlc_account_number'),
            'mlc_bank_branch': post.get('mlc_bank_branch'),
            'representation_license': post.get('representation_license'),
        })
        return request.redirect('/country_brand_application/success')

    @http.route('/process/website',  type='http', auth="public", website=True)
    def process_website(self, **kw):
        values = {}
        return request.render('df_website_process_ics.process_website', values)
