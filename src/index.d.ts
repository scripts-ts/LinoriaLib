declare global {
	interface Options {}
	interface Toggles {}
	const Toggles: Toggles;
	const Options: Options;

	type SpecialType = "Player" | "Team";
	type KeyPickerMode = "Always" | "Toggle" | "Hold";

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
		AddToggle(idx: keyof Toggles, options: ToggleOptions): void;
		AddButton(options: ButtonOptions): Button;
		AddLabel(text: string, doesWrap?: boolean): Label;
		AddDivider(): void;
		AddSlider(idx: keyof Options, options: SliderOptions): void;
		AddInput(idx: keyof Options, options: InputOptions): void;
		AddDropdown<V extends string, M extends boolean = false>(
			idx: keyof Options,
			options: DropdownOptions<V, M>,
		): void;
		AddColorPicker(idx: keyof Options, options: ColorPickerOptions): void;
		AddKeyPicker(idx: keyof Options, options: KeyPickerOptions): void;
		AddDependencyBox(): DependencyBox;
	}

	interface Button {
		AddButton(options: ButtonOptions): Button;
	}

	interface Label {
		AddColorPicker(idx: keyof Options, options: ColorPickerOptions): void;
		AddKeyPicker(idx: keyof Options, options: KeyPickerOptions): void;
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

	interface Dropdown<V extends string, M extends boolean> {
		Value: M extends true ? Set<V> : V;
		SetValue(value: M extends true ? Set<V> : V): void;
		OnChanged(callback: (value: M extends true ? Set<V> : V) => void): void;
	}

	interface ColorPicker {
		Value: Color3;
		Transparency: number;
		SetValueRGB(value: Color3): void;
		OnChanged(callback: () => void): void;
	}

	interface KeyPicker {
		Value: string;
		Mode: KeyPickerMode;
		SetValue(value: [string, KeyPickerMode]): void;
		OnClick(callback: () => void): void;
		OnChanged(callback: () => void): void;
		GetState(): boolean;
	}
}

export interface SliderOptions {
	Text: string;
	Default: number;
	Min: number;
	Max: number;
	Suffix?: string;
	Rounding: number;
	Compact?: boolean;
	HideMax?: boolean;
	Callback?: (value: number) => void;
}

export interface InputOptions {
	Default?: string;
	Numeric?: boolean;
	Finished?: boolean;
	Text?: string;
	Tooltip?: string;
	Placeholder?: string;
	MaxLength?: number;
	Callback?: (value: string) => void;
}

export interface DropdownOptions<V extends string, M extends boolean = false> {
	Values?: V[];
	Default?: number | V;
	Multi?: M;
	Text?: string;
	Tooltip?: string;
	Callback?: (value: M extends true ? Set<V> : V) => void;
	SpecialType?: SpecialType;
}

export interface ColorPickerOptions {
	Default?: Color3;
	Title?: string;
	Transparency?: number;
	Callback?: (value: Color3) => void;
}

export interface KeyPickerOptions {
	Default?: string;
	SyncToggleState?: boolean;
	Mode?: KeyPickerMode;
	Text?: string;
	NoUI?: boolean;
	Callback?: (value: boolean) => void;
	ChangedCallback?: (value: Enum.KeyCode | Enum.UserInputType) => void;
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
	Callback?: (value: boolean) => void;
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
	Notify(text: string, duration?: number): void;
	SetWatermark(text: string): void;
	SetWatermarkVisibility(visible: boolean): void;
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
