import { Library } from "../library";

export interface ThemeManager {
	SetLibrary(library: Library): void;
	SetFolder(folder: string): void;
	ApplyToTab(tab: Tab): void;
	ApplyToGroupbox(groupbox: Groupbox): void;
}
