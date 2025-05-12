node v22.15.0

npm install sequelize sequelize-cli mysql2
npx sequelize-cli init
npm install -g sequelize-auto
npm install -g mysql2
sequelize-auto -o "./models" -d your_database -h localhost -u your_user -x your_password -p 3306 -e mysql