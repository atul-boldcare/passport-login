import { Migration } from '@mikro-orm/migrations';

export class Migration20220805080656 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "customer" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null);');
  }

}
