const express = require('express');
const _ = require('lodash');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const data = {
    message: 'CI/CD Optimization Demo - Ubuntu Only',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.APP_VERSION || '1.0.0',
    platform: 'Ubuntu',
    features: ['caching', 'parallel-testing', 'reusable-workflows', 'kpi-monitoring']
  };
  res.json(data);
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    platform: 'ubuntu',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

app.get('/api/data', (req, res) => {
  const numbers = _.range(1, 1000);
  const sum = _.sum(numbers);
  const avg = _.mean(numbers);
  
  res.json({ 
    total_numbers: numbers.length,
    sum: sum,
    average: avg,
    platform: 'ubuntu',
    processed_at: new Date().toISOString()
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Ubuntu CI/CD Demo running on port ${port}`);
  });
}

module.exports = app;