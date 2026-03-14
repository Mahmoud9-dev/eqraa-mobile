/**
 * In-memory SQLite stub for browser (non-Tauri) environments.
 *
 * When the app is opened in a plain web browser (e.g. `pnpm dev` without
 * Tauri wrapping it), the real `@tauri-apps/plugin-sql` IPC bridge is absent
 * and every `invoke` call throws immediately.  This stub replaces the real
 * Database class so the React UI renders with empty-but-functional state
 * instead of crashing.
 *
 * All query results return empty arrays; execute() is a no-op.
 * No data is persisted — this is intentional for browser preview only.
 */

export interface StubQueryResult {
  lastInsertId: number;
  rowsAffected: number;
}

export class BrowserDatabase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async load(_path: string): Promise<BrowserDatabase> {
    return new BrowserDatabase();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async select<T = unknown[]>(_query: string, _values?: unknown[]): Promise<T> {
    return [] as unknown as T;
  }

  async execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _query: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _values?: unknown[]
  ): Promise<StubQueryResult> {
    return { lastInsertId: 0, rowsAffected: 0 };
  }

  async close(): Promise<void> {
    // no-op
  }
}
