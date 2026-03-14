import { save, open } from "@tauri-apps/plugin-dialog";
import { copyFile, exists } from "@tauri-apps/plugin-fs";
import { appDataDir, join } from "@tauri-apps/api/path";
import { closeDb, getDb } from "./db";

const isTauri = (): boolean =>
  typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

const DB_FILENAME = "eqraa.db";

async function getDbPath(): Promise<string> {
  const dataDir = await appDataDir();
  return join(dataDir, DB_FILENAME);
}

export async function exportDatabase(): Promise<boolean> {
  if (!isTauri()) return false;

  const savePath = await save({
    title: "Export Database",
    defaultPath: `eqraa-backup-${new Date().toISOString().split("T")[0]}.db`,
    filters: [{ name: "SQLite Database", extensions: ["db"] }],
  });

  if (!savePath) return false;

  const dbPath = await getDbPath();
  await copyFile(dbPath, savePath);
  return true;
}

export async function importDatabase(): Promise<boolean> {
  if (!isTauri()) return false;

  const filePath = await open({
    title: "Import Database",
    filters: [{ name: "SQLite Database", extensions: ["db"] }],
    multiple: false,
    directory: false,
  });

  if (!filePath) return false;

  const dbPath = await getDbPath();

  // Close the current connection before replacing
  await closeDb();

  // Replace the database file
  await copyFile(filePath, dbPath);

  // Re-open and verify the database
  await getDb();

  return true;
}

export async function getDatabaseSize(): Promise<string> {
  if (!isTauri()) return "N/A";

  const dbPath = await getDbPath();
  const fileExists = await exists(dbPath);
  if (!fileExists) return "0 KB";

  return "N/A";
}
