import type { SaveManager } from "./addons/savemanager";
import type { ThemeManager } from "./addons/thememanager";
import type { Elements, Library, UIConfig } from "./library";

declare const Library: Library;
declare const Toggles: Record<string, Elements.Toggle>;

export enum Side {
	Left,
	Right,
}

export function load() {
	const repo = "https://raw.githubusercontent.com/scripts-ts/LinoriaLib/main/out/";
	const library = loadstring(game.HttpGet(repo + "library.lua"))() as Library;
	const saveManager = loadstring(game.HttpGet(repo + "addons/savemanager.lua"))() as SaveManager;
	const themeManager = loadstring(game.HttpGet(repo + "addons/thememanager.lua"))() as ThemeManager;
	return $tuple(library, saveManager, themeManager);
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
	public setIndex(idx: string) {
		this.idx = idx;
		return this;
	}
}

/**
 * Represents a key picker extension.
 */
export class KeyPicker extends Extension {
	protected default: KeypickerBind = "Delete";
	protected syncToggleState: boolean = false;
	protected mode: KeyPickerMode = "Toggle";
	protected title: string = "";
	protected noUI: boolean = false;
	protected callback: (value: boolean) => void = () => {};
	protected changedCallback: (value: Enum.KeyCode | Enum.UserInputType) => void = () => {};

	/**
	 * Builds the key picker extension on the specified parent element.
	 * @hidden
	 */
	public build(parent: Elements.BaseAddons): KeyPicker {
		parent.AddKeyPicker(this.idx, {
			Default: this.default,
			SyncToggleState: this.syncToggleState,
			Mode: this.mode,
			Text: this.title,
			NoUI: this.noUI,
			Callback: this.callback,
			ChangedCallback: this.changedCallback,
		});
		return this;
	}

	/**
	 * Sets the default value of the key picker.
	 */
	public setBind(value: KeypickerBind): KeyPicker {
		this.default = value;
		return this;
	}

	/**
	 * SyncToggleState only works with toggles.
	 * When enabled, the keybind has its state synced with its parent toggle.
	 */
	public setSyncToggleState(syncToggleState: boolean): KeyPicker {
		this.syncToggleState = syncToggleState;
		return this;
	}

	/**
	 * Sets the mode of the key picker.
	 * "Hold" - The key picker is active while the key is held.
	 * "Toggle" - The key picker is toggled on and off.
	 * "Always" - The key picker is always active.
	 */
	public setMode(mode: KeyPickerMode): KeyPicker {
		this.mode = mode;
		return this;
	}

	/**
	 * Sets the title of the key picker.
	 */
	public setTitle(title: string): KeyPicker {
		this.title = title;
		return this;
	}

	/**
	 * Whether to show the key picker on the keybind menu.
	 */
	public setNoUI(noUI: boolean): KeyPicker {
		this.noUI = noUI;
		return this;
	}

	/**
	 * Subscribes to the key picker's state
	 */
	public onCallback(callback: (value: boolean) => void): KeyPicker {
		this.callback = callback;
		return this;
	}

	/**
	 * Subscribes to the key picker's keybind
	 */
	public onKeybind(callback: (value: Enum.KeyCode | Enum.UserInputType) => void): KeyPicker {
		this.changedCallback = callback;
		return this;
	}
}

/**
 * Represents a color picker extension.
 */
export class ColorPicker extends Extension {
	protected default: Color3 = new Color3(1, 1, 1);
	protected title: string = "";
	protected transparency?: number;
	protected callback: (value: Color3) => void = () => {};

	/**
	 * Builds the color picker extension on the specified parent element.
	 * @hidden
	 */
	public build(parent: Elements.BaseAddons): ColorPicker {
		parent.AddColorPicker(this.idx, {
			Default: this.default,
			Title: this.title,
			Transparency: this.transparency,
			Callback: this.callback,
		});
		return this;
	}

	/**
	 * Sets the default value of the color picker.
	 */
	public setValue(value: Color3): ColorPicker {
		this.default = value;
		return this;
	}

	/**
	 * Sets the title of the color picker.
	 */
	public setTitle(title: string): ColorPicker {
		this.title = title;
		return this;
	}

	/**
	 * Sets the transparency of the color picker.
	 * If set, the color picker will have a transparency slider.
	 */
	public setTransparency(transparency: number): ColorPicker {
		this.transparency = transparency;
		return this;
	}

	/**
	 * Subscribes to the color picker's state
	 */
	public onCallback(callback: (value: Color3) => void): ColorPicker {
		this.callback = callback;
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
	public setIndex(idx: string) {
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
	protected text: string = "";
	protected doesWrap: boolean = false;

	/**
	 * Builds the label element on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): Label {
		const label = parent.AddLabel(this.text, this.doesWrap);
		for (const addon of this.addons) addon.build(label);
		return this;
	}

	/**
	 * Sets the text of the label.
	 */
	public setText(text: string): Label {
		this.text = text;
		return this;
	}

	/**
	 * Sets whether the label should wrap text.
	 * Please note that if wrap is enabled, the label cannot have any extensions.
	 */
	public setWrap(wrap: boolean): Label {
		this.doesWrap = wrap;
		return this;
	}
}

/**
 * Represents a toggle element.
 */
export class Toggle extends BaseExtensions {
	protected title: string = "";
	protected tooltip: string = "";
	protected default: boolean = false;
	protected callback: (value: boolean) => void = () => {};

	/**
	 * Builds the toggle element on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): Toggle {
		const toggle = parent.AddToggle(this.idx, {
			Text: this.title,
			Default: this.default,
			Tooltip: this.tooltip,
			Callback: this.callback,
		});
		for (const addon of this.addons) addon.build(toggle);
		return this;
	}

	/**
	 * Sets the title of the toggle.
	 */
	public setTitle(name: string): Toggle {
		this.title = name;
		return this;
	}

	/**
	 * Sets the tooltip of the toggle.
	 */
	public setTooltip(tooltip: string): Toggle {
		this.tooltip = tooltip;
		return this;
	}

	/**
	 * Sets the default value of the toggle.
	 */
	public setValue(value: boolean): Toggle {
		this.default = value;
		return this;
	}

	/**
	 * Subscribes to the toggle's state
	 */
	public onCallback(callback: (value: boolean) => void): Toggle {
		this.callback = callback;
		return this;
	}
}

/**
 * Represents a button element.
 */
export class Button extends Element {
	protected title: string = "";
	protected tooltip: string = "";
	protected doubleClick: boolean = false;
	protected func: () => void = () => {};

	/**
	 * Builds the button element on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): Button {
		parent.AddButton({
			Text: this.title,
			Func: this.func,
			DoubleClick: this.doubleClick,
			Tooltip: this.tooltip,
		});
		return this;
	}

	/**
	 * Sets the title of the button.
	 */
	public setTitle(title: string): Button {
		this.title = title;
		return this;
	}

	/**
	 * Sets the tooltip of the button.
	 */
	public setTooltip(tooltip: string): Button {
		this.tooltip = tooltip;
		return this;
	}

	/**
	 * Sets whether the button should trigger on double click.
	 */
	public setDoubleClick(doubleClick: boolean): Button {
		this.doubleClick = doubleClick;
		return this;
	}

	/**
	 * Subscribes to the button's click event
	 */
	public onClick(func: () => void): Button {
		this.func = func;
		return this;
	}
}

/**
 * Represents an input element.
 */
export class Input extends Element {
	protected title: string = "";
	protected tooltip: string = "";
	protected default: string = "";
	protected placeholder: string = "";
	protected numeric: boolean = false;
	protected finished: boolean = false;
	protected maxLength?: number;
	protected callback: (value: string) => void = () => {};

	/**
	 * Builds the input element on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): Input {
		parent.AddInput(this.idx, {
			Default: this.default,
			Numeric: this.numeric,
			Finished: this.finished,
			Text: this.title,
			Tooltip: this.tooltip,
			Placeholder: this.placeholder,
			MaxLength: this.maxLength,
			Callback: this.callback,
		});
		return this;
	}

	/**
	 * Sets the title of the input.
	 */
	public setTitle(title: string): Input {
		this.title = title;
		return this;
	}

	/**
	 * Sets the tooltip of the input.
	 */
	public setTooltip(tooltip: string): Input {
		this.tooltip = tooltip;
		return this;
	}

	/**
	 * Sets the default value of the input.
	 */
	public setValue(value: string): Input {
		this.default = value;
		return this;
	}

	/**
	 * Sets the placeholder of the input.
	 */
	public setPlaceholder(placeholder: string): Input {
		this.placeholder = placeholder;
		return this;
	}

	/**
	 * Sets whether the input should only accept numeric values.
	 */
	public setNumeric(numeric: boolean): Input {
		this.numeric = numeric;
		return this;
	}

	/**
	 * Sets whether callback should only trigger when finished typing.
	 */
	public setFinished(finished: boolean): Input {
		this.finished = finished;
		return this;
	}

	/**
	 * Sets the maximum length of the input.
	 */
	public setMaxLength(maxLength: number): Input {
		this.maxLength = maxLength;
		return this;
	}

	/**
	 * Subscribes to the input's value
	 */
	public onCallback(callback: (value: string) => void): Input {
		this.callback = callback;
		return this;
	}
}

/**
 * Represents a slider element.
 */
export class Slider extends Element {
	protected title: string = "";
	protected default: number = 0;
	protected min: number = 0;
	protected max: number = 1;
	protected rounding: number = 2;
	protected suffix: string = "";
	protected compact: boolean = false;
	protected hideMax: boolean = false;
	protected callback: (value: number) => void = () => {};

	/**
	 * Builds the slider element on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): Slider {
		parent.AddSlider(this.idx, {
			Text: this.title,
			Default: this.default,
			Min: this.min,
			Max: this.max,
			Rounding: this.rounding,
			Suffix: this.suffix,
			Compact: this.compact,
			HideMax: this.hideMax,
			Callback: this.callback,
		});
		return this;
	}

	/**
	 * Sets the title of the slider.
	 */
	public setTitle(title: string): Slider {
		this.title = title;
		return this;
	}

	/**
	 * Sets the default value of the slider.
	 */
	public setValue(value: number): Slider {
		this.default = value;
		return this;
	}

	/**
	 * Sets the minimum value of the slider.
	 */
	public setMin(min: number): Slider {
		this.min = min;
		return this;
	}

	/**
	 * Sets the maximum value of the slider.
	 */
	public setMax(max: number): Slider {
		this.max = max;
		return this;
	}

	/**
	 * Sets the number of decimal places to which the value is rounded.
	 */
	public setRounding(rounding: number): Slider {
		this.rounding = rounding;
		return this;
	}

	/**
	 * Sets the suffix of the value.
	 */
	public setSuffix(suffix: string): Slider {
		this.suffix = suffix;
		return this;
	}

	/**
	 * Sets whether the slider should be compact.
	 */
	public setCompact(compact: boolean): Slider {
		this.compact = compact;
		return this;
	}

	/**
	 * Sets whether the maximum value should be hidden.
	 */
	public setHideMax(hideMax: boolean): Slider {
		this.hideMax = hideMax;
		return this;
	}

	/**
	 * Subscribes to the slider's value
	 */
	public onCallback(callback: (value: number) => void): Slider {
		this.callback = callback;
		return this;
	}
}

/**
 * Represents a dropdown element.
 */
export class Dropdown<V extends string> extends Element {
	protected title: string = "";
	protected tooltip: string = "";
	protected values: V[] = [];
	protected default: number | V = 1;
	protected allowNull: boolean = false;
	protected specialType?: SpecialType;
	protected callback: (value: V) => void = () => {};

	/**
	 * Builds the dropdown element on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): Dropdown<V> {
		parent.AddDropdown(this.idx, {
			Text: this.title,
			Tooltip: this.tooltip,
			Values: this.values,
			Default: this.default,
			Multi: false,
			AllowNull: this.allowNull,
			SpecialType: this.specialType,
			Callback: this.callback,
		});
		return this;
	}

	/**
	 * Sets the title of the dropdown.
	 */
	public setTitle(title: string): Dropdown<V> {
		this.title = title;
		return this;
	}

	/**
	 * Sets the tooltip of the dropdown.
	 */
	public setTooltip(tooltip: string): Dropdown<V> {
		this.tooltip = tooltip;
		return this;
	}

	/**
	 * Sets the options of the dropdown.
	 */
	public setOptions(options: V[]): Dropdown<V> {
		this.values = options;
		return this;
	}

	/**
	 * Sets the default value of the dropdown.
	 */
	public setValue(value: number | V): Dropdown<V> {
		this.default = value;
		return this;
	}

	/**
	 * Sets whether the dropdown should allow null values.
	 */
	public setAllowNull(allowNull: boolean): Dropdown<V> {
		this.allowNull = allowNull;
		return this;
	}

	/**
	 * Sets the special type of the dropdown.
	 */
	public setSpecialType(specialType: SpecialType): Dropdown<V> {
		this.specialType = specialType;
		return this;
	}

	/**
	 * Subscribes to the dropdown's value
	 */
	public onCallback(callback: (value: V) => void): Dropdown<V> {
		this.callback = callback;
		return this;
	}
}

export class MultiDropdown<V extends string> extends Element {
	protected title: string = "";
	protected tooltip: string = "";
	protected values: V[] = [];
	protected default: V[] = [];
	protected allowNull: boolean = false;
	protected specialType?: SpecialType;
	protected callback: (value: Set<V>) => void = () => {};

	/**
	 * Builds the multi dropdown element on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): MultiDropdown<V> {
		const dropdown = parent.AddDropdown(this.idx, {
			Text: this.title,
			Tooltip: this.tooltip,
			Values: this.values,
			Default: this.default[0] ?? this.values[0],
			Multi: true,
			AllowNull: this.allowNull,
			SpecialType: this.specialType,
			Callback: this.callback,
		});
		dropdown.SetValue(new Set(this.default));
		return this;
	}

	/**
	 * Sets the title of the multi dropdown.
	 */
	public setTitle(title: string): MultiDropdown<V> {
		this.title = title;
		return this;
	}

	/**
	 * Sets the tooltip of the multi dropdown.
	 */
	public setTooltip(tooltip: string): MultiDropdown<V> {
		this.tooltip = tooltip;
		return this;
	}

	/**
	 * Sets the options of the multi dropdown.
	 */
	public setOptions(options: V[]): MultiDropdown<V> {
		this.values = options;
		return this;
	}

	/**
	 * Sets the default value of the multi dropdown.
	 */
	public setValue(value: V[]): MultiDropdown<V> {
		this.default = value;
		return this;
	}

	/**
	 * Sets whether the multi dropdown should allow null values.
	 */
	public setAllowNull(allowNull: boolean): MultiDropdown<V> {
		this.allowNull = allowNull;
		return this;
	}

	/**
	 * Sets the special type of the multi dropdown.
	 */
	public setSpecialType(specialType: SpecialType): MultiDropdown<V> {
		this.specialType = specialType;
		return this;
	}

	/**
	 * Subscribes to the multi dropdown's value
	 */
	public onCallback(callback: (value: Set<V>) => void): MultiDropdown<V> {
		this.callback = callback;
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
	protected children: Element[] = [];

	/**
	 * Adds elements to the section.
	 */
	public elements(elements: Element[]) {
		for (const element of elements) this.children.push(element);
		return this;
	}
}

/**
 * Represents a box section.
 */
export class DependencyBox extends Box {
	private dependent: string = "";
	private state: boolean = true;

	/**
	 * Builds the dependency box on the specified parent element.
	 * @hidden
	 */
	public build(builder: Builder, parent: Elements.Box): DependencyBox {
		const box = parent.AddDependencyBox();
		for (const child of this.children) child.build(builder, box);
		builder.onAppear.set(this, () => box.SetupDependencies([Toggles[this.dependent], this.state]));
		return this;
	}

	/**
	 * Sets the dependency of the dependency box.
	 * The box will only be visible if the specified Toggle is in the specified state.
	 */
	public setDependency(idx: string, state: boolean) {
		this.dependent = idx;
		this.state = state;
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
	public setName(name: string) {
		this.name = name;
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
	public setName(name: string): Groupbox {
		this.name = name;
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
	public setName(name: string): Page {
		this.name = name;
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
	public setTitle(title: string): Window {
		this.configs.Title = title;
		return this;
	}

	/**
	 * Sets whether the window is centered on the screen.
	 */
	public setCenter(center: boolean): Window {
		this.configs.Center = center;
		return this;
	}

	/**
	 * Sets visibility of the window when created.
	 */
	public setAutoShow(autoShow: boolean): Window {
		this.configs.AutoShow = autoShow;
		return this;
	}

	/**
	 * Sets the time it takes for the window to fade in and out.
	 */
	public setMenuFadeTime(menuFadeTime: number): Window {
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
