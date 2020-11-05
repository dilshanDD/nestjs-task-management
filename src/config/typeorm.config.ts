import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig : TypeOrmModuleOptions = {

type : 'postgres',
host : 'localhost',
port : 5432,
username : 'postgres',
password : '1',
database : 'taskmanagement',
entities : [__dirname + '/../**/*.entity.js'],//one step back(../) any folder(**) any file ending with .entity(*.entity.ts)
synchronize : true,
};