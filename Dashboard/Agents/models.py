#!/usr/bin/env python3

# Libraries
##############################################################################
from mongoengine import Document,StringField
##############################################################################

# Configs
##############################################################################

##############################################################################


# Models
##############################################################################
class Agent(Document):
    type  = StringField(required=True) # Agent type E.g Linux, Windows
    token = StringField(required=True, unique=True)
##############################################################################