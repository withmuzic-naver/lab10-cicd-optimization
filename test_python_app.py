import pytest
import json
import platform
from python_app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_python_endpoint_ubuntu(client):
    response = client.get('/python')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert 'message' in data
    assert 'statistics' in data
    assert 'platform' in data
    assert data['message'] == 'Python processing complete on Ubuntu'
    
    stats = data['statistics']
    assert 'mean' in stats
    assert 'std' in stats
    assert stats['count'] == 1000

def test_python_health_ubuntu(client):
    response = client.get('/python/health')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert data['status'] == 'healthy'
    assert data['service'] == 'python-flask'
    assert 'platform' in data