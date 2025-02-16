import { migrations } from "migrations/migrations";
import mongoose from "mongoose";

async function migrate() {
  const migationHistory = await Migration.find();
  const lastMigrationApplied = migationHistory.reduce(
    (prev, max) => Math.max(prev, max._id),
    0
  );

  checkPreviousMigrations(migationHistory, lastMigrationApplied);

  const lastMigration = migrations.reduce(
    (prev, max) => Math.max(prev, max.id),
    0
  );

  if (lastMigrationApplied < lastMigration) {
    console.log("Migrating...");
    await applyMigrations(lastMigrationApplied);
    console.log("Migration complete");
  } else {
    console.log("No pending migrations");
  }
}

function checkPreviousMigrations(
  seedHistory: Migration[],
  lastMigrationApplied: number
) {
  migrations
    .filter((migration) => migration.id < lastMigrationApplied)
    .forEach((migration) => {
      if (!seedHistory.some((seed) => seed._id === migration.id)) {
        throw new Error(
          `Migration ${migration.id} could not be applied, as migration ${lastMigrationApplied} already applied`
        );
      }
    });
}

function applyMigrations(lastMigrationApplied: number) {
  return migrations
    .filter((migration) => migration.id > lastMigrationApplied)
    .reduce(async (prev, migration) => {
      await prev;

      console.log(`Running migration ${migration.id}`);
      await migration.migration();
      await Migration.create({
        _id: migration.id,
        datetime: new Date(),
      });
      console.log(`Migration ${migration.id} completed`);
    }, Promise.resolve());
}

interface Migration {
  _id: number;
  datetime: Date;
}

const migrationSchema = new mongoose.Schema<Migration>(
  {
    _id: {
      type: Number,
      required: true,
    },
    datetime: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Migration = mongoose.model("Migartions", migrationSchema);

migrate();
