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
    setIndex(idx: string): this;
}
/**
 * Represents a key picker extension.
 */
export declare class KeyPicker extends Extension {
    protected default: KeypickerBind;
    protected syncToggleState: boolean;
    protected mode: KeyPickerMode;
    protected title: string;
    protected noUI: boolean;
    protected callback: (value: boolean) => void;
    protected changedCallback: (value: Enum.KeyCode | Enum.UserInputType) => void;
    /**
     * Builds the key picker extension on the specified parent element.
     * @hidden
     */
    build(parent: Elements.BaseAddons): KeyPicker;
    /**
     * Sets the default value of the key picker.
     */
    setBind(value: KeypickerBind): KeyPicker;
    /**
     * SyncToggleState only works with toggles.
     * When enabled, the keybind has its state synced with its parent toggle.
     */
    setSyncToggleState(syncToggleState: boolean): KeyPicker;
    /**
     * Sets the mode of the key picker.
     * "Hold" - The key picker is active while the key is held.
     * "Toggle" - The key picker is toggled on and off.
     * "Always" - The key picker is always active.
     */
    setMode(mode: KeyPickerMode): KeyPicker;
    /**
     * Sets the title of the key picker.
     */
    setTitle(title: string): KeyPicker;
    /**
     * Whether to show the key picker on the keybind menu.
     */
    setNoUI(noUI: boolean): KeyPicker;
    /**
     * Subscribes to the key picker's state
     */
    onCallback(callback: (value: boolean) => void): KeyPicker;
    /**
     * Subscribes to the key picker's keybind
     */
    onKeybind(callback: (value: Enum.KeyCode | Enum.UserInputType) => void): KeyPicker;
}
/**
 * Represents a color picker extension.
 */
export declare class ColorPicker extends Extension {
    protected default: Color3;
    protected title: string;
    protected transparency?: number;
    protected callback: (value: Color3) => void;
    /**
     * Builds the color picker extension on the specified parent element.
     * @hidden
     */
    build(parent: Elements.BaseAddons): ColorPicker;
    /**
     * Sets the default value of the color picker.
     */
    setValue(value: Color3): ColorPicker;
    /**
     * Sets the title of the color picker.
     */
    setTitle(title: string): ColorPicker;
    /**
     * Sets the transparency of the color picker.
     * If set, the color picker will have a transparency slider.
     */
    setTransparency(transparency: number): ColorPicker;
    /**
     * Subscribes to the color picker's state
     */
    onCallback(callback: (value: Color3) => void): ColorPicker;
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
    setIndex(idx: string): this;
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
    protected text: string;
    protected doesWrap: boolean;
    /**
     * Builds the label element on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): Label;
    /**
     * Sets the text of the label.
     */
    setText(text: string): Label;
    /**
     * Sets whether the label should wrap text.
     * Please note that if wrap is enabled, the label cannot have any extensions.
     */
    setWrap(wrap: boolean): Label;
}
/**
 * Represents a toggle element.
 */
export declare class Toggle extends BaseExtensions {
    protected title: string;
    protected tooltip: string;
    protected default: boolean;
    protected callback: (value: boolean) => void;
    /**
     * Builds the toggle element on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): Toggle;
    /**
     * Sets the title of the toggle.
     */
    setTitle(name: string): Toggle;
    /**
     * Sets the tooltip of the toggle.
     */
    setTooltip(tooltip: string): Toggle;
    /**
     * Sets the default value of the toggle.
     */
    setValue(value: boolean): Toggle;
    /**
     * Subscribes to the toggle's state
     */
    onCallback(callback: (value: boolean) => void): Toggle;
}
/**
 * Represents a button element.
 */
export declare class Button extends Element {
    protected title: string;
    protected tooltip: string;
    protected doubleClick: boolean;
    protected func: () => void;
    /**
     * Builds the button element on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): Button;
    /**
     * Sets the title of the button.
     */
    setTitle(title: string): Button;
    /**
     * Sets the tooltip of the button.
     */
    setTooltip(tooltip: string): Button;
    /**
     * Sets whether the button should trigger on double click.
     */
    setDoubleClick(doubleClick: boolean): Button;
    /**
     * Subscribes to the button's click event
     */
    onClick(func: () => void): Button;
}
/**
 * Represents an input element.
 */
export declare class Input extends Element {
    protected title: string;
    protected tooltip: string;
    protected default: string;
    protected placeholder: string;
    protected numeric: boolean;
    protected finished: boolean;
    protected maxLength?: number;
    protected callback: (value: string) => void;
    /**
     * Builds the input element on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): Input;
    /**
     * Sets the title of the input.
     */
    setTitle(title: string): Input;
    /**
     * Sets the tooltip of the input.
     */
    setTooltip(tooltip: string): Input;
    /**
     * Sets the default value of the input.
     */
    setValue(value: string): Input;
    /**
     * Sets the placeholder of the input.
     */
    setPlaceholder(placeholder: string): Input;
    /**
     * Sets whether the input should only accept numeric values.
     */
    setNumeric(numeric: boolean): Input;
    /**
     * Sets whether callback should only trigger when finished typing.
     */
    setFinished(finished: boolean): Input;
    /**
     * Sets the maximum length of the input.
     */
    setMaxLength(maxLength: number): Input;
    /**
     * Subscribes to the input's value
     */
    onCallback(callback: (value: string) => void): Input;
}
/**
 * Represents a slider element.
 */
export declare class Slider extends Element {
    protected title: string;
    protected default: number;
    protected min: number;
    protected max: number;
    protected rounding: number;
    protected suffix: string;
    protected compact: boolean;
    protected hideMax: boolean;
    protected callback: (value: number) => void;
    /**
     * Builds the slider element on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): Slider;
    /**
     * Sets the title of the slider.
     */
    setTitle(title: string): Slider;
    /**
     * Sets the default value of the slider.
     */
    setValue(value: number): Slider;
    /**
     * Sets the minimum value of the slider.
     */
    setMin(min: number): Slider;
    /**
     * Sets the maximum value of the slider.
     */
    setMax(max: number): Slider;
    /**
     * Sets the number of decimal places to which the value is rounded.
     */
    setRounding(rounding: number): Slider;
    /**
     * Sets the suffix of the value.
     */
    setSuffix(suffix: string): Slider;
    /**
     * Sets whether the slider should be compact.
     */
    setCompact(compact: boolean): Slider;
    /**
     * Sets whether the maximum value should be hidden.
     */
    setHideMax(hideMax: boolean): Slider;
    /**
     * Subscribes to the slider's value
     */
    onCallback(callback: (value: number) => void): Slider;
}
/**
 * Represents a dropdown element.
 */
export declare class Dropdown<V extends string> extends Element {
    protected title: string;
    protected tooltip: string;
    protected values: V[];
    protected default: number | V;
    protected allowNull: boolean;
    protected specialType?: SpecialType;
    protected callback: (value: V) => void;
    /**
     * Builds the dropdown element on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): Dropdown<V>;
    /**
     * Sets the title of the dropdown.
     */
    setTitle(title: string): Dropdown<V>;
    /**
     * Sets the tooltip of the dropdown.
     */
    setTooltip(tooltip: string): Dropdown<V>;
    /**
     * Sets the options of the dropdown.
     */
    setOptions(options: V[]): Dropdown<V>;
    /**
     * Sets the default value of the dropdown.
     */
    setValue(value: number | V): Dropdown<V>;
    /**
     * Sets whether the dropdown should allow null values.
     */
    setAllowNull(allowNull: boolean): Dropdown<V>;
    /**
     * Sets the special type of the dropdown.
     */
    setSpecialType(specialType: SpecialType): Dropdown<V>;
    /**
     * Subscribes to the dropdown's value
     */
    onCallback(callback: (value: V) => void): Dropdown<V>;
}
export declare class MultiDropdown<V extends string> extends Element {
    protected title: string;
    protected tooltip: string;
    protected values: V[];
    protected default: V[];
    protected allowNull: boolean;
    protected specialType?: SpecialType;
    protected callback: (value: Set<V>) => void;
    /**
     * Builds the multi dropdown element on the specified parent element.
     * @hidden
     */
    build(builder: Builder, parent: Elements.Box): MultiDropdown<V>;
    /**
     * Sets the title of the multi dropdown.
     */
    setTitle(title: string): MultiDropdown<V>;
    /**
     * Sets the tooltip of the multi dropdown.
     */
    setTooltip(tooltip: string): MultiDropdown<V>;
    /**
     * Sets the options of the multi dropdown.
     */
    setOptions(options: V[]): MultiDropdown<V>;
    /**
     * Sets the default value of the multi dropdown.
     */
    setValue(value: V[]): MultiDropdown<V>;
    /**
     * Sets whether the multi dropdown should allow null values.
     */
    setAllowNull(allowNull: boolean): MultiDropdown<V>;
    /**
     * Sets the special type of the multi dropdown.
     */
    setSpecialType(specialType: SpecialType): MultiDropdown<V>;
    /**
     * Subscribes to the multi dropdown's value
     */
    onCallback(callback: (value: Set<V>) => void): MultiDropdown<V>;
}
/************************************************************
 * SECTIONS
 * Description: Builder classes that hold elements
 ************************************************************/
/**
 * Abstract base class for sections.
 */
declare abstract class Box {
    protected children: Element[];
    /**
     * Adds elements to the section.
     */
    elements(elements: Element[]): this;
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
    setDependency(idx: string, state: boolean): this;
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
    setName(name: string): this;
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
    setName(name: string): Groupbox;
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
    setName(name: string): Page;
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
    setTitle(title: string): Window;
    /**
     * Sets whether the window is centered on the screen.
     */
    setCenter(center: boolean): Window;
    /**
     * Sets visibility of the window when created.
     */
    setAutoShow(autoShow: boolean): Window;
    /**
     * Sets the time it takes for the window to fade in and out.
     */
    setMenuFadeTime(menuFadeTime: number): Window;
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
