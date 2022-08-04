import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger } from '@nestjs/common';

import * as path from 'path';

const logger = new Logger('MikroORM');
const config: Options = {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'postgres',
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  password: 'pass123',
  migrations: {
    path: path.join(__dirname, 'dist', 'src', 'migrations'),
    pathTs: path.join(__dirname, 'src', 'migrations'),
    glob: '!(*.d).{js,ts}',
  },
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
};

export default config;
