# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request
from odoo.addons.df_website_process.controllers.controllers import DfWebsiteProcess



class DfManagementProcessIcs(http.Controller):
        
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
            # Redirect to success page
            return request.redirect('/country_brand_application/success')
        

class DfWebsiteProcessIcs(DfWebsiteProcess):

    def _prepare_values_process(self):
        values = super()._prepare_values_process()
        language_ids = request.env['res.lang'].sudo().search(['|', ('active', '=', False), ('active', '=', True)])
        country_ids = request.env['res.country'].sudo().search([])
        values.update({
            'language_ids': language_ids,
            'country_ids': country_ids
        })
        return values
        


    
        
