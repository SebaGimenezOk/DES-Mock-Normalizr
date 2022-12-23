import app from './app.js';


const PORT= process.env.PORT || 4001

app.listen(PORT, ()=> console.info(`Server Up and running on port ${PORT}`));


