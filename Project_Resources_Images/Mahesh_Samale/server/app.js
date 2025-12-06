const express = require('express');
const bodyParser = require('body-parser');
const candidateRoutes = require('./routes/candidates');
const authorizeUser = require('./utils/authuser')
const cors = require('cors')

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

// Candidate routes prefix /users/candidates
app.use(cors())
app.use(express.json())
app.use(authorizeUser) 
app.use('/users/candidates', candidateRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('HireWrite API running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
