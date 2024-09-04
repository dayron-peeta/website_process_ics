# -*- coding: utf-8 -*-
{
    'name': "DF: Website Process ICS",
    'summary': """
        Allows you to request the registration process for serial publications, 
        websites and country brands.
    """,
    'description': """
        Allows you to request the registration process for serial publications, 
        websites and country brands.
    """,
    'author': "DESOFT",
    'website': "https://www.desoft.cu",
    'category': 'Website/Website',
    'version': '16.0.1',

    # any module necessary for this one to work correctly
    'depends': [
        # Odoo
        'base',
        'website',
        # DESOFT
        'df_website_process',
    ],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/website_form_country_brand_templates.xml',
        'views/website_form_serial_publication_templates.xml',
        'views/website_form_website_templates.xml',
    ],
    'installable': True,
    'application': True,
}
