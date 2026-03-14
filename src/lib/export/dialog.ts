import { save } from "@tauri-apps/plugin-dialog";
import { downloadDir, join } from "@tauri-apps/api/path";

const isTauri = (): boolean =>
  typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

export async function showSaveDialog(
  filename: string,
  filterName: string,
  extensions: string[]
): Promise<string | null> {
  if (!isTauri()) return null;
  const dir = await downloadDir();
  const defaultPath = await join(dir, filename);
  return save({
    title: `Export ${filterName}`,
    defaultPath,
    filters: [{ name: filterName, extensions }],
  });
}
