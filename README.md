# Jondo.MVC.UI-Jquery
UI library for .net mvc and with jquery

This is meant to mimic Kendo.UI for MVC with Jquery. Kendo is too expensive and buggy imo. There support sucks and nothing get's fixed. Collegues used to joke I should write my own, hence Jondo was born.  

This is meant to be an open source project. Feel free to use it as you wish.  

It exists in two main parts.  Server side code, and client side code.  Server side code is responsible for creating UI elements and binding them to your MVC data model and client side code is responsible for how those elements react one they are created

Server Side Code

IHTMLHelper and the builder pattern

.NET MVC UI is reliant on the IHTMLHelper interface. This interface is what razor pages uses to create the UI elements. Elements are built using a builder pattern 
