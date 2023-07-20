import mongoose from 'mongoose';

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/NodeJS_First');
        console.log('Connection is successfull!');
    } catch (err) {
        console.log('Connection is failue!');
    }
}

export default connect;