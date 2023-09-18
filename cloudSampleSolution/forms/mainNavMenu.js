/**
 * @private
 * @properties={typeid:35,uuid:"558A8867-3E29-4342-876A-7839750BAE8A",variableType:-4}
 */
var NAVBAR_ACTIONS = {
	DOWNLOAD_IDE: "download-ide",
	PRIMARY_COLOR: "primary-color"
};
/**
 * @properties={typeid:24,uuid:"79BB6E23-90D3-41DF-8591-69B474539D75"}
 * @override
 */
function loadMenuItems() {

	/** @type {CustomType<servoyextra-sidenav.MenuItem>} */
	var menuItem;
	var menuItems = [];
	var menuSubItem;
	var menuSubItems = [];

	// HOME
	menuItem = new Object();
	menuItem.id = "homeDashboard";
	menuItem.text = "DASHBOARD"
	menuItem.iconStyleClass = "fa fa-th-large";
	menuItems.push(menuItem);

	// CUSTOMERS
	menuItem = new Object();
	menuItem.id = "customersTableView";
	menuItem.text = "CUSTOMERS"
	menuItem.iconStyleClass = "icon-contacts";
	menuItems.push(menuItem);

	// ORDERS
	menuItem = new Object();
	menuItem.id = "ordersTableView";
	menuItem.text = "ORDERS"
	menuItem.iconStyleClass = "icon-box";
	menuItems.push(menuItem);
	
	// DOCUMENT EDITOR
	menuItem = new Object();
	menuItem.id = "documentEditor";
	menuItem.text = "DOCUMENT EDITOR"
	menuItem.iconStyleClass = "far fa-file-alt";
	menuItems.push(menuItem);

	// SECURITY
	menuItem = new Object();
	menuItem.id = scopes.svySecurityUX.SVY_SECURITY_UX.TENANT;
	menuItem.text = "SECURITY"
	menuItem.iconStyleClass = "fas fa-shield-alt";
//
	menuSubItem = new Object();
	menuSubItem.id = scopes.svySecurityUX.SVY_SECURITY_UX.TENANT_ROLES;
	menuSubItem.text = "ROLES"
	menuSubItem.iconStyleClass = "fa fa-user-shield";
	menuSubItems.push(menuSubItem);

	menuSubItem = new Object();
	menuSubItem.id = scopes.svySecurityUX.SVY_SECURITY_UX.TENANT_USERS;
	menuSubItem.text = "USERS"
	menuSubItem.iconStyleClass = "fa fa-user-shield";
	menuSubItems.push(menuSubItem);

	menuItem.menuItems = menuSubItems;
	menuItems.push(menuItem);
	
	// DIVIDER
	menuItem = new Object();
	menuItem.isDivider = true;
	menuItems.push(menuItem);
	
	// TUTORIAL
	menuItem = new Object();
	menuItem.id = "TUTORIAL";
	menuItem.text = "TUTORIAL"
	menuItem.styleClass = "font-weight-bold"
	menuItem.iconStyleClass = "fas fa-graduation-cap";
	menuItems.push(menuItem);

	// DIVIDER
	menuItem = new Object();
	menuItem.isDivider = true;
	menuItems.push(menuItem);
	
	return menuItems;
}
/**
 * @return {Array<CustomType<bootstrapextracomponents-navbar.menuItem>>}
 * @protected
 * @properties={typeid:24,uuid:"59EC7D34-0628-4B00-A8FB-2BAC9A923969"}
 * @override
 */
function loadNavbarItems() {
	var menuItems = [];
	/** @type {CustomType<bootstrapextracomponents-navbar.menuItem>} */
	var menuItem;

	menuItem = elements.navbar.createMenuItem('Download IDE', NAVBAR_ACTIONS.DOWNLOAD_IDE, 'RIGHT');
	menuItem.displayType = 'MENU_ITEM';
	menuItem.styleClass = 'btn-download-ide btn-round border-default margin-10';
	menuItem.iconName = "icon-cloud-download";
	menuItems.push(menuItem);

	menuItem = elements.navbar.createMenuItem('Search', DEFAULT_NAVBAR_ACTIONS.SEARCH, 'RIGHT');
	menuItem.displayType = 'INPUT_GROUP';
	menuItem.styleClass = 'closed searchbar';
	menuItem.inputButtonStyleClass = "btn-default";
	menuItem.iconName = "fa fa-search";
	menuItems.push(menuItem);

	if (security.getUserName()) {
		menuItem = elements.navbar.createMenuItem(security.getUserName(), DEFAULT_NAVBAR_ACTIONS.USER, 'RIGHT');
		menuItem.displayType = 'MENU_ITEM';
		menuItem.iconName = 'fas fa-user';
		menuItem.styleClass = 'no-border';
		var submenuItems = [];

		var primaryColor = elements.navbar.createMenuItem('Primary Colors', NAVBAR_ACTIONS.PRIMARY_COLOR);
		primaryColor.iconName = "fas fa-square text-primary border-default border-radius";
		submenuItems.push(primaryColor);

		var logout = elements.navbar.createMenuItem('Logout', DEFAULT_NAVBAR_ACTIONS.LOGOUT);
		//logout.iconName = "fas fa-sign-out-alt";
		submenuItems.push(logout);
		menuItem.subMenuItems = submenuItems;
		menuItems.push(menuItem);
	}

	return menuItems;
}
/**
 * @protected 
 * @param menuItemId
 * @param event
 * @return {Boolean}
 * 
 * @properties={typeid:24,uuid:"DD745D0D-6D70-4B7B-A945-1BED7BCE5C2B"}
 * @override
 */
function onMenuItemSelected(menuItemId,event) {
	
	if (menuItemId === "TUTORIAL") {
		scopes.tutorial.showTutorial()
		return false;
	}
	
	return true;
}
/**
 * @protected
 * @param {JSEvent} event
 * @param menuItem
 *
 * @properties={typeid:24,uuid:"A8C04063-8118-440C-A33E-29FB327D4C4C"}
 * @override
 */
function onNavbarMenuItemClicked(event, menuItem) {
	application.output('xxxxxxxxxxxxxxx');
	switch (menuItem.itemId) {
	case NAVBAR_ACTIONS.DOWNLOAD_IDE:
		application.showURL('https://www.servoy.com/download/', '_blank');
		break;
	case NAVBAR_ACTIONS.PRIMARY_COLOR:

		var popup = plugins.window.createFormPopup(forms.colorPicker);
		popup.x(event.getX());
		popup.y(event.getY());
		popup.show();

		break;
	default:
		break;
	}

}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"B6AAF9C2-4FBE-4AB7-BB57-E0EE57653D44"}
 * @override
 */
function onLoad(event) {
	_super.onLoad(event);

	// register for search event
	scopes.svyNavigationUX.addGlobalSearchListener(onSearch);
}

/**
 * @AllowToRunInFind
 * 
 * @protected
 * @param {String} txt
 *
 * @properties={typeid:24,uuid:"B70EDA36-FDA1-47C5-A659-D8132B47DB01"}
 */
function onSearch(txt) {
	// show search view lookup
	var lookup = scopes.svyLookup.createLookup(datasources.mem.search_results.getDataSource());
	lookup.setLookupForm(forms.searchViewLookup);
	lookup.addField("").setSearchable(false).setStyleClass("text-center fa-2x").setStyleClassDataprovider("iconStyleClass").setWidth("50");
	lookup.addField("text_value").setTitleText("RESULT");
	
	// show the lookup as popup popup
	var popup = lookup.createPopUp(onSearchLookup1, txt);
	popup.y(86);
	popup.x(application.getWindow().getWidth() - 501);
	popup.width(500);
	popup.show();
}
/**
* @protected 
 * @param {Array<JSRecord<mem:search_results>>} records
 * @param values
 * @param lookup
 *
 * @properties={typeid:24,uuid:"AA953ED4-9CE4-4775-B421-336D5CEBB3F8"}
 */
function onSearchLookup1(records, values, lookup) {

	// handle search lookup selection
	if (records && records.length) {
		
		var record = records[0];

		switch (record.table_name) {
		case "customers":
			// navigate to customer
			var customerRecord = scopes.svyDataUtils.getRecord(datasources.db.example_data.customers.getDataSource(), [record.pks]);
			scopes.global.showForm(forms.customerView, customerRecord, scopes.svyNavigation.NAVIGATION_SELECTION_TYPE.LOAD_RECORDS);
			break;
		case "orders":
			// navigate to customer's order
			var orderRecord = scopes.svyDataUtils.getRecord(datasources.db.example_data.orders.getDataSource(), [record.pks]);
			scopes.global.showForm(forms.orderEdit, orderRecord, scopes.svyNavigation.NAVIGATION_SELECTION_TYPE.LOAD_RECORDS);
			break;
		default:
		}
	}
}
