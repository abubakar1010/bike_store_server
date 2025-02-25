import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
    try {
        const connectionInstance = await mongoose.connect(
            'mongodb+srv://practiceDB:practiceDB@cluster0.a2ulpwj.mongodb.net/bike_store?retryWrites=true&w=majority&appName=Cluster0',
        );
        console.log(
            'Database is successfully connected!! host on',
            connectionInstance.connection.host,
        );
        app.listen(config.port, () => {
            console.log('server running on port', config.port);
        });
    } catch (error) {
        console.log('Oops! Connection failed', error);
    }
}
main();
