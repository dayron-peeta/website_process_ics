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
        countries = request.env['res.country'].sudo().search([])
        return request.render('df_website_process_ics.view_df_process_country_brand', {
            'countries': countries, 
    })
        
    @http.route('/process/country_brand/application_submit', type='http', auth='public', methods=['POST'], website=True)
    def application_form_submit(self, **post):
        # Process the submitted data from the form
        
        # verificar si el valor del campo full_name es "other" y guardar el valor del campo other_full_name como una nueva entidad en la base de datos.
        full_name = post.get('full_name')
        other_full_name = post.get('other_full_name')

        if full_name == 'other' and other_full_name:
            # Crear una nueva entidad con el nombre introducido
            new_entity = request.env['your.model.entity'].sudo().create({
                'name': other_full_name
            })
            # Usar la nueva entidad en lugar de 'Other'
            full_name = new_entity.id
        
        
        # create the application / Process the submitted data from the form
        cvalid = request.env['df_management_process.process'].sudo().create_process(post)
        if cvalid:
            return request.redirect('/country_brand_application/success')
        
        # Redirect to success page
        return request.redirect('/country_brand_application/success')

    
        
