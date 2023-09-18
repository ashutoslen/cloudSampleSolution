/**
 * TODO generated, please specify type and doc for the params
 * @public 
 * @param {RuntimeForm} form
 * @param {JSRecord|JSFoundSet|QBSelect} [dataToShow] The data to show for the given navigation item. The data is passed to the afterOpen event
 * @param {String} [dataSelectionType] Determine the type of selection in the target navigation item with the given dataToShow {@link scopes.svyNavigation.NAVIGATION_SELECTION_TYPE} enumeration options. The chosen selection type is passed to the afterOpen and needs to be implemented accordingly. Default NAVIGATION_SELECTION_TYPE.LOAD_RECORDS
 *
 * @properties={typeid:24,uuid:"E16B6DF9-1FA3-40C0-A3D0-A6EA6D15E1EA"}
 */
function showForm(form, dataToShow, dataSelectionType) {
	// Should i have similar method in svyNavigation, most of the time we open a form
	var item = scopes.svyNavigation.createNavigationItem(form.controller.getName());
	return scopes.svyNavigation.open(item, dataToShow, dataSelectionType);
}