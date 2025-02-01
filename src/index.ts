import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    const connectionInstance = await mongoose.connect(config.database_url!);
    console.log(
      'Database is successfully connected!! host on',
      connectionInstance.connection.host,
    );
    app.listen(config.port, () => {
      console.log("server running on port", config.port)
    })
  } catch (error) {
    console.log('Oops! Connection failed', error);
  }
}
main();


