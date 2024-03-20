declare global {
	type SpecialType = "Player" | "Team";
	type KeyPickerMode = "Always" | "Toggle" | "Hold";
	type KeypickerBind = Enum.KeyCode["Name"] | "MB1" | "MB2";
}

export namespace Elements {
	interface Window {
		Tabs: { [key: string]: Tab };
		AddTab(name: string): Tab;
	}

	interface Tab {
		AddLeftGroupbox(name: string): Groupbox;
		AddRightGroupbox(name: string): Groupbox;
		AddLeftTabbox(): Tabbox;
		AddRightTabbox(): Tabbox;
	}

	interface Box {
		AddToggle(idx: string, options: UIConfig.Toggle): Toggle;
		AddButton(options: UIConfig.Button): Button;
		AddLabel(text: string, doesWrap?: boolean): Label;
		AddDivider(): void;
		AddSlider(idx: string, options: UIConfig.Slider): Slider;
		AddInput(idx: string, options: UIConfig.Input): Input;
		AddDropdown<V extends string, M extends boolean = false>(
			idx: string,
			options: UIConfig.Dropdown<V, M>,
		): Dropdown<V, M>;
		AddDependencyBox(): DependencyBox;
	}

	interface DependencyBox extends Box {
		SetupDependencies(dependencies: [Toggle, boolean][]): void;
	}

	interface Groupbox extends Box {}

	interface Tabbox {
		AddTab(name: string): Box;
	}

	interface BaseAddons {
		AddColorPicker(idx: string, options: UIConfig.ColorPicker): ColorPicker;
		AddKeyPicker(idx: string, options: UIConfig.KeyPicker): KeyPicker;
	}

	interface Label extends BaseAddons {
		SetText(text: string): void;
	}

	interface Toggle extends BaseAddons {
		Value: boolean;
		SetValue(value: boolean): void;
		OnChanged(callback: (value: boolean) => void): void;
	}

	interface Button {
		AddButton(options: UIConfig.Button): Button;
	}

	interface Input {
		Value: string;
		SetValue(value: string): void;
		OnChanged(callback: (value: string) => void): void;
	}

	interface Slider {
		Value: number;
		SetValue(value: number): void;
		OnChanged(callback: (value: number) => void): void;
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
		Value: KeypickerBind;
		Mode: KeyPickerMode;
		SetValue(value: [KeypickerBind, KeyPickerMode]): void;
		OnClick(callback: () => void): void;
		OnChanged(callback: () => void): void;
		GetState(): boolean;
	}
}

export namespace UIConfig {
	export type Window = {
		Title?: string;
		Center?: boolean;
		AutoShow?: boolean;
		MenuFadeTime?: number;
	};

	export type Toggle = {
		Text?: string;
		Default?: boolean;
		Tooltip?: string;
		Callback?: (value: boolean) => void;
	};

	export type Button = {
		Text: string;
		Func: () => void;
		DoubleClick?: boolean;
		Tooltip?: string;
	};

	export type Input = {
		Default?: string;
		Numeric?: boolean;
		Finished?: boolean;
		Text?: string;
		Tooltip?: string;
		Placeholder?: string;
		MaxLength?: number;
		Callback?: (value: string) => void;
	};

	export type Slider = {
		Text: string;
		Default: number;
		Min: number;
		Max: number;
		Suffix?: string;
		Rounding: number;
		Compact?: boolean;
		HideMax?: boolean;
		Callback?: (value: number) => void;
	};

	export type Dropdown<V extends string, M extends boolean = false> = {
		Text?: string;
		Tooltip?: string;
		Values?: V[];
		Default?: number | V;
		Multi?: M;
		AllowNull?: boolean;
		Callback?: (value: M extends true ? Set<V> : V) => void;
		SpecialType?: SpecialType;
	};

	export type ColorPicker = {
		Default?: Color3;
		Title?: string;
		Transparency?: number;
		Callback?: (value: Color3) => void;
	};

	export type KeyPicker = {
		Default?: KeypickerBind;
		SyncToggleState?: boolean;
		Mode?: KeyPickerMode;
		Text?: string;
		NoUI?: boolean;
		Callback?: (value: boolean) => void;
		ChangedCallback?: (value: Enum.KeyCode | Enum.UserInputType) => void;
	};
}

export interface Library {
	Unloaded: boolean;
	ToggleKeybind: Elements.KeyPicker;
	KeybindFrame: Frame;
	Notify(text: string, duration?: number): void;
	SetWatermark(text: string): void;
	SetWatermarkVisibility(visible: boolean): void;
	OnUnload(callback: () => void): void;
	Unload(): void;
	CreateWindow(options: UIConfig.Window): Elements.Window;
}
