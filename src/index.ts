import mongoose from 'mongoose';
import { app } from './app';
import { DB_URI, PORT } from './app/config';

async function main() {
  try {
    const connectionInstance = await mongoose.connect(DB_URI);
    console.log(
      'Database is successfully connected!! host on',
      connectionInstance.connection.host,
    );
  } catch (error) {
    console.log('Oops! Connection failed', error);
  }
}
main();

app.listen(PORT, () => {
  console.log("server running on port", PORT)
})
