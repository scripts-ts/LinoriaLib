/// <reference types="@rbxts/compiler-types" />
/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/compiler-types" />
/// <reference types="@rbxts/compiler-types" />
import type { SaveManager } from "./addons/savemanager";
import type { ThemeManager } from "./addons/thememanager";
import type { Elements, Library, UIConfig } from "./library";
declare const Library: Library;
export declare enum Side {
    Left = 0,
    Right = 1
}
export declare function load(): LuaTuple<[Library, SaveManager, ThemeManager]>;
/************************************************************
 * EXTENSIONS
 * Description: Builder classes for element extensions
 ************************************************************/
/**
 * Abstract base class for element extensions.
 */
declare abstract class Extension {
    protected idx: string;
    /**
     * Builds the extension on the specified parent element.
     * @hidden
     */
    abstract build(parent: Elements.BaseAddons): Extension;
    /**
     * Sets the index of the extension.
     * The extension can be referenced by this index using `Options[idx]`.
     */
    index(idx: string): this;
}
/**
 * Represents a key picker extension.
 */
export declare class KeyPicker extends Extension {
    protected _title: string;
    protected _noUI: boolean;
    protected _mode: KeyPickerMode;
    protected _default: KeypickerBind;
    protected _syncToggle: boolean;
    protected _callback: (value: boolean) => void;
    protected _changedCallback: (value: Enum.KeyCode | Enum.UserInputType) => void;
    /**
     * Builds the key picker extension on the specified parent element.
     * @hidden
     */
    build(parent: Elements.BaseAddons): KeyPicker;
    /**
     * Sets the title of the key picker.
     */
    title(title: string): KeyPicker;
    /**
     * Whether to show the key picker on the keybind menu.
     */
    hidden(hide: boolean): KeyPicker;
    /**
     * Sets the default value of the key picker.
     */
    bind(value: KeypickerBind): KeyPicker;
    /**
     * Sets the mode of the key picker.
     * "Hold" - The key picker is active while the key is held.
     * "Toggle" - The key picker is toggled on and off.
     * "Always" - The key picker is always active.
     */
    mode(mode: KeyPickerMode): KeyPicker;
    /**
     * SyncToggleState only works with toggles.
     * When enabled, the keybind has its state synced with its parent toggle.
     */
    sync(enabled: boolean): KeyPicker;
    /**
     * Subscribes to the key picker's state
     */
    onClick(callback: (value: boolean) => void): KeyPicker;
    /**
     * Subscribes to the key picker's keybind
     */
    onChanged(callback: (value: Enum.KeyCode | Enum.UserInputType) => void): KeyPicker;
}
/**
 * Represents a color picker extension.
 */
export declare class ColorPicker extends Extension {
    protected _title: string;
    protected _default: Color3;
    protected _transparency?: number;
    protected _callback: (value: Color3) => void;
    /**
     * Builds the color picker extension on the specified parent element.
     * @hidden
     */
    build(parent: Elements.BaseAddons): ColorPicker;
    /**
     * Sets the title of the color picker.
     */
    title(title: string): ColorPicker;
    /**
     * Sets the default value of the color picker.
     */
    default(value: Color3): ColorPicker;
    /**
     * Sets the transparency of the color picker.
     * If set, the color picker will have a transparency slider.
     */
    transparency(transparency: number): ColorPicker;
    /**
     * Subscribes to the color picker's state
     */
    onChanged(callback: (value: Color3) => void): ColorPicker;
}
/************************************************************
 * ELEMENTS
 * Description: Builder classes for individual elements
 ************************************************************/
/**
 * Abstract base class for elements.
 */
declare abstract class Element {
    protected idx: string;
    /**
     * Builds the element on the specified parent element.
     * @hidden
     */
    abstract build(builder: Builder, parent: unknown): Element;
    /**
     * Sets the index of the element.
     * The element can be referenced by this index using `Toggles[idx]` or `Options[idx]`.
     */
    index(idx: string): this;
}
/**
 * Abstract base class for elements with extensions.
 */
declare abstract class BaseExtensions extends Element {
    protected addons: Extension[];
    /**
     * Adds extensions to the element.
     */
    extensions(extensions: Extension[]): this;
}
/**
 * Represents a label element.
 */
export declare class Label extends BaseExtensions {
    protected _text: string;
    protected _doesWrap: boolean;
    /**
     * Builds the label element on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): Label;
    /**
     * Sets the text of the label.
     */
    text(text: string): Label;
    /**
     * Sets whether the label should wrap text.
     * Please note that if wrap is enabled, the label cannot have any extensions.
     */
    wrap(wrap: boolean): Label;
}
/**
 * Represents a toggle element.
 */
export declare class Toggle extends BaseExtensions {
    protected _title: string;
    protected _tooltip: string;
    protected _default: boolean;
    protected _callback: (value: boolean) => void;
    /**
     * Builds the toggle element on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): Toggle;
    /**
     * Sets the title of the toggle.
     */
    title(title: string): Toggle;
    /**
     * Sets the tooltip of the toggle.
     */
    tooltip(tooltip: string): Toggle;
    /**
     * Sets the default value of the toggle.
     */
    default(value: boolean): Toggle;
    /**
     * Subscribes to the toggle's state
     */
    onChanged(callback: (value: boolean) => void): Toggle;
}
/**
 * Represents a button element.
 */
export declare class Button extends Element {
    protected _title: string;
    protected _tooltip: string;
    protected _doubleClick: boolean;
    protected _callback: () => void;
    /**
     * Builds the button element on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): Button;
    /**
     * Sets the title of the button.
     */
    title(title: string): Button;
    /**
     * Sets the tooltip of the button.
     */
    tooltip(tooltip: string): Button;
    /**
     * Sets whether the button should trigger on double click.
     */
    doubleClick(doubleClick: boolean): Button;
    /**
     * Subscribes to the button's click event
     */
    onClick(func: () => void): Button;
}
/**
 * Represents an input element.
 */
export declare class Input extends Element {
    protected _title: string;
    protected _tooltip: string;
    protected _default: string;
    protected _placeholder: string;
    protected _numeric: boolean;
    protected _finished: boolean;
    protected _maxLength?: number;
    protected _callback: (value: string) => void;
    /**
     * Builds the input element on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): Input;
    /**
     * Sets the title of the input.
     */
    title(title: string): Input;
    /**
     * Sets the tooltip of the input.
     */
    tooltip(tooltip: string): Input;
    /**
     * Sets the default value of the input.
     */
    default(value: string): Input;
    /**
     * Sets the placeholder of the input.
     */
    placeholder(placeholder: string): Input;
    /**
     * Sets whether the input should only accept numeric values.
     */
    numeric(numeric: boolean): Input;
    /**
     * Sets whether callback should only trigger when finished typing.
     */
    finished(finished: boolean): Input;
    /**
     * Sets the maximum length of the input.
     */
    maxLength(maxLength: number): Input;
    /**
     * Subscribes to the input's value
     */
    onChanged(callback: (value: string) => void): Input;
}
/**
 * Represents a slider element.
 */
export declare class Slider extends Element {
    protected _title: string;
    protected _default: number;
    protected _min: number;
    protected _max: number;
    protected _rounding: number;
    protected _suffix: string;
    protected _compact: boolean;
    protected _hideMax: boolean;
    protected _callback: (value: number) => void;
    /**
     * Builds the slider element on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): Slider;
    /**
     * Sets the title of the slider.
     */
    title(title: string): Slider;
    /**
     * Sets the default value of the slider.
     */
    default(value: number): Slider;
    /**
     * Sets the value limits of the slider.
     */
    limits(min: number, max: number): Slider;
    /**
     * Sets the number of decimal places to which the value is rounded.
     */
    round(decimals: number): Slider;
    /**
     * Sets the suffix of the value.
     */
    suffix(suffix: string): Slider;
    /**
     * Sets whether the slider should be compact.
     */
    compact(compact: boolean): Slider;
    /**
     * Sets whether the maximum value should be hidden.
     */
    hideMax(hideMax: boolean): Slider;
    /**
     * Subscribes to the slider's value
     */
    onChanged(callback: (value: number) => void): Slider;
}
/**
 * Represents a dropdown element.
 */
export declare class Dropdown<V extends string> extends Element {
    protected _title: string;
    protected _tooltip: string;
    protected _values: V[];
    protected _default: number | V;
    protected _allowNull: boolean;
    protected _specialType?: SpecialType;
    protected _callback: (value: V) => void;
    /**
     * Builds the dropdown element on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): Dropdown<V>;
    /**
     * Sets the title of the dropdown.
     */
    title(title: string): Dropdown<V>;
    /**
     * Sets the tooltip of the dropdown.
     */
    tooltip(tooltip: string): Dropdown<V>;
    /**
     * Sets the options of the dropdown.
     */
    options(options: V[]): Dropdown<V>;
    /**
     * Sets the default value of the dropdown.
     */
    default(value: number | V): Dropdown<V>;
    /**
     * Sets whether the dropdown should allow null values.
     */
    canNull(allowNull: boolean): Dropdown<V>;
    /**
     * Sets the special type of the dropdown.
     */
    specialType(specialType: SpecialType): Dropdown<V>;
    /**
     * Subscribes to the dropdown's value
     */
    onChange(callback: (value: V) => void): Dropdown<V>;
}
/**
 * Represents a multi dropdown element.
 */
export declare class MultiDropdown<V extends string> extends Element {
    protected _title: string;
    protected _tooltip: string;
    protected _values: V[];
    protected _default: V[];
    protected _allowNull: boolean;
    protected _specialType?: SpecialType;
    protected _callback: (value: Set<V>) => void;
    /**
     * Builds the multi dropdown element on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): MultiDropdown<V>;
    /**
     * Sets the title of the multi dropdown.
     */
    title(title: string): MultiDropdown<V>;
    /**
     * Sets the tooltip of the multi dropdown.
     */
    tooltip(tooltip: string): MultiDropdown<V>;
    /**
     * Sets the options of the multi dropdown.
     */
    options(options: V[]): MultiDropdown<V>;
    /**
     * Sets the default value of the multi dropdown.
     */
    default(value: V[]): MultiDropdown<V>;
    /**
     * Sets whether the multi dropdown should allow null values.
     */
    canNull(enabled: boolean): MultiDropdown<V>;
    /**
     * Sets the special type of the multi dropdown.
     */
    specialType(specialType: SpecialType): MultiDropdown<V>;
    /**
     * Subscribes to the multi dropdown's value
     */
    onChange(callback: (value: Set<V>) => void): MultiDropdown<V>;
}
/************************************************************
 * SECTIONS
 * Description: Builder classes that hold elements
 ************************************************************/
/**
 * Abstract base class for sections.
 */
declare abstract class Box {
    protected children: (Element | DependencyBox)[];
    /**
     * Adds elements to the section.
     */
    elements(elements: (Element | DependencyBox)[]): this;
}
/**
 * Represents a box section.
 */
export declare class DependencyBox extends Box {
    private dependent;
    private state;
    /**
     * Builds the dependency box on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): DependencyBox;
    /**
     * Sets the dependency of the dependency box.
     * The box will only be visible if the specified Toggle is in the specified state.
     */
    dependsOn(idx: string, state: boolean): this;
}
/**
 * Represents a tab section.
 */
export declare class Tab extends Box {
    protected name: string;
    /**
     * Builds the tab on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Tabbox): this;
    /**
     * Sets the name of the tab.
     */
    title(title: string): this;
}
/**
 * Represents a groupbox section.
 */
export declare class Groupbox extends Box {
    protected name: string;
    protected children: Element[];
    /**
     * Builds the groupbox on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Tab, side: Side): Groupbox;
    /**
     * Sets the name of the groupbox.
     */
    title(title: string): Groupbox;
}
/**
 * Represents a tabbox section.
 */
export declare class Tabbox {
    protected children: Tab[];
    /**
     * Builds the tabbox on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Tab, side: Side): Tabbox;
    /**
     * Adds tabs to the tabbox.
     */
    tabs(tabs: Tab[]): Tabbox;
}
/************************************************************
 * INTERFACE
 * Description: Builder classes to construct the UI
 ************************************************************/
/**
 * Represents a page.
 */
export declare class Page {
    protected name: string;
    protected left_children: (Groupbox | Tabbox)[];
    protected right_children: (Groupbox | Tabbox)[];
    /**
     * Builds the page on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Window): Page;
    /**
     * Adds sections to the left side of the page.
     */
    left(left: (Groupbox | Tabbox)[]): Page;
    /**
     * Adds sections to the right side of the page.
     */
    right(right: (Groupbox | Tabbox)[]): Page;
    /**
     * Sets the name of the page.
     */
    title(title: string): Page;
}
/**
 * Represents a window.
 */
export declare class Window {
    protected configs: UIConfig.Window;
    protected children: Page[];
    /**
     * Builds the window on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Library): Window;
    /**
     * Adds pages to the window.
     */
    pages(tabs: Page[]): Window;
    /**
     * Sets the title of the window.
     */
    title(title: string): Window;
    /**
     * Sets whether the window is centered on the screen.
     */
    centered(center: boolean): Window;
    /**
     * Sets visibility of the window when created.
     */
    autoShow(autoShow: boolean): Window;
    /**
     * Sets the time it takes for the window to fade in and out.
     */
    withFadeTime(menuFadeTime: number): Window;
}
/************************************************************
 * BUILDER
 * Description: Builder class to construct the UI
 ************************************************************/
/**
 * Builder class for UI
 */
export declare class Builder {
    /** @hidden */
    library: Library;
    /** @hidden */
    saveManager: SaveManager;
    /** @hidden */
    themeManager: ThemeManager;
    /** @hidden */
    onAppear: Map<unknown, () => void>;
    protected children: Window[];
    /**
     * Creates the UI.
     */
    renderUI(): Builder;
    /**
     * Adds windows to the UI.
     */
    windows(windows: Window[]): Builder;
    /**
     * Sets the library to use for UI creation.
     */
    setLibrary(library: Library): Builder;
    setSaveManager(saveManager: SaveManager): Builder;
    setThemeManager(themeManager: ThemeManager): Builder;
}
export {};
