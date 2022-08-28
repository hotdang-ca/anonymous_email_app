print('##- START MONGO CONFIG -##');

const database = 'myvault';
const username = 'root';
const password = 'application';

db = db.getSiblingDB(database);

db.createUser(
  {
    user: username,
    pwd: password,
    roles: [{ role: 'readWrite', db: database }],
  },
);

print('##- END MONGO CONFIG -##');
