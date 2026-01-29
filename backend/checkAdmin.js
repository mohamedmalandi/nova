import mongoose from 'mongoose';
import Admin from './models/Admin.js';
import bcrypt from 'bcrypt';

// Hardcoded for diagnostic usage
const URI = 'mongodb+srv://mohamednova:MuD8u71NfZsBPHq9@novacluster.a1e78dn.mongodb.net/nova?appName=NovaCluster';

const checkAdmin = async () => {
    try {
        await mongoose.connect(URI);
        console.log('MongoDB Connected');

        const email = 'novaadmin@nova.com';
        const password = 'novaadmin123';

        const admin = await Admin.findOne({ email });

        if (!admin) {
            console.log('Admin user NOT found.');

            // Try creating it again
            console.log('Creating admin user...');
            const newAdmin = await Admin.create({
                username: 'NovaAdmin',
                email: email,
                password: password,
            });
            console.log('Admin user created successfully:', newAdmin);
        } else {
            console.log('Admin user found:', admin.email);
            console.log('Hashed Password:', admin.password);

            // Test password
            const isMatch = await bcrypt.compare(password, admin.password);
            console.log('Password match result:', isMatch);

            if (!isMatch) {
                console.log('Resetting password...');
                admin.password = password; // Will be hashed by pre-save hook
                await admin.save();
                console.log('Password reset successfully.');
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkAdmin();
