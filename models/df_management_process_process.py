# -*- coding: utf-8 -*-

from odoo import models, fields, api, SUPERUSER_ID
import base64 #codificar los archivos antes de almacenarlos.


class DfManagementProcess(models.Model):
    _inherit = 'df_management_process.process'
    
    def prepare_values_process(self, post):
        values = super().prepare_values_process(post)
        
        # Verificar si ya existe un partner relacionado
        partner_name = post.get('representative_name')
        partner_email = post.get('representative_email')

        # Buscar el partner por nombre y correo
        existing_partner = self.env['res.partner'].sudo().search([
        ('name', '=', partner_name),
        ('email', '=', partner_email)
        ], limit=1)
        
        representative_partner_vals = {
        'name': partner_name,
        'vat': post.get('representative_id'),  # Usamos 'vat' para NIT/REUP/Pasaporte
        'email': partner_email,
        'street': post.get('representative_address'),
        'zip': post.get('representative_postal_code'),
        'country_id': int(post.get('representative_country')) if post.get('representative_country') else False,
        'state_id': int(post.get('representative_province')) if post.get('representative_province') else False,
        'city': post.get('representative_municipality'),
    }

        if existing_partner:
            existing_partner.sudo().write(representative_partner_vals)
            partner = existing_partner
        else:
            partner = self.env['res.partner'].sudo().create(representative_partner_vals)

        # Manejo del archivo de certificado de representación
        if post.get('representation_certificate'):
            attachment_vals = {
                'name': 'Representation Certificate',
                'res_model': 'res.partner',
                'res_id': partner.id,
                'datas': base64.b64encode(post.get('representation_certificate').read()),
                'datas_fname': post.get('representation_certificate').filename,
                'type': 'binary',
            }
            self.env['ir.attachment'].sudo().create(attachment_vals)


        # Asigna el partner_id(representante legal) al proceso
        values['partner_legal_representative_id'] = partner.id


        # Agrega otros valores del formulario
        values.update({
        'person_type': post.get('person_type'),
        'entity_type': post.get('entity_type'),
        'name': post.get('name') or post.get('other_full_name'),
        'id_number': post.get('id_number'),
        'website': post.get('website'),
        'social_profiles': post.get('social_profiles'),
        'address': post.get('address'),
        'country_id': int(post.get('country_id')) if post.get('country_id') else False,
        'province_id': int(post.get('province_id')) if post.get('province_id') else False,
        'municipality_id': int(post.get('municipality_id')) if post.get('municipality_id') else False,
        'postal_code': post.get('postal_code'),
        'commercial_registration': post.get('commercial_registration'),
        'cup_account_number': post.get('cup_account_number'),
        'cup_bank_branch': post.get('cup_bank_branch'),
        'mlc_account_number': post.get('mlc_account_number'),
        'mlc_bank_branch': post.get('mlc_bank_branch'),
        'cc_account_number': post.get('cc_account_number'),
        'cc_bank_branch': post.get('cc_bank_branch'),
        
        'representation_license': post.get('representation_license'),
        
        'usage_type': post.get('usage_type'),
        'applications': ','.join(post.getlist('applications')) if post.getlist('applications') else False,
        'other_organizational_application': post.get('other_organizational_application'),
        'other_g_s_application': post.get('other_g_s_application'),
        # Campos del evento
        'event_name': post.get('event_name'),
        'event_duration': post.get('event_duration'),
        'event_modality': post.get('event_modality'),
        'event_venue': post.get('event_venue'),
        'event_country': int(post.get('event_country')) if post.get('event_country') else False,
        'event_province': int(post.get('event_province')) if post.get('event_province') else False,
        'event_municipality': int(post.get('event_municipality')) if post.get('event_municipality') else False,
        'event_scope': post.get('event_scope'),
        })

        return values
    
    
    def validate_form(self, post):
        validate = super().validate_form(post)
        return validate

    def create_process(self, post):
        if self.validate_form(post):
            # self.sudo().create(self.prepare_values_process(post))
            values = self.prepare_values_process(post)
            process = self.env['df_management_process.process'].sudo().create(values)

            # Manejo de archivos adjuntos para el proceso
            if post.get('legal_certification'):
                attachment_vals = {
                    'name': 'Legal Certification',
                    'res_model': 'df_management_process.process',
                    'res_id': process.id,
                    'datas': base64.b64encode(post.get('legal_certification').read()),
                    'datas_fname': post.get('legal_certification').filename,
                    'type': 'binary',
                }
                self.env['ir.attachment'].sudo().create(attachment_vals)

            if post.get('event_documentation'):
                attachment_vals = {
                    'name': 'Event Documentation',
                    'res_model': 'df_management_process.process',
                    'res_id': process.id,
                    'datas': base64.b64encode(post.get('event_documentation').read()), 
                    'datas_fname': post.get('event_documentation').filename,
                    'type': 'binary',
                }
                self.env['ir.attachment'].sudo().create(attachment_vals)
        else:
            return "no valido"

