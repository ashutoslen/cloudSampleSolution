/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2FC5DFA6-DF00-4348-ADEF-D5616B43658E"}
 */
var primaryColor = "#4880FF";
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7647C735-1B80-45A6-B647-95C68B943EED"}
 */
var secondaryColor = "#FFFFFF";
/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9D9B8126-95CB-42C0-A57B-7DD8DED33126"}
 */
function onLoad(event) {
	
		var propMainColor = scopes.svyProperties.getUserPropertyValue("MAIN-COLOR", "style")
		if (propMainColor) {
			primaryColor = propMainColor;
		}
		
		var propSecondaryColor = scopes.svyProperties.getUserPropertyValue("SECONDARY-COLOR", "style")
		if (propSecondaryColor) {
			secondaryColor = propSecondaryColor;
		}
	
}
/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"6F83E6C8-DAEA-4032-8163-1B3EF1ABB76E"}
 */
function onActionReset(event) {
	primaryColor = "#4880FF";
	secondaryColor = "#FFFFFF";
	
	scopes.svyProperties.setUserProperty("MAIN-COLOR", "style", primaryColor);
	scopes.svyProperties.setUserProperty("SECONDARY-COLOR", "style", secondaryColor);
	
	scopes.cloudSample.overrideStyleColors(primaryColor, secondaryColor);
}
/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"688FF236-4E2A-4AB7-8EA3-A5DC723C2B0D"}
 */
function onActionApplyColors(event) {

	scopes.svyProperties.setUserProperty("MAIN-COLOR", "style", primaryColor);
	scopes.svyProperties.setUserProperty("SECONDARY-COLOR", "style", secondaryColor);
	
	scopes.cloudSample.overrideStyleColors(primaryColor, secondaryColor);
}
