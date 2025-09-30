const fs = require('fs');
const path = require('path');

// Agent data from the ID cards
const agents = [
  { name: 'heng-kimhong', id: '004' },
  { name: 'vin-solyvay', id: '003' },
  { name: 'heng-rita', id: '008' },
  { name: 'peng-hounang', id: '009' },
  { name: 'nhem-sami', id: '0010' },
  { name: 'khun-sindika', id: '005' },
  { name: 'oeurn-chet', id: '007' }
];

const agentsDir = path.join(__dirname, '../public/images/agents');

// Create placeholder images using a simple HTML approach
const createPlaceholderImage = (agentName, agentId) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>${agentName} - Agent ${agentId}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: 'Arial', sans-serif;
            color: white;
        }
        .agent-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
        }
        .agent-id {
            font-size: 18px;
            opacity: 0.8;
        }
        .vstv-logo {
            font-size: 16px;
            margin-top: 20px;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="agent-name">${agentName.replace('-', ' ').toUpperCase()}</div>
    <div class="agent-id">Agent ID: ${agentId}</div>
    <div class="vstv-logo">VSTV AGENT</div>
</body>
</html>
  `;
  
  const filePath = path.join(agentsDir, `${agentName}.html`);
  fs.writeFileSync(filePath, html);
  console.log(`Created placeholder for ${agentName}`);
};

// Create placeholder images for all agents
agents.forEach(agent => {
  createPlaceholderImage(agent.name, agent.id);
});

console.log('All agent placeholder images created successfully!');
console.log('Note: These are HTML files. In a real application, you would replace these with actual photos from the ID cards.');
