import mongoose from 'mongoose';
import Admin from './models/Admin.js';

// Hardcoded for seed script usage
const URI = 'mongodb+srv://mohamednova:MuD8u71NfZsBPHq9@novacluster.a1e78dn.mongodb.net/nova?appName=NovaCluster';

const createAdmin = async () => {
    try {
        await mongoose.connect(URI);
        console.log('MongoDB Connected');

        const adminExists = await Admin.findOne({ email: 'novaadmin@nova.com' });

        if (adminExists) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const admin = await Admin.create({
            username: 'NovaAdmin',
            email: 'novaadmin@nova.com',
            password: 'novaadmin123',
        });

        console.log('Admin user created:', admin);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createAdmin();
