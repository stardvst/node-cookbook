node --max-old-space-size=10 ./leaky-server.js
# take snapshot
autocannon http://localhost:3000
# take snapshot again, indicating memory leak

node --max-old-space-size=10 ./fixed-server.js
# take snapshot
autocannon http://localhost:3000
# take snapshot again, no memory leak
