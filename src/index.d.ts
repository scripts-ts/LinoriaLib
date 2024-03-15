declare global {
	interface Options {
		[key: string]: Slider | Input | Dropdown | ColorPicker | KeyPicker;
	}

	interface Toggles {
		[key: string]: Toggle;
	}

	interface Window {
		Tabs: {
			[key: string]: Tab;
		};
		AddTab(name: string): Tab;
	}

	interface Tab {
		AddLeftGroupbox(name: string): Groupbox;
		AddRightGroupbox(name: string): Groupbox;
		AddLeftTabbox(): Tabbox;
		AddRightTabbox(): Tabbox;
	}

	interface Groupbox {
		AddToggle(idx: string, options: ToggleOptions): void;
		AddButton(options: ButtonOptions): Button;
		AddLabel(text: string, doesWrap?: boolean): Label;
		AddDivider(): void;
		AddSlider(idx: string, options: SliderOptions): void;
		AddInput(idx: string, options: InputOptions): void;
		AddDropdown(idx: string, options: DropdownOptions): void;
		AddColorPicker(idx: string, options: ColorPickerOptions): void;
		AddKeyPicker(idx: string, options: KeyPickerOptions): void;
		AddDependencyBox(): DependencyBox;
	}

	interface Button {
		AddButton(options: ButtonOptions): Button;
	}

	interface Label {
		AddColorPicker(idx: string, options: ColorPickerOptions): void;
		AddKeyPicker(idx: string, options: KeyPickerOptions): void;
	}

	interface SliderOptions {
		Text: string;
		Default: number;
		Min: number;
		Max: number;
		Suffix?: string;
		Rounding: number;
		Compact?: boolean;
		HideMax?: boolean;
		Callback?(value: number): void;
	}

	interface InputOptions {
		Default?: string;
		Numeric?: boolean;
		Finished?: boolean;
		Text?: string;
		Tooltip?: string;
		Placeholder?: string;
		MaxLength?: number;
		Callback?(value: string): void;
	}

	interface DropdownOptions {
		Values?: string[];
		Default?: number | string;
		Multi?: boolean;
		Text?: string;
		Tooltip?: string;
		Callback?(value: string | { [key: string]: boolean }): void;
		SpecialType?: "Player";
	}

	interface ColorPickerOptions {
		Default?: Color3;
		Title?: string;
		Transparency?: number;
		Callback?(value: Color3): void;
	}

	interface KeyPickerOptions {
		Default?: string;
		SyncToggleState?: boolean;
		Mode?: "Always" | "Toggle" | "Hold";
		Text?: string;
		NoUI?: boolean;
		Callback?(value: boolean): void;
		ChangedCallback?(value: Enum.KeyCode | Enum.UserInputType): void;
	}

	interface Tabbox {
		AddTab(name: string): Groupbox;
	}

	interface DependencyBox extends Groupbox {
		SetupDependencies(dependencies: [Toggle, boolean][]): void;
	}

	interface Toggle {
		Value: boolean;
		SetValue(value: boolean): void;
		OnChanged(callback: (value: boolean) => void): void;
	}

	interface Slider {
		Value: number;
		SetValue(value: number): void;
		OnChanged(callback: (value: number) => void): void;
	}

	interface Input {
		Value: string;
		SetValue(value: string): void;
		OnChanged(callback: (value: string) => void): void;
	}

	interface Dropdown {
		Value: string | { [key: string]: boolean };
		SetValue(value: string | { [key: string]: boolean }): void;
		OnChanged(callback: (value: string | { [key: string]: boolean }) => void): void;
	}

	interface ColorPicker {
		Value: Color3;
		Transparency: number;
		SetValueRGB(value: Color3): void;
		OnChanged(callback: () => void): void;
	}

	interface KeyPicker {
		Value: { Key: string; Mode: string };
		SetValue(value: { Key: string; Mode: string }): void;
		OnClick(callback: () => void): void;
		OnChanged(callback: () => void): void;
		GetState(): boolean;
	}
}

export interface WindowOptions {
	Title?: string;
	Center?: boolean;
	AutoShow?: boolean;
	TabPadding?: number;
	MenuFadeTime?: number;
}

export interface ToggleOptions {
	Text?: string;
	Default?: boolean;
	Tooltip?: string;
	Callback?(value: boolean): void;
}

export interface ButtonOptions {
	Text: string;
	Func: () => void;
	DoubleClick?: boolean;
	Tooltip?: string;
}

export interface Library {
	Unloaded: boolean;
	ToggleKeybind: KeyPicker;
	KeybindFrame: Frame;
	SetWatermarkVisibility(visible: boolean): void;
	SetWatermark(text: string): void;
	OnUnload(callback: () => void): void;
	Unload(): void;
	CreateWindow(options: WindowOptions): Window;
}

export interface ThemeManager {
	SetLibrary(library: Library): void;
	SetFolder(folder: string): void;
	ApplyToTab(tab: Tab): void;
	ApplyToGroupbox(groupbox: Groupbox): void;
}

export interface SaveManager {
	SetLibrary(library: Library): void;
	IgnoreThemeSettings(): void;
	SetIgnoreIndexes(indexes: string[]): void;
	SetFolder(folder: string): void;
	BuildConfigSection(tab: Tab): void;
	LoadAutoloadConfig(): void;
}

declare let Toggles: Toggles;
declare let Options: Options;
