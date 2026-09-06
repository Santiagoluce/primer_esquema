// Asegurarse de que crypto está disponible globalmente
global.crypto = require('crypto');

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  // Usar mongodb-memory-server para tests
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Establecer la URL de la BD para mongoose
  process.env.DB_URL = mongoUri;
  
  // Conectar a la BD en memoria
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  // Desconectar mongoose
  await mongoose.disconnect();
  
  // Parar el servidor en memoria
  if (mongoServer) {
    await mongoServer.stop();
  }
});

afterEach(async () => {
  // Limpiar la BD después de cada test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});
