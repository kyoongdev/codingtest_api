import app from './app';

const PORT = process.env.PROT || 8080;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
