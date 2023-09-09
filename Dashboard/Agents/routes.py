#!/usr/bin/env python3

# Libraries
##############################################################################
from flask import Blueprint, request, jsonify
import uuid
import json

from .models import Agent
from Shared.validators import auth_token_required
##############################################################################

# Blueprint
##############################################################################
agnt_bp = Blueprint('agent_blueprint', __name__)
##############################################################################


# Routes
##############################################################################

# Get All Agents
@agnt_bp.route('/', methods=['GET'])
@auth_token_required
def get_agents():
    try:
        agents = Agent.objects()
        return [agent.serialize() for agent in agents] # Serialize & Return
    except Exception as e:
        return jsonify({"error":str(e)}), 500

# Get Agent by ID
@agnt_bp.route('/<id>', methods=['GET'])
def get_agent_by_id(id):
    try:
        agent = Agent.objects(id=id).first().serialize()
        return jsonify(agent)
    except Exception as e:
        return jsonify({"error":str(e)}), 500

# Register
@agnt_bp.route('/register', methods=['POST'])
@auth_token_required
def register():
    data = request.get_json()
    agent_type = data.get('type')

    if not agent_type:
        return jsonify({'message': 'Agent type is required.'}), 400

    # Generate a token for the agent
    token = str(uuid.uuid4())

    agent = Agent(type=agent_type, token=token)
    agent.save()
    
    agent_data = json.loads(agent.to_json())

    return jsonify(
        {
            'message': 'Agent registered successfully.',
            'token': token,
            'agent':agent_data
        }
    ), 201

# Delete Agent by ID
@agnt_bp.route('/<id>', methods=['DELETE'])
@auth_token_required
def delete_agent(id):
    try:
        agent = Agent.objects(id=id).first()

        if agent:
            agent.delete()
            return jsonify({'message': 'Agent deleted successfully.'}), 200
        else:
            return jsonify({'message': 'Agent not found.'}), 401
    except Exception as e:
        return jsonify({"error":str(e)}), 500


@agnt_bp.route('/<id>', methods=['PUT'])
@auth_token_required
def update_agent(id):
    try:
        agent = Agent.objects(id=id).first()

        if agent:
            data = request.get_json()

            if data.get('type'):
                agent.type = data.get('type')

            if data.get('token'):
                agent.token = data.get('token')
            
            agent.save()
            return jsonify(
                {
                    'message': 'Agent updated successfully.',
                    'agent': agent.serialize()
                }), 200
        else:
            return jsonify({'message': 'Agent not found.'}), 401
    except Exception as e:
        return jsonify({"error":str(e)}), 500
##############################################################################
