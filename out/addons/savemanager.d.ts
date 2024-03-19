import { Library } from "../library";

export interface SaveManager {
	SetLibrary(library: Library): void;
	IgnoreThemeSettings(): void;
	SetIgnoreIndexes(indexes: string[]): void;
	SetFolder(folder: string): void;
	BuildConfigSection(tab: Tab): void;
	LoadAutoloadConfig(): void;
}
