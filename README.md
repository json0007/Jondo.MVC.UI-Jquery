# Jondo.MVC.UI-Jquery
UI library for .net mvc and with jquery

Jondo.UI is my version of Kendo.UI. Kendo is too expensive and buggy imo. Their support is not good and nothing get's fixed. Collegues used to joke I should write my own, hence Jondo was born.  

This is meant to be an open source project. Feel free to use it as you wish.  

So far I have dropdowns, combo boxes, multiselects and advanced grids.  some bugs, but most things work.

Everything supports model binding 

Looking to add graphs, textboxes, buttons, themes.and whatever else I can think of.

The architecture for creating my HTMLComponents uses a simple builder pattern, qhich is pretty standard for .net mvc.  

The main entry point to building a component goes through the IHtmlHelper interface.  This allows you access to the Jondo class through an extension method similar to how kendo works.  The Jondo class contains getter methods gor getting the proper builder.  

examples can be found in the demo app home page.
