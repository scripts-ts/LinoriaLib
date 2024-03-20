-- Compiled with roblox-ts v2.3.0
local Side
do
	local _inverse = {}
	Side = setmetatable({}, {
		__index = _inverse,
	})
	Side.Left = 0
	_inverse[0] = "Left"
	Side.Right = 1
	_inverse[1] = "Right"
end
--[[
	***********************************************************
	 * EXTENSIONS
	 * Description: Builder classes for element extensions
	 ***********************************************************
]]
--[[
	*
	 * Abstract base class for element extensions.
	 
]]
local Extension
do
	Extension = {}
	function Extension:constructor()
		self.idx = ""
	end
	function Extension:index(idx)
		self.idx = idx
		return self
	end
end
--[[
	*
	 * Represents a key picker extension.
	 
]]
local KeyPicker
do
	local super = Extension
	KeyPicker = setmetatable({}, {
		__tostring = function()
			return "KeyPicker"
		end,
		__index = super,
	})
	KeyPicker.__index = KeyPicker
	function KeyPicker.new(...)
		local self = setmetatable({}, KeyPicker)
		return self:constructor(...) or self
	end
	function KeyPicker:constructor(...)
		super.constructor(self, ...)
		self._title = ""
		self._noUI = false
		self._mode = "Toggle"
		self._default = "Delete"
		self._syncToggle = false
		self._callback = function() end
		self._changedCallback = function() end
	end
	function KeyPicker:build(parent)
		parent:AddKeyPicker(self.idx, {
			Default = self._default,
			SyncToggleState = self._syncToggle,
			Mode = self._mode,
			Text = self._title,
			NoUI = self._noUI,
			Callback = self._callback,
			ChangedCallback = self._changedCallback,
		})
		return self
	end
	function KeyPicker:title(title)
		self._title = title
		return self
	end
	function KeyPicker:hidden(hide)
		self._noUI = hide
		return self
	end
	function KeyPicker:bind(value)
		self._default = value
		return self
	end
	function KeyPicker:mode(mode)
		self._mode = mode
		return self
	end
	function KeyPicker:sync(enabled)
		self._syncToggle = enabled
		return self
	end
	function KeyPicker:onClick(callback)
		self._callback = callback
		return self
	end
	function KeyPicker:onChanged(callback)
		self._changedCallback = callback
		return self
	end
end
--[[
	*
	 * Represents a color picker extension.
	 
]]
local ColorPicker
do
	local super = Extension
	ColorPicker = setmetatable({}, {
		__tostring = function()
			return "ColorPicker"
		end,
		__index = super,
	})
	ColorPicker.__index = ColorPicker
	function ColorPicker.new(...)
		local self = setmetatable({}, ColorPicker)
		return self:constructor(...) or self
	end
	function ColorPicker:constructor(...)
		super.constructor(self, ...)
		self._title = ""
		self._default = Color3.new(1, 1, 1)
		self._callback = function() end
	end
	function ColorPicker:build(parent)
		parent:AddColorPicker(self.idx, {
			Default = self._default,
			Title = self._title,
			Transparency = self._transparency,
			Callback = self._callback,
		})
		return self
	end
	function ColorPicker:title(title)
		self._title = title
		return self
	end
	function ColorPicker:default(value)
		self._default = value
		return self
	end
	function ColorPicker:transparency(transparency)
		self._transparency = transparency
		return self
	end
	function ColorPicker:onChanged(callback)
		self._callback = callback
		return self
	end
end
--[[
	***********************************************************
	 * ELEMENTS
	 * Description: Builder classes for individual elements
	 ***********************************************************
]]
--[[
	*
	 * Abstract base class for elements.
	 
]]
local Element
do
	Element = {}
	function Element:constructor()
		self.idx = ""
	end
	function Element:index(idx)
		self.idx = idx
		return self
	end
end
--[[
	*
	 * Represents a label element.
	 
]]
local Label
do
	Label = setmetatable({}, {
		__tostring = function()
			return "Label"
		end,
	})
	Label.__index = Label
	function Label.new(...)
		local self = setmetatable({}, Label)
		return self:constructor(...) or self
	end
	function Label:constructor()
		self._text = ""
		self._doesWrap = false
		self.addons = {}
	end
	function Label:build(builder, parent)
		local label = parent:AddLabel(self._text, self._doesWrap)
		for _, addon in self.addons do
			addon:build(label)
		end
		return self
	end
	function Label:extensions(extensions)
		for _, extension in extensions do
			local _exp = self.addons
			table.insert(_exp, extension)
		end
		return self
	end
	function Label:text(text)
		self._text = text
		return self
	end
	function Label:wrap(wrap)
		self._doesWrap = wrap
		return self
	end
end
--[[
	*
	 * Represents a toggle element.
	 
]]
local Toggle
do
	local super = Element
	Toggle = setmetatable({}, {
		__tostring = function()
			return "Toggle"
		end,
		__index = super,
	})
	Toggle.__index = Toggle
	function Toggle.new(...)
		local self = setmetatable({}, Toggle)
		return self:constructor(...) or self
	end
	function Toggle:constructor(...)
		super.constructor(self, ...)
		self._title = ""
		self._tooltip = ""
		self._default = false
		self._callback = function() end
		self.addons = {}
	end
	function Toggle:build(builder, parent)
		local toggle = parent:AddToggle(self.idx, {
			Text = self._title,
			Default = self._default,
			Tooltip = self._tooltip,
			Callback = self._callback,
		})
		for _, addon in self.addons do
			addon:build(toggle)
		end
		return self
	end
	function Toggle:extensions(extensions)
		for _, extension in extensions do
			local _exp = self.addons
			table.insert(_exp, extension)
		end
		return self
	end
	function Toggle:title(title)
		self._title = title
		return self
	end
	function Toggle:tooltip(tooltip)
		self._tooltip = tooltip
		return self
	end
	function Toggle:default(value)
		self._default = value
		return self
	end
	function Toggle:onChanged(callback)
		self._callback = callback
		return self
	end
end
--[[
	*
	 * Represents a button element.
	 
]]
local Button
do
	local super = Element
	Button = setmetatable({}, {
		__tostring = function()
			return "Button"
		end,
		__index = super,
	})
	Button.__index = Button
	function Button.new(...)
		local self = setmetatable({}, Button)
		return self:constructor(...) or self
	end
	function Button:constructor(...)
		super.constructor(self, ...)
		self._title = ""
		self._tooltip = ""
		self._doubleClick = false
		self._callback = function() end
	end
	function Button:build(builder, parent)
		parent:AddButton({
			Text = self._title,
			Func = self._callback,
			DoubleClick = self._doubleClick,
			Tooltip = self._tooltip,
		})
		return self
	end
	function Button:title(title)
		self._title = title
		return self
	end
	function Button:tooltip(tooltip)
		self._tooltip = tooltip
		return self
	end
	function Button:doubleClick(doubleClick)
		self._doubleClick = doubleClick
		return self
	end
	function Button:onClick(func)
		self._callback = func
		return self
	end
end
--[[
	*
	 * Represents an input element.
	 
]]
local Input
do
	local super = Element
	Input = setmetatable({}, {
		__tostring = function()
			return "Input"
		end,
		__index = super,
	})
	Input.__index = Input
	function Input.new(...)
		local self = setmetatable({}, Input)
		return self:constructor(...) or self
	end
	function Input:constructor(...)
		super.constructor(self, ...)
		self._title = ""
		self._tooltip = ""
		self._default = ""
		self._placeholder = ""
		self._numeric = false
		self._finished = false
		self._callback = function() end
	end
	function Input:build(builder, parent)
		parent:AddInput(self.idx, {
			Default = self._default,
			Numeric = self._numeric,
			Finished = self._finished,
			Text = self._title,
			Tooltip = self._tooltip,
			Placeholder = self._placeholder,
			MaxLength = self._maxLength,
			Callback = self._callback,
		})
		return self
	end
	function Input:title(title)
		self._title = title
		return self
	end
	function Input:tooltip(tooltip)
		self._tooltip = tooltip
		return self
	end
	function Input:default(value)
		self._default = value
		return self
	end
	function Input:placeholder(placeholder)
		self._placeholder = placeholder
		return self
	end
	function Input:numeric(numeric)
		self._numeric = numeric
		return self
	end
	function Input:finished(finished)
		self._finished = finished
		return self
	end
	function Input:maxLength(maxLength)
		self._maxLength = maxLength
		return self
	end
	function Input:onChanged(callback)
		self._callback = callback
		return self
	end
end
--[[
	*
	 * Represents a slider element.
	 
]]
local Slider
do
	local super = Element
	Slider = setmetatable({}, {
		__tostring = function()
			return "Slider"
		end,
		__index = super,
	})
	Slider.__index = Slider
	function Slider.new(...)
		local self = setmetatable({}, Slider)
		return self:constructor(...) or self
	end
	function Slider:constructor(...)
		super.constructor(self, ...)
		self._title = ""
		self._default = 0
		self._min = 0
		self._max = 1
		self._rounding = 2
		self._suffix = ""
		self._compact = false
		self._hideMax = false
		self._callback = function() end
	end
	function Slider:build(builder, parent)
		parent:AddSlider(self.idx, {
			Text = self._title,
			Default = self._default,
			Min = self._min,
			Max = self._max,
			Rounding = self._rounding,
			Suffix = self._suffix,
			Compact = self._compact,
			HideMax = self._hideMax,
			Callback = self._callback,
		})
		return self
	end
	function Slider:title(title)
		self._title = title
		return self
	end
	function Slider:default(value)
		self._default = value
		return self
	end
	function Slider:limits(min, max)
		self._min = min
		self._max = max
		return self
	end
	function Slider:round(decimals)
		self._rounding = decimals
		return self
	end
	function Slider:suffix(suffix)
		self._suffix = suffix
		return self
	end
	function Slider:compact(compact)
		self._compact = compact
		return self
	end
	function Slider:hideMax(hideMax)
		self._hideMax = hideMax
		return self
	end
	function Slider:onChanged(callback)
		self._callback = callback
		return self
	end
end
--[[
	*
	 * Represents a dropdown element.
	 
]]
local Dropdown
do
	local super = Element
	Dropdown = setmetatable({}, {
		__tostring = function()
			return "Dropdown"
		end,
		__index = super,
	})
	Dropdown.__index = Dropdown
	function Dropdown.new(...)
		local self = setmetatable({}, Dropdown)
		return self:constructor(...) or self
	end
	function Dropdown:constructor(...)
		super.constructor(self, ...)
		self._title = ""
		self._tooltip = ""
		self._values = {}
		self._default = 1
		self._allowNull = false
		self._callback = function() end
	end
	function Dropdown:build(builder, parent)
		parent:AddDropdown(self.idx, {
			Text = self._title,
			Tooltip = self._tooltip,
			Values = self._values,
			Default = self._default,
			Multi = false,
			AllowNull = self._allowNull,
			SpecialType = self._specialType,
			Callback = self._callback,
		})
		return self
	end
	function Dropdown:title(title)
		self._title = title
		return self
	end
	function Dropdown:tooltip(tooltip)
		self._tooltip = tooltip
		return self
	end
	function Dropdown:options(options)
		self._values = options
		return self
	end
	function Dropdown:default(value)
		self._default = value
		return self
	end
	function Dropdown:canNull(allowNull)
		self._allowNull = allowNull
		return self
	end
	function Dropdown:specialType(specialType)
		self._specialType = specialType
		return self
	end
	function Dropdown:onChange(callback)
		self._callback = callback
		return self
	end
end
--[[
	*
	 * Represents a multi dropdown element.
	 
]]
local MultiDropdown
do
	local super = Element
	MultiDropdown = setmetatable({}, {
		__tostring = function()
			return "MultiDropdown"
		end,
		__index = super,
	})
	MultiDropdown.__index = MultiDropdown
	function MultiDropdown.new(...)
		local self = setmetatable({}, MultiDropdown)
		return self:constructor(...) or self
	end
	function MultiDropdown:constructor(...)
		super.constructor(self, ...)
		self._title = ""
		self._tooltip = ""
		self._values = {}
		self._default = {}
		self._allowNull = false
		self._callback = function() end
	end
	function MultiDropdown:build(builder, parent)
		local _fn = parent
		local _exp = self.idx
		local _object = {
			Text = self._title,
			Tooltip = self._tooltip,
			Values = self._values,
		}
		local _left = "Default"
		local _condition = self._default[1]
		if _condition == nil then
			_condition = self._values[1]
		end
		_object[_left] = _condition
		_object.Multi = true
		_object.AllowNull = self._allowNull
		_object.SpecialType = self._specialType
		_object.Callback = self._callback
		local dropdown = _fn:AddDropdown(_exp, _object)
		local _fn_1 = dropdown
		local _set = {}
		for _, _v in self._default do
			_set[_v] = true
		end
		_fn_1:SetValue(_set)
		return self
	end
	function MultiDropdown:title(title)
		self._title = title
		return self
	end
	function MultiDropdown:tooltip(tooltip)
		self._tooltip = tooltip
		return self
	end
	function MultiDropdown:options(options)
		self._values = options
		return self
	end
	function MultiDropdown:default(value)
		self._default = value
		return self
	end
	function MultiDropdown:canNull(enabled)
		self._allowNull = enabled
		return self
	end
	function MultiDropdown:specialType(specialType)
		self._specialType = specialType
		return self
	end
	function MultiDropdown:onChange(callback)
		self._callback = callback
		return self
	end
end
--[[
	*
	 * Represents a divider element.
	 
]]
local Divider
do
	Divider = setmetatable({}, {
		__tostring = function()
			return "Divider"
		end,
	})
	Divider.__index = Divider
	function Divider.new(...)
		local self = setmetatable({}, Divider)
		return self:constructor(...) or self
	end
	function Divider:constructor()
	end
	function Divider:build(builder, parent)
		parent:AddDivider()
		return self
	end
end
--[[
	***********************************************************
	 * SECTIONS
	 * Description: Builder classes that hold elements
	 ***********************************************************
]]
--[[
	*
	 * Abstract base class for sections.
	 
]]
local Box
do
	Box = {}
	function Box:constructor()
		self.children = {}
	end
	function Box:elements(elements)
		for _, element in elements do
			local _exp = self.children
			table.insert(_exp, element)
		end
		return self
	end
end
--[[
	*
	 * Represents a box section.
	 
]]
local DependencyBox
do
	local super = Box
	DependencyBox = setmetatable({}, {
		__tostring = function()
			return "DependencyBox"
		end,
		__index = super,
	})
	DependencyBox.__index = DependencyBox
	function DependencyBox.new(...)
		local self = setmetatable({}, DependencyBox)
		return self:constructor(...) or self
	end
	function DependencyBox:constructor(...)
		super.constructor(self, ...)
		self.dependencies = {}
	end
	function DependencyBox:build(builder, parent)
		local box = parent:AddDependencyBox()
		for _, child in self.children do
			child:build(builder, box)
		end
		local __onAppear = builder._onAppear
		local _self = self
		__onAppear[_self] = function()
			local _fn = box
			local _exp = self.dependencies
			-- ▼ ReadonlyArray.map ▼
			local _newValue = table.create(#_exp)
			local _callback = function(_param)
				local idx = _param[1]
				local state = _param[2]
				return { Toggles[idx], state }
			end
			for _k, _v in _exp do
				_newValue[_k] = _callback(_v, _k - 1, _exp)
			end
			-- ▲ ReadonlyArray.map ▲
			return _fn:SetupDependencies(_newValue)
		end
		return self
	end
	function DependencyBox:dependsOn(idx, state)
		local _dependencies = self.dependencies
		local _arg0 = { idx, state }
		table.insert(_dependencies, _arg0)
		return self
	end
end
--[[
	*
	 * Represents a tab section.
	 
]]
local Tab
do
	local super = Box
	Tab = setmetatable({}, {
		__tostring = function()
			return "Tab"
		end,
		__index = super,
	})
	Tab.__index = Tab
	function Tab.new(...)
		local self = setmetatable({}, Tab)
		return self:constructor(...) or self
	end
	function Tab:constructor(...)
		super.constructor(self, ...)
		self.name = "TAB"
	end
	function Tab:build(builder, parent)
		local tab = parent:AddTab(self.name)
		for _, child in self.children do
			child:build(builder, tab)
		end
		return self
	end
	function Tab:title(title)
		self.name = title
		return self
	end
end
--[[
	*
	 * Represents a groupbox section.
	 
]]
local Groupbox
do
	local super = Box
	Groupbox = setmetatable({}, {
		__tostring = function()
			return "Groupbox"
		end,
		__index = super,
	})
	Groupbox.__index = Groupbox
	function Groupbox.new(...)
		local self = setmetatable({}, Groupbox)
		return self:constructor(...) or self
	end
	function Groupbox:constructor(...)
		super.constructor(self, ...)
		self.name = "GROUPBOX"
		self.children = {}
	end
	function Groupbox:build(builder, parent, side)
		local method = if side == Side.Left then "AddLeftGroupbox" else "AddRightGroupbox"
		local tabbox = parent[method](parent, self.name)
		for _, child in self.children do
			child:build(builder, tabbox)
		end
		return self
	end
	function Groupbox:title(title)
		self.name = title
		return self
	end
end
--[[
	*
	 * Represents a tabbox section.
	 
]]
local Tabbox
do
	Tabbox = setmetatable({}, {
		__tostring = function()
			return "Tabbox"
		end,
	})
	Tabbox.__index = Tabbox
	function Tabbox.new(...)
		local self = setmetatable({}, Tabbox)
		return self:constructor(...) or self
	end
	function Tabbox:constructor()
		self.children = {}
	end
	function Tabbox:build(builder, parent, side)
		local method = if side == Side.Left then "AddLeftTabbox" else "AddRightTabbox"
		local tabbox = parent[method](parent)
		for _, child in self.children do
			child:build(builder, tabbox)
		end
		return self
	end
	function Tabbox:tabs(tabs)
		for _, tab in tabs do
			local _exp = self.children
			table.insert(_exp, tab)
		end
		return self
	end
end
--[[
	*
	 * Represents the SaveManager section.
	 
]]
local ConfigSection
do
	ConfigSection = setmetatable({}, {
		__tostring = function()
			return "ConfigSection"
		end,
	})
	ConfigSection.__index = ConfigSection
	function ConfigSection.new(...)
		local self = setmetatable({}, ConfigSection)
		return self:constructor(...) or self
	end
	function ConfigSection:constructor()
		self._type = "ConfigSection"
		self._ignore = {}
	end
	function ConfigSection:build(builder, parent, side)
		local saveManager = builder._saveManager
		if saveManager then
			saveManager:SetIgnoreIndexes(self._ignore)
			saveManager:BuildConfigSection(parent)
		else
			error("SaveManager is not set!")
		end
		return self
	end
	function ConfigSection:ignore(indices)
		for _, index in indices do
			local _exp = self._ignore
			table.insert(_exp, index)
		end
		return self
	end
end
--[[
	*
	 * Represents the ThemeManager section.
	 
]]
local ThemeSection
do
	ThemeSection = setmetatable({}, {
		__tostring = function()
			return "ThemeSection"
		end,
	})
	ThemeSection.__index = ThemeSection
	function ThemeSection.new(...)
		local self = setmetatable({}, ThemeSection)
		return self:constructor(...) or self
	end
	function ThemeSection:constructor()
		self._type = "ThemeSection"
	end
	function ThemeSection:build(builder, parent, side)
		local themeManager = builder._themeManager
		if themeManager then
			themeManager:ApplyToTab(parent)
		else
			error("ThemeManager is not set!")
		end
		return self
	end
end
--[[
	***********************************************************
	 * INTERFACE
	 * Description: Builder classes to construct the UI
	 ***********************************************************
]]
--[[
	*
	 * Represents a page.
	 
]]
local Page
do
	Page = setmetatable({}, {
		__tostring = function()
			return "Page"
		end,
	})
	Page.__index = Page
	function Page.new(...)
		local self = setmetatable({}, Page)
		return self:constructor(...) or self
	end
	function Page:constructor()
		self.name = "PAGE"
		self.left_children = {}
		self.right_children = {}
	end
	function Page:build(builder, parent)
		local tab = parent:AddTab(self.name)
		for _, child in self.left_children do
			child:build(builder, tab, Side.Left)
		end
		for _, child in self.right_children do
			child:build(builder, tab, Side.Right)
		end
		return self
	end
	function Page:left(left)
		for _, child in left do
			local _exp = self.left_children
			table.insert(_exp, child)
		end
		return self
	end
	function Page:right(right)
		for _, child in right do
			local _exp = self.right_children
			table.insert(_exp, child)
		end
		return self
	end
	function Page:applySaveManager()
		return self
	end
	function Page:applyThemeManager()
		return self
	end
	function Page:title(title)
		self.name = title
		return self
	end
end
--[[
	*
	 * Represents a window.
	 
]]
local Window
do
	Window = setmetatable({}, {
		__tostring = function()
			return "Window"
		end,
	})
	Window.__index = Window
	function Window.new(...)
		local self = setmetatable({}, Window)
		return self:constructor(...) or self
	end
	function Window:constructor()
		self.configs = {}
		self.children = {}
	end
	function Window:build(builder, parent)
		local window = parent:CreateWindow(self.configs)
		for _, tab in self.children do
			tab:build(builder, window)
		end
		return self
	end
	function Window:pages(tabs)
		for _, tab in tabs do
			local _exp = self.children
			table.insert(_exp, tab)
		end
		return self
	end
	function Window:title(title)
		self.configs.Title = title
		return self
	end
	function Window:centered(center)
		self.configs.Center = center
		return self
	end
	function Window:autoShow(autoShow)
		self.configs.AutoShow = autoShow
		return self
	end
	function Window:withFadeTime(menuFadeTime)
		self.configs.MenuFadeTime = menuFadeTime
		return self
	end
end
--[[
	***********************************************************
	 * BUILDER
	 * Description: Builder class to construct the UI
	 ***********************************************************
]]
--[[
	*
	 * Builder class for UI
	 
]]
local Builder
do
	Builder = setmetatable({}, {
		__tostring = function()
			return "Builder"
		end,
	})
	Builder.__index = Builder
	function Builder.new(...)
		local self = setmetatable({}, Builder)
		return self:constructor(...) or self
	end
	function Builder:constructor()
		self._library = Library
		self._onAppear = {}
		self._root = ""
		self._name = ""
		self.children = {}
	end
	function Builder:renderUI()
		if not self._library then
			error("Library is not set!")
		end
		for _, window in self.children do
			window:build(self, self._library)
		end
		for _, callback in self._onAppear do
			task.defer(callback)
		end
		local _result = self._saveManager
		if _result ~= nil then
			_result:LoadAutoloadConfig()
		end
		return self
	end
	function Builder:windows(windows)
		for _, window in windows do
			local _exp = self.children
			table.insert(_exp, window)
		end
		return self
	end
	function Builder:library(library)
		self._library = library
		local _result = self._saveManager
		if _result ~= nil then
			_result:SetLibrary(library)
		end
		local _result_1 = self._themeManager
		if _result_1 ~= nil then
			_result_1:SetLibrary(library)
		end
		return self
	end
	function Builder:withSaveManager(saveManager)
		self._saveManager = saveManager
		local library = self._library
		if library then
			saveManager:SetLibrary(library)
		end
		saveManager:SetFolder(self._root .. "/" .. self._name)
		saveManager:IgnoreThemeSettings()
		return self
	end
	function Builder:withThemeManager(themeManager)
		self._themeManager = themeManager
		local library = self._library
		if library then
			themeManager:SetLibrary(library)
		end
		themeManager:SetFolder(self._root)
		return self
	end
	function Builder:root(root, name)
		self._root = root
		self._name = name
		local _result = self._saveManager
		if _result ~= nil then
			_result:SetFolder(root .. "/" .. name)
		end
		local _result_1 = self._themeManager
		if _result_1 ~= nil then
			_result_1:SetFolder(root)
		end
		return self
	end
end
return {
	Side = Side,
	KeyPicker = KeyPicker,
	ColorPicker = ColorPicker,
	Label = Label,
	Toggle = Toggle,
	Button = Button,
	Input = Input,
	Slider = Slider,
	Dropdown = Dropdown,
	MultiDropdown = MultiDropdown,
	Divider = Divider,
	DependencyBox = DependencyBox,
	Tab = Tab,
	Groupbox = Groupbox,
	Tabbox = Tabbox,
	ConfigSection = ConfigSection,
	ThemeSection = ThemeSection,
	Page = Page,
	Window = Window,
	Builder = Builder,
}
