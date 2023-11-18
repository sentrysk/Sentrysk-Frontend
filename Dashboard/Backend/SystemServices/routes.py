#!/usr/bin/env python3

# Libraries
##############################################################################
from flask import Blueprint, request, jsonify
from datetime import datetime

from .models import SystemServices, ChangeLogSystemServices
from Shared.validators import agent_token_required, auth_token_required

from Agents.helper_funcs import get_id_by_token
from Agents.models import Agent
##############################################################################

# Blueprint
##############################################################################
sys_srvc_bp = Blueprint('sys_services_blueprint', __name__)
##############################################################################


# Routes
##############################################################################

# Register
@sys_srvc_bp.route('/', methods=['POST'])
@agent_token_required
def register():
    # Get Agent Token by Authorization Header
    agent_token = request.headers.get('Authorization')
    # Get Agent ID by Token
    agent_id = get_id_by_token(agent_token)
    # Get Agent by Agent ID
    agent = Agent.objects(id=agent_id).first()

    # Get Data from Request
    data = request.get_json()

    # Validate the Request
    if 'services' not in data:
        return jsonify({'error': 'Invalid JSON data'}), 400
        
    # Get Services if record already exist
    sys_srvcs = SystemServices.objects(agent=agent).first()

    if sys_srvcs:
        # UPDATE If System Information data already exist
        try:
            # Create SystemServices object to Compare
            new_srvcs_obj = SystemServices(**data)
            new_srvcs_obj.agent = agent

            # Find deleted, new, and updated services
            new_services, deleted_services, updated_services = sys_srvcs.compare_servies(new_srvcs_obj)
            
            changes = {}

            if deleted_services:
                changes["deleted_services"] = deleted_services
            if new_services:
                changes["new_services"] = new_services
            if updated_services:
                changes["updated_services"] = updated_services

            # If any changes happens
            if changes:
                # Apply updates
                data["updated"] = datetime.utcnow
                sys_srvcs.update(**data)

                # Create a new ChangeLog entry
                change_log_entry = ChangeLogSystemServices(
                    apps = sys_srvcs.id,
                    changes = changes
                )
                change_log_entry.save()
            else:
                # Apply only updated time
                sys_srvcs.update(updated=datetime.utcnow)

        except Exception as e:
            return jsonify({'error': e}), 500
        
    else:
        # CREATE If System Installed Apps not exist 
        try:
            sys_srvcs = SystemServices(**data)
            sys_srvcs.agent = agent
            sys_srvcs.save()
        except Exception as e:
            return jsonify({'error': e}), 500

    return jsonify(
        {
            'message': 'System apps registered successfully.',
        }
    ), 200


##############################################################################