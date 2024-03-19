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
	function Extension:setIndex(idx)
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
		self.default = "Delete"
		self.syncToggleState = false
		self.mode = "Toggle"
		self.title = ""
		self.noUI = false
		self.callback = function() end
		self.changedCallback = function() end
	end
	function KeyPicker:build(parent)
		parent:AddKeyPicker(self.idx, {
			Default = self.default,
			SyncToggleState = self.syncToggleState,
			Mode = self.mode,
			Text = self.title,
			NoUI = self.noUI,
			Callback = self.callback,
			ChangedCallback = self.changedCallback,
		})
		return self
	end
	function KeyPicker:setBind(value)
		self.default = value
		return self
	end
	function KeyPicker:setSyncToggleState(syncToggleState)
		self.syncToggleState = syncToggleState
		return self
	end
	function KeyPicker:setMode(mode)
		self.mode = mode
		return self
	end
	function KeyPicker:setTitle(title)
		self.title = title
		return self
	end
	function KeyPicker:setNoUI(noUI)
		self.noUI = noUI
		return self
	end
	function KeyPicker:onCallback(callback)
		self.callback = callback
		return self
	end
	function KeyPicker:onKeybind(callback)
		self.changedCallback = callback
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
		self.default = Color3.new(1, 1, 1)
		self.title = ""
		self.callback = function() end
	end
	function ColorPicker:build(parent)
		parent:AddColorPicker(self.idx, {
			Default = self.default,
			Title = self.title,
			Transparency = self.transparency,
			Callback = self.callback,
		})
		return self
	end
	function ColorPicker:setValue(value)
		self.default = value
		return self
	end
	function ColorPicker:setTitle(title)
		self.title = title
		return self
	end
	function ColorPicker:setTransparency(transparency)
		self.transparency = transparency
		return self
	end
	function ColorPicker:onCallback(callback)
		self.callback = callback
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
	function Element:setIndex(idx)
		self.idx = idx
		return self
	end
end
--[[
	*
	 * Abstract base class for elements with extensions.
	 
]]
local BaseExtensions
do
	local super = Element
	BaseExtensions = setmetatable({}, {
		__tostring = function()
			return "BaseExtensions"
		end,
		__index = super,
	})
	BaseExtensions.__index = BaseExtensions
	function BaseExtensions:constructor(...)
		super.constructor(self, ...)
		self.addons = {}
	end
	function BaseExtensions:extensions(extensions)
		for _, extension in extensions do
			local _exp = self.addons
			table.insert(_exp, extension)
		end
		return self
	end
end
--[[
	*
	 * Represents a label element.
	 
]]
local Label
do
	local super = BaseExtensions
	Label = setmetatable({}, {
		__tostring = function()
			return "Label"
		end,
		__index = super,
	})
	Label.__index = Label
	function Label.new(...)
		local self = setmetatable({}, Label)
		return self:constructor(...) or self
	end
	function Label:constructor(...)
		super.constructor(self, ...)
		self.text = ""
		self.doesWrap = false
	end
	function Label:build(builder, parent)
		local label = parent:AddLabel(self.text, self.doesWrap)
		for _, addon in self.addons do
			addon:build(label)
		end
		return self
	end
	function Label:setText(text)
		self.text = text
		return self
	end
	function Label:setWrap(wrap)
		self.doesWrap = wrap
		return self
	end
end
--[[
	*
	 * Represents a toggle element.
	 
]]
local Toggle
do
	local super = BaseExtensions
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
		self.title = ""
		self.tooltip = ""
		self.default = false
		self.callback = function() end
	end
	function Toggle:build(builder, parent)
		local toggle = parent:AddToggle(self.idx, {
			Text = self.title,
			Default = self.default,
			Tooltip = self.tooltip,
			Callback = self.callback,
		})
		for _, addon in self.addons do
			addon:build(toggle)
		end
		return self
	end
	function Toggle:setTitle(name)
		self.title = name
		return self
	end
	function Toggle:setTooltip(tooltip)
		self.tooltip = tooltip
		return self
	end
	function Toggle:setValue(value)
		self.default = value
		return self
	end
	function Toggle:onCallback(callback)
		self.callback = callback
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
		self.title = ""
		self.tooltip = ""
		self.doubleClick = false
		self.func = function() end
	end
	function Button:build(builder, parent)
		parent:AddButton({
			Text = self.title,
			Func = self.func,
			DoubleClick = self.doubleClick,
			Tooltip = self.tooltip,
		})
		return self
	end
	function Button:setTitle(title)
		self.title = title
		return self
	end
	function Button:setTooltip(tooltip)
		self.tooltip = tooltip
		return self
	end
	function Button:setDoubleClick(doubleClick)
		self.doubleClick = doubleClick
		return self
	end
	function Button:onClick(func)
		self.func = func
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
		self.title = ""
		self.tooltip = ""
		self.default = ""
		self.placeholder = ""
		self.numeric = false
		self.finished = false
		self.callback = function() end
	end
	function Input:build(builder, parent)
		parent:AddInput(self.idx, {
			Default = self.default,
			Numeric = self.numeric,
			Finished = self.finished,
			Text = self.title,
			Tooltip = self.tooltip,
			Placeholder = self.placeholder,
			MaxLength = self.maxLength,
			Callback = self.callback,
		})
		return self
	end
	function Input:setTitle(title)
		self.title = title
		return self
	end
	function Input:setTooltip(tooltip)
		self.tooltip = tooltip
		return self
	end
	function Input:setValue(value)
		self.default = value
		return self
	end
	function Input:setPlaceholder(placeholder)
		self.placeholder = placeholder
		return self
	end
	function Input:setNumeric(numeric)
		self.numeric = numeric
		return self
	end
	function Input:setFinished(finished)
		self.finished = finished
		return self
	end
	function Input:setMaxLength(maxLength)
		self.maxLength = maxLength
		return self
	end
	function Input:onCallback(callback)
		self.callback = callback
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
		self.title = ""
		self.default = 0
		self.min = 0
		self.max = 1
		self.rounding = 2
		self.suffix = ""
		self.compact = false
		self.hideMax = false
		self.callback = function() end
	end
	function Slider:build(builder, parent)
		parent:AddSlider(self.idx, {
			Text = self.title,
			Default = self.default,
			Min = self.min,
			Max = self.max,
			Rounding = self.rounding,
			Suffix = self.suffix,
			Compact = self.compact,
			HideMax = self.hideMax,
			Callback = self.callback,
		})
		return self
	end
	function Slider:setTitle(title)
		self.title = title
		return self
	end
	function Slider:setValue(value)
		self.default = value
		return self
	end
	function Slider:setMin(min)
		self.min = min
		return self
	end
	function Slider:setMax(max)
		self.max = max
		return self
	end
	function Slider:setRounding(rounding)
		self.rounding = rounding
		return self
	end
	function Slider:setSuffix(suffix)
		self.suffix = suffix
		return self
	end
	function Slider:setCompact(compact)
		self.compact = compact
		return self
	end
	function Slider:setHideMax(hideMax)
		self.hideMax = hideMax
		return self
	end
	function Slider:onCallback(callback)
		self.callback = callback
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
		self.title = ""
		self.tooltip = ""
		self.values = {}
		self.default = 1
		self.allowNull = false
		self.callback = function() end
	end
	function Dropdown:build(builder, parent)
		parent:AddDropdown(self.idx, {
			Text = self.title,
			Tooltip = self.tooltip,
			Values = self.values,
			Default = self.default,
			Multi = false,
			AllowNull = self.allowNull,
			SpecialType = self.specialType,
			Callback = self.callback,
		})
		return self
	end
	function Dropdown:setTitle(title)
		self.title = title
		return self
	end
	function Dropdown:setTooltip(tooltip)
		self.tooltip = tooltip
		return self
	end
	function Dropdown:setOptions(options)
		self.values = options
		return self
	end
	function Dropdown:setValue(value)
		self.default = value
		return self
	end
	function Dropdown:setAllowNull(allowNull)
		self.allowNull = allowNull
		return self
	end
	function Dropdown:setSpecialType(specialType)
		self.specialType = specialType
		return self
	end
	function Dropdown:onCallback(callback)
		self.callback = callback
		return self
	end
end
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
		self.title = ""
		self.tooltip = ""
		self.values = {}
		self.default = {}
		self.allowNull = false
		self.callback = function() end
	end
	function MultiDropdown:build(builder, parent)
		local _fn = parent
		local _exp = self.idx
		local _object = {
			Text = self.title,
			Tooltip = self.tooltip,
			Values = self.values,
		}
		local _left = "Default"
		local _condition = self.default[1]
		if _condition == nil then
			_condition = self.values[1]
		end
		_object[_left] = _condition
		_object.Multi = true
		_object.AllowNull = self.allowNull
		_object.SpecialType = self.specialType
		_object.Callback = self.callback
		local dropdown = _fn:AddDropdown(_exp, _object)
		local _fn_1 = dropdown
		local _set = {}
		for _, _v in self.default do
			_set[_v] = true
		end
		_fn_1:SetValue(_set)
		return self
	end
	function MultiDropdown:setTitle(title)
		self.title = title
		return self
	end
	function MultiDropdown:setTooltip(tooltip)
		self.tooltip = tooltip
		return self
	end
	function MultiDropdown:setOptions(options)
		self.values = options
		return self
	end
	function MultiDropdown:setValue(value)
		self.default = value
		return self
	end
	function MultiDropdown:setAllowNull(allowNull)
		self.allowNull = allowNull
		return self
	end
	function MultiDropdown:setSpecialType(specialType)
		self.specialType = specialType
		return self
	end
	function MultiDropdown:onCallback(callback)
		self.callback = callback
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
		self.dependent = ""
		self.state = true
	end
	function DependencyBox:build(builder, parent)
		local box = parent:AddDependencyBox()
		for _, child in self.children do
			child:build(builder, box)
		end
		local _onAppear = builder.onAppear
		local _self = self
		_onAppear[_self] = function()
			return box:SetupDependencies({ Toggles[self.dependent], self.state })
		end
		return self
	end
	function DependencyBox:setDependency(idx, state)
		self.dependent = idx
		self.state = state
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
	function Tab:setName(name)
		self.name = name
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
	function Groupbox:setName(name)
		self.name = name
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
	function Page:setName(name)
		self.name = name
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
	function Window:setTitle(title)
		self.configs.Title = title
		return self
	end
	function Window:setCenter(center)
		self.configs.Center = center
		return self
	end
	function Window:setAutoShow(autoShow)
		self.configs.AutoShow = autoShow
		return self
	end
	function Window:setMenuFadeTime(menuFadeTime)
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
		self.library = Library
		self.onAppear = {}
		self.children = {}
	end
	function Builder:renderUI()
		for _, window in self.children do
			window:build(self, self.library)
		end
		for _, callback in self.onAppear do
			task.defer(callback)
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
	function Builder:setLibrary(library)
		self.library = library
		return self
	end
	function Builder:setSaveManager(saveManager)
		self.saveManager = saveManager
		return self
	end
	function Builder:setThemeManager(themeManager)
		self.themeManager = themeManager
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
	DependencyBox = DependencyBox,
	Tab = Tab,
	Groupbox = Groupbox,
	Tabbox = Tabbox,
	Page = Page,
	Window = Window,
	Builder = Builder,
}
