import type { SaveManager } from "./addons/savemanager";
import type { ThemeManager } from "./addons/thememanager";
import type { Elements, Library, UIConfig } from "./library";

declare const Library: Library;
declare const Toggles: Record<string, Elements.Toggle>;

export enum Side {
	Left,
	Right,
}

/************************************************************
 * EXTENSIONS
 * Description: Builder classes for element extensions
 ************************************************************/
/**
 * Abstract base class for element extensions.
 */
abstract class Extension {
	protected idx: string = "";

	/**
	 * Builds the extension on the specified parent element.
	 * @hidden
	 */
	public abstract build(parent: Elements.BaseAddons): Extension;

	/**
	 * Sets the index of the extension.
	 * The extension can be referenced by this index using `Options[idx]`.
	 */
	public index(idx: string) {
		this.idx = idx;
		return this;
	}
}

/**
 * Represents a key picker extension.
 */
export class KeyPicker extends Extension {
	protected _title: string = "";
	protected _noUI: boolean = false;
	protected _mode: KeyPickerMode = "Toggle";
	protected _default: KeypickerBind = "Delete";
	protected _syncToggle: boolean = false;
	protected _callback: (value: boolean) => void = () => {};
	protected _changedCallback: (value: Enum.KeyCode | Enum.UserInputType) => void = () => {};

	/**
	 * Builds the key picker extension on the specified parent element.
	 * @hidden
	 */
	public build(parent: Elements.BaseAddons): KeyPicker {
		parent.AddKeyPicker(this.idx, {
			Default: this._default,
			SyncToggleState: this._syncToggle,
			Mode: this._mode,
			Text: this._title,
			NoUI: this._noUI,
			Callback: this._callback,
			ChangedCallback: this._changedCallback,
		});
		return this;
	}

	/**
	 * Sets the title of the key picker.
	 */
	public title(title: string): KeyPicker {
		this._title = title;
		return this;
	}

	/**
	 * Whether to show the key picker on the keybind menu.
	 */
	public hidden(hide: boolean): KeyPicker {
		this._noUI = hide;
		return this;
	}

	/**
	 * Sets the default value of the key picker.
	 */
	public bind(value: KeypickerBind): KeyPicker {
		this._default = value;
		return this;
	}

	/**
	 * Sets the mode of the key picker.
	 * "Hold" - The key picker is active while the key is held.
	 * "Toggle" - The key picker is toggled on and off.
	 * "Always" - The key picker is always active.
	 */
	public mode(mode: KeyPickerMode): KeyPicker {
		this._mode = mode;
		return this;
	}

	/**
	 * SyncToggleState only works with toggles.
	 * When enabled, the keybind has its state synced with its parent toggle.
	 */
	public sync(enabled: boolean): KeyPicker {
		this._syncToggle = enabled;
		return this;
	}

	/**
	 * Subscribes to the key picker's state
	 */
	public onClick(callback: (value: boolean) => void): KeyPicker {
		this._callback = callback;
		return this;
	}

	/**
	 * Subscribes to the key picker's keybind
	 */
	public onChanged(callback: (value: Enum.KeyCode | Enum.UserInputType) => void): KeyPicker {
		this._changedCallback = callback;
		return this;
	}
}

/**
 * Represents a color picker extension.
 */
export class ColorPicker extends Extension {
	protected _title: string = "";
	protected _default: Color3 = new Color3(1, 1, 1);
	protected _transparency?: number;
	protected _callback: (value: Color3) => void = () => {};

	/**
	 * Builds the color picker extension on the specified parent element.
	 * @hidden
	 */
	public build(parent: Elements.BaseAddons): ColorPicker {
		parent.AddColorPicker(this.idx, {
			Default: this._default,
			Title: this._title,
			Transparency: this._transparency,
			Callback: this._callback,
		});
		return this;
	}

	/**
	 * Sets the title of the color picker.
	 */
	public title(title: string): ColorPicker {
		this._title = title;
		return this;
	}

	/**
	 * Sets the default value of the color picker.
	 */
	public default(value: Color3): ColorPicker {
		this._default = value;
		return this;
	}

	/**
	 * Sets the transparency of the color picker.
	 * If set, the color picker will have a transparency slider.
	 */
	public transparency(transparency: number): ColorPicker {
		this._transparency = transparency;
		return this;
	}

	/**
	 * Subscribes to the color picker's state
	 */
	public onChanged(callback: (value: Color3) => void): ColorPicker {
		this._callback = callback;
		return this;
	}
}

/************************************************************
 * ELEMENTS
 * Description: Builder classes for individual elements
 ************************************************************/
/**
 * Abstract base class for elements.
 */
abstract class Element {
	protected idx: string = "";

	/**
	 * Builds the element on the specified parent element.
	 * @hidden
	 */
	public abstract build(builder: Builder, parent: unknown): Element;

	/**
	 * Sets the index of the element.
	 * The element can be referenced by this index using `Toggles[idx]` or `Options[idx]`.
	 */
	public index(idx: string) {
		this.idx = idx;
		return this;
	}
}

/**
 * Abstract base class for elements with extensions.
 */
abstract class BaseExtensions extends Element {
	protected addons: Extension[] = [];

	/**
	 * Adds extensions to the element.
	 */
	public extensions(extensions: Extension[]) {
		for (const extension of extensions) this.addons.push(extension);
		return this;
	}
}

/**
 * Represents a label element.
 */
export class Label extends BaseExtensions {
	protected _text: string = "";
	protected _doesWrap: boolean = false;

	/**
	 * Builds the label element on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): Label {
		const label = parent.AddLabel(this._text, this._doesWrap);
		for (const addon of this.addons) addon.build(label);
		return this;
	}

	/**
	 * Sets the text of the label.
	 */
	public text(text: string): Label {
		this._text = text;
		return this;
	}

	/**
	 * Sets whether the label should wrap text.
	 * Please note that if wrap is enabled, the label cannot have any extensions.
	 */
	public wrap(wrap: boolean): Label {
		this._doesWrap = wrap;
		return this;
	}
}

/**
 * Represents a toggle element.
 */
export class Toggle extends BaseExtensions {
	protected _title: string = "";
	protected _tooltip: string = "";
	protected _default: boolean = false;
	protected _callback: (value: boolean) => void = () => {};

	/**
	 * Builds the toggle element on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): Toggle {
		const toggle = parent.AddToggle(this.idx, {
			Text: this._title,
			Default: this._default,
			Tooltip: this._tooltip,
			Callback: this._callback,
		});
		for (const addon of this.addons) addon.build(toggle);
		return this;
	}

	/**
	 * Sets the title of the toggle.
	 */
	public title(title: string): Toggle {
		this._title = title;
		return this;
	}

	/**
	 * Sets the tooltip of the toggle.
	 */
	public tooltip(tooltip: string): Toggle {
		this._tooltip = tooltip;
		return this;
	}

	/**
	 * Sets the default value of the toggle.
	 */
	public default(value: boolean): Toggle {
		this._default = value;
		return this;
	}

	/**
	 * Subscribes to the toggle's state
	 */
	public onChanged(callback: (value: boolean) => void): Toggle {
		this._callback = callback;
		return this;
	}
}

/**
 * Represents a button element.
 */
export class Button extends Element {
	protected _title: string = "";
	protected _tooltip: string = "";
	protected _doubleClick: boolean = false;
	protected _callback: () => void = () => {};

	/**
	 * Builds the button element on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): Button {
		parent.AddButton({
			Text: this._title,
			Func: this._callback,
			DoubleClick: this._doubleClick,
			Tooltip: this._tooltip,
		});
		return this;
	}

	/**
	 * Sets the title of the button.
	 */
	public title(title: string): Button {
		this._title = title;
		return this;
	}

	/**
	 * Sets the tooltip of the button.
	 */
	public tooltip(tooltip: string): Button {
		this._tooltip = tooltip;
		return this;
	}

	/**
	 * Sets whether the button should trigger on double click.
	 */
	public doubleClick(doubleClick: boolean): Button {
		this._doubleClick = doubleClick;
		return this;
	}

	/**
	 * Subscribes to the button's click event
	 */
	public onClick(func: () => void): Button {
		this._callback = func;
		return this;
	}
}

/**
 * Represents an input element.
 */
export class Input extends Element {
	protected _title: string = "";
	protected _tooltip: string = "";
	protected _default: string = "";
	protected _placeholder: string = "";
	protected _numeric: boolean = false;
	protected _finished: boolean = false;
	protected _maxLength?: number;
	protected _callback: (value: string) => void = () => {};

	/**
	 * Builds the input element on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): Input {
		parent.AddInput(this.idx, {
			Default: this._default,
			Numeric: this._numeric,
			Finished: this._finished,
			Text: this._title,
			Tooltip: this._tooltip,
			Placeholder: this._placeholder,
			MaxLength: this._maxLength,
			Callback: this._callback,
		});
		return this;
	}

	/**
	 * Sets the title of the input.
	 */
	public title(title: string): Input {
		this._title = title;
		return this;
	}

	/**
	 * Sets the tooltip of the input.
	 */
	public tooltip(tooltip: string): Input {
		this._tooltip = tooltip;
		return this;
	}

	/**
	 * Sets the default value of the input.
	 */
	public default(value: string): Input {
		this._default = value;
		return this;
	}

	/**
	 * Sets the placeholder of the input.
	 */
	public placeholder(placeholder: string): Input {
		this._placeholder = placeholder;
		return this;
	}

	/**
	 * Sets whether the input should only accept numeric values.
	 */
	public numeric(numeric: boolean): Input {
		this._numeric = numeric;
		return this;
	}

	/**
	 * Sets whether callback should only trigger when finished typing.
	 */
	public finished(finished: boolean): Input {
		this._finished = finished;
		return this;
	}

	/**
	 * Sets the maximum length of the input.
	 */
	public maxLength(maxLength: number): Input {
		this._maxLength = maxLength;
		return this;
	}

	/**
	 * Subscribes to the input's value
	 */
	public onChanged(callback: (value: string) => void): Input {
		this._callback = callback;
		return this;
	}
}

/**
 * Represents a slider element.
 */
export class Slider extends Element {
	protected _title: string = "";
	protected _default: number = 0;
	protected _min: number = 0;
	protected _max: number = 1;
	protected _rounding: number = 2;
	protected _suffix: string = "";
	protected _compact: boolean = false;
	protected _hideMax: boolean = false;
	protected _callback: (value: number) => void = () => {};

	/**
	 * Builds the slider element on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): Slider {
		parent.AddSlider(this.idx, {
			Text: this._title,
			Default: this._default,
			Min: this._min,
			Max: this._max,
			Rounding: this._rounding,
			Suffix: this._suffix,
			Compact: this._compact,
			HideMax: this._hideMax,
			Callback: this._callback,
		});
		return this;
	}

	/**
	 * Sets the title of the slider.
	 */
	public title(title: string): Slider {
		this._title = title;
		return this;
	}

	/**
	 * Sets the default value of the slider.
	 */
	public default(value: number): Slider {
		this._default = value;
		return this;
	}

	/**
	 * Sets the value limits of the slider.
	 */
	public limits(min: number, max: number): Slider {
		this._min = min;
		this._max = max;
		return this;
	}

	/**
	 * Sets the number of decimal places to which the value is rounded.
	 */
	public round(decimals: number): Slider {
		this._rounding = decimals;
		return this;
	}

	/**
	 * Sets the suffix of the value.
	 */
	public suffix(suffix: string): Slider {
		this._suffix = suffix;
		return this;
	}

	/**
	 * Sets whether the slider should be compact.
	 */
	public compact(compact: boolean): Slider {
		this._compact = compact;
		return this;
	}

	/**
	 * Sets whether the maximum value should be hidden.
	 */
	public hideMax(hideMax: boolean): Slider {
		this._hideMax = hideMax;
		return this;
	}

	/**
	 * Subscribes to the slider's value
	 */
	public onChanged(callback: (value: number) => void): Slider {
		this._callback = callback;
		return this;
	}
}

/**
 * Represents a dropdown element.
 */
export class Dropdown<V extends string> extends Element {
	protected _title: string = "";
	protected _tooltip: string = "";
	protected _values: V[] = [];
	protected _default: number | V = 1;
	protected _allowNull: boolean = false;
	protected _specialType?: SpecialType;
	protected _callback: (value: V) => void = () => {};

	/**
	 * Builds the dropdown element on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): Dropdown<V> {
		parent.AddDropdown(this.idx, {
			Text: this._title,
			Tooltip: this._tooltip,
			Values: this._values,
			Default: this._default,
			Multi: false,
			AllowNull: this._allowNull,
			SpecialType: this._specialType,
			Callback: this._callback,
		});
		return this;
	}

	/**
	 * Sets the title of the dropdown.
	 */
	public title(title: string): Dropdown<V> {
		this._title = title;
		return this;
	}

	/**
	 * Sets the tooltip of the dropdown.
	 */
	public tooltip(tooltip: string): Dropdown<V> {
		this._tooltip = tooltip;
		return this;
	}

	/**
	 * Sets the options of the dropdown.
	 */
	public options(options: V[]): Dropdown<V> {
		this._values = options;
		return this;
	}

	/**
	 * Sets the default value of the dropdown.
	 */
	public default(value: number | V): Dropdown<V> {
		this._default = value;
		return this;
	}

	/**
	 * Sets whether the dropdown should allow null values.
	 */
	public canNull(allowNull: boolean): Dropdown<V> {
		this._allowNull = allowNull;
		return this;
	}

	/**
	 * Sets the special type of the dropdown.
	 */
	public specialType(specialType: SpecialType): Dropdown<V> {
		this._specialType = specialType;
		return this;
	}

	/**
	 * Subscribes to the dropdown's value
	 */
	public onChange(callback: (value: V) => void): Dropdown<V> {
		this._callback = callback;
		return this;
	}
}

/**
 * Represents a multi dropdown element.
 */
export class MultiDropdown<V extends string> extends Element {
	protected _title: string = "";
	protected _tooltip: string = "";
	protected _values: V[] = [];
	protected _default: V[] = [];
	protected _allowNull: boolean = false;
	protected _specialType?: SpecialType;
	protected _callback: (value: Set<V>) => void = () => {};

	/**
	 * Builds the multi dropdown element on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): MultiDropdown<V> {
		const dropdown = parent.AddDropdown(this.idx, {
			Text: this._title,
			Tooltip: this._tooltip,
			Values: this._values,
			Default: this._default[0] ?? this._values[0],
			Multi: true,
			AllowNull: this._allowNull,
			SpecialType: this._specialType,
			Callback: this._callback,
		});
		dropdown.SetValue(new Set(this._default));
		return this;
	}

	/**
	 * Sets the title of the multi dropdown.
	 */
	public title(title: string): MultiDropdown<V> {
		this._title = title;
		return this;
	}

	/**
	 * Sets the tooltip of the multi dropdown.
	 */
	public tooltip(tooltip: string): MultiDropdown<V> {
		this._tooltip = tooltip;
		return this;
	}

	/**
	 * Sets the options of the multi dropdown.
	 */
	public options(options: V[]): MultiDropdown<V> {
		this._values = options;
		return this;
	}

	/**
	 * Sets the default value of the multi dropdown.
	 */
	public default(value: V[]): MultiDropdown<V> {
		this._default = value;
		return this;
	}

	/**
	 * Sets whether the multi dropdown should allow null values.
	 */
	public canNull(enabled: boolean): MultiDropdown<V> {
		this._allowNull = enabled;
		return this;
	}

	/**
	 * Sets the special type of the multi dropdown.
	 */
	public specialType(specialType: SpecialType): MultiDropdown<V> {
		this._specialType = specialType;
		return this;
	}

	/**
	 * Subscribes to the multi dropdown's value
	 */
	public onChange(callback: (value: Set<V>) => void): MultiDropdown<V> {
		this._callback = callback;
		return this;
	}
}

/************************************************************
 * SECTIONS
 * Description: Builder classes that hold elements
 ************************************************************/
/**
 * Abstract base class for sections.
 */
abstract class Box {
	protected children: (Element | DependencyBox)[] = [];

	/**
	 * Adds elements to the section.
	 */
	public elements(elements: (Element | DependencyBox)[]) {
		for (const element of elements) this.children.push(element);
		return this;
	}
}

/**
 * Represents a box section.
 */
export class DependencyBox extends Box {
	private dependencies: [string, boolean][] = [];

	/**
	 * Builds the dependency box on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): DependencyBox {
		const box = parent.AddDependencyBox();
		for (const child of this.children) child.build(builder, box);
		builder.onAppear.set(this, () =>
			box.SetupDependencies(
				this.dependencies.map(([idx, state]) => [Toggles[idx], state] as [Elements.Toggle, boolean]),
			),
		);
		return this;
	}

	/**
	 * Sets the dependency of the dependency box.
	 * The box will only be visible if the specified Toggle is in the specified state.
	 */
	public dependsOn(idx: string, state: boolean) {
		this.dependencies.push([idx, state]);
		return this;
	}
}

/**
 * Represents a tab section.
 */
export class Tab extends Box {
	protected name: string = "TAB";

	/**
	 * Builds the tab on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Tabbox) {
		const tab = parent.AddTab(this.name);
		for (const child of this.children) child.build(builder, tab);
		return this;
	}

	/**
	 * Sets the name of the tab.
	 */
	public title(title: string) {
		this.name = title;
		return this;
	}
}

/**
 * Represents a groupbox section.
 */
export class Groupbox extends Box {
	protected name: string = "GROUPBOX";
	protected children: Element[] = [];

	/**
	 * Builds the groupbox on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Tab, side: Side): Groupbox {
		const method = side === Side.Left ? "AddLeftGroupbox" : "AddRightGroupbox";
		const tabbox = parent[method](this.name);
		for (const child of this.children) child.build(builder, tabbox);
		return this;
	}

	/**
	 * Sets the name of the groupbox.
	 */
	public title(title: string): Groupbox {
		this.name = title;
		return this;
	}
}

/**
 * Represents a tabbox section.
 */
export class Tabbox {
	protected children: Tab[] = [];

	/**
	 * Builds the tabbox on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Tab, side: Side): Tabbox {
		const method = side === Side.Left ? "AddLeftTabbox" : "AddRightTabbox";
		const tabbox = parent[method]();
		for (const child of this.children) child.build(builder, tabbox);
		return this;
	}

	/**
	 * Adds tabs to the tabbox.
	 */
	public tabs(tabs: Tab[]): Tabbox {
		for (const tab of tabs) this.children.push(tab);
		return this;
	}
}

/************************************************************
 * INTERFACE
 * Description: Builder classes to construct the UI
 ************************************************************/
/**
 * Represents a page.
 */
export class Page {
	protected name: string = "PAGE";
	protected left_children: (Groupbox | Tabbox)[] = [];
	protected right_children: (Groupbox | Tabbox)[] = [];

	/**
	 * Builds the page on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Window): Page {
		const tab = parent.AddTab(this.name);
		for (const child of this.left_children) child.build(builder, tab, Side.Left);
		for (const child of this.right_children) child.build(builder, tab, Side.Right);
		return this;
	}

	/**
	 * Adds sections to the left side of the page.
	 */
	public left(left: (Groupbox | Tabbox)[]): Page {
		for (const child of left) this.left_children.push(child);
		return this;
	}

	/**
	 * Adds sections to the right side of the page.
	 */
	public right(right: (Groupbox | Tabbox)[]): Page {
		for (const child of right) this.right_children.push(child);
		return this;
	}

	/**
	 * Sets the name of the page.
	 */
	public title(title: string): Page {
		this.name = title;
		return this;
	}
}

/**
 * Represents a window.
 */
export class Window {
	protected configs: UIConfig.Window = {};
	protected children: Page[] = [];

	/**
	 * Builds the window on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Library): Window {
		const window = parent.CreateWindow(this.configs);
		for (const tab of this.children) tab.build(builder, window);
		return this;
	}

	/**
	 * Adds pages to the window.
	 */
	public pages(tabs: Page[]): Window {
		for (const tab of tabs) this.children.push(tab);
		return this;
	}

	/**
	 * Sets the title of the window.
	 */
	public title(title: string): Window {
		this.configs.Title = title;
		return this;
	}

	/**
	 * Sets whether the window is centered on the screen.
	 */
	public centered(center: boolean): Window {
		this.configs.Center = center;
		return this;
	}

	/**
	 * Sets visibility of the window when created.
	 */
	public autoShow(autoShow: boolean): Window {
		this.configs.AutoShow = autoShow;
		return this;
	}

	/**
	 * Sets the time it takes for the window to fade in and out.
	 */
	public withFadeTime(menuFadeTime: number): Window {
		this.configs.MenuFadeTime = menuFadeTime;
		return this;
	}
}

/************************************************************
 * BUILDER
 * Description: Builder class to construct the UI
 ************************************************************/
/**
 * Builder class for UI
 */
export class Builder {
	/** @hidden */
	public library: Library = Library;

	/** @hidden */
	public saveManager!: SaveManager;

	/** @hidden */
	public themeManager!: ThemeManager;

	/** @hidden */
	public onAppear = new Map<unknown, () => void>();

	protected children: Window[] = [];

	/**
	 * Creates the UI.
	 */
	public renderUI(): Builder {
		for (const window of this.children) window.build(this, this.library);
		for (const [, callback] of this.onAppear) task.defer(callback);
		return this;
	}

	/**
	 * Adds windows to the UI.
	 */
	public windows(windows: Window[]): Builder {
		for (const window of windows) this.children.push(window);
		return this;
	}

	/**
	 * Sets the library to use for UI creation.
	 */
	public setLibrary(library: Library): Builder {
		this.library = library;
		return this;
	}

	public setSaveManager(saveManager: SaveManager): Builder {
		this.saveManager = saveManager;
		return this;
	}

	public setThemeManager(themeManager: ThemeManager): Builder {
		this.themeManager = themeManager;
		return this;
	}
}
