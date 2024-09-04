# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class DfManagementProcessIcs(http.Controller):

    @http.route('/process/publication',  type='http', auth="public", website=True)
    def process_publication(self, **kw):
        values = {}
        return request.render('df_website_process_ics.process_publication', values)

    @http.route('/process/country_brand',  type='http', auth="public", website=True)
    def process_country_brand(self, **kw):
        values = {}
        return request.render('df_website_process_ics.process_country_brand', values)

    @http.route('/process/website',  type='http', auth="public", website=True)
    def process_website(self, **kw):
        values = {}
        return request.render('df_website_process_ics.process_website', values)
