import 'dotenv/config';
import { connectMySql, sequelize } from './config/mysql-db';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

// conexión de Mongo
import { MongoDatabase } from './config/mongo-db';

import './infrastructure/models/mysql-product.model';
import './infrastructure/models/purchase.model';

(async () => {
  await main();
})();

async function main() {

  const dbType = process.env.DB_TYPE;

  if (dbType === 'mongo') {
    await MongoDatabase.connect();
  } else {
    await connectMySql();

    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas correctamente');
  }

  // servidor
  const server = new Server({
    port: 3000,
    routes: AppRoutes.routes
  });

  server.start();
}