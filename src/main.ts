import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from 'redis';
import * as connectRedis from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const client = createClient({ url: 'redis://localhost/', legacyMode: true });
  await client.connect();
  const RedisStore = connectRedis(session);
  // await client.set('working', 'true');
  // await client.get('working');
  app.use(
    session({
      store: new RedisStore({ client }),
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
