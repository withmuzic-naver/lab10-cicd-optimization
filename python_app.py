from flask import Flask, jsonify
import numpy as np
import os
import platform
from datetime import datetime

app = Flask(__name__)

@app.route('/python')
def python_endpoint():
    data = np.random.rand(1000)
    stats = {
        'mean': float(np.mean(data)),
        'std': float(np.std(data)),
        'min': float(np.min(data)),
        'max': float(np.max(data)),
        'count': len(data)
    }
    
    return jsonify({
        'message': 'Python processing complete on Ubuntu',
        'platform': platform.system().lower(),
        'architecture': platform.machine(),
        'statistics': stats,
        'timestamp': datetime.utcnow().isoformat(),
        'python_version': platform.python_version()
    })

@app.route('/python/health')
def python_health():
    return jsonify({
        'status': 'healthy',
        'platform': platform.system().lower(),
        'service': 'python-flask',
        'timestamp': datetime.utcnow().isoformat()
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)))