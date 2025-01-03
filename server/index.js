const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectWithDB = require('./config/mongoose.js');
const CompanyRoute = require('./routes/CompanyRoute');
const JobRoute = require('./routes/JobRoute');
const JobApplicationRoute = require('./routes/JobApplicationRoute');
const EmployeeRoute = require('./routes/EmployeeRoute.js');
const AdminRoute = require('./routes/AdminRoute.js');
const Job = require('./models/JobModel.js'); 
const JobApplication = require('./models/JobApplicationModel.js'); 
const authRouter = require('./routes/authRouter.js');
require('dotenv').config();

const app = express();

const corsOptions = {
    exposedHeaders: ['Content-Disposition'],
    origin: [process.env.FE_URL],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/company', CompanyRoute);
app.use('/job', JobRoute);
app.use('/jobApplication', JobApplicationRoute);
app.use('/employee', EmployeeRoute);
app.use('/admin', AdminRoute);
app.use('/auth', authRouter);

const PORT = process.env.PORT;

// const createIndexes = async () => {
//     try {
//         await connectWithDB();  
//         await Job.createIndexes({ companyID: 1 });
//         await JobApplication.createIndexes({ jobId: 1 });
//         await JobApplication.createIndexes({ applicationDate: -1 });
//         console.log('Indexes created successfully!');
//     } catch (error) {
//         console.error('Error creating indexes:', error);
//     }
// };

const startServer = async () => {
    try {
        // await createIndexes();  // Create indexes before starting the server
        const server = app.listen(PORT, () => console.log(`Server started on ${PORT}`));
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();
