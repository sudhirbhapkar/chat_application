import { Sequelize } from 'sequelize';

// Get database credentials from environment variables
const DB_USER = process.env.DB_USER || 'giftogram';
const DB_PASSWORD = process.env.DB_PASSWORD || 'StrongPassword!';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'chat_application';

// Sequelize instance - will be a singleton
let sequelizeInstance: Sequelize | null = null;

export const getSequelizeInstance = (): Sequelize => {
  if (!sequelizeInstance) {
    console.log('Creating new Sequelize instance...');
    // Create a new Sequelize instance only if it doesn't exist
    sequelizeInstance = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD!, {
      host: DB_HOST,
      dialect: 'mysql',
    });
  }
  return sequelizeInstance;
};

export const connectDB = async () => {

  try {
    console.log('Connecting to DB...');
    await getSequelizeInstance().authenticate();
    console.log('Database connected');
  } catch (error) {
    console.error('Unable to connect to the database:', JSON.stringify(error));
  }
};
