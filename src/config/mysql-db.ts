import { Sequelize } from 'sequelize';

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = process.env;

// Validación  (para evitar errores silenciosos)
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
  throw new Error('❌ Faltan variables de entorno para MySQL');
}

// Instancia de Sequelize
export const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: 'mysql',
    logging: false,
  }
);

// Conexión
export const connectMySql = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a MySQL exitosa');

    // sincronizar tablas SOLO si usas MySQL
    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas correctamente');

  } catch (error) {
    console.error('Error conectando a MySQL:', error);
    throw error;
  }
};