/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C90EF565-CA8C-44BB-AB9B-82D67CE7BF28"}
 */
var SAMPLE_APPLICATION_VERSION = "1.0.0";
/**
 * @properties={typeid:35,uuid:"04E78327-3B56-4FF2-BFF8-960DF1BCDF19",variableType:-4}
 */
var DEFAULT_COLORS = {
	'MAIN-COLOR': '#4880FF',
	'SECONDARY-COLOR': '#FFF'
};
/**
 * TODO generated, please specify type and doc for the params
 * @param arg
 * @param queryParams
 *
 * @properties={typeid:24,uuid:"9C3392AB-D26A-4D3F-8F1C-4BE5AA27D3B6"}
 */
function onSolutionOpen(arg, queryParams) {
	
	// autosave false
	databaseManager.setAutoSave(false);
	
	// disable null check validation exception
	databaseManager.nullColumnValidatorEnabled = false;

	// global config for grids
	configGrid();
	
	// global config for grid filters
	scopes.svyToolbarFilter.setPopupDefaultOperator(scopes.svyToolbarFilter.FILTER_TYPES.TOKEN, scopes.svyPopupFilter.OPERATOR.LIKE);

	// run onAfterUserCreate when a user is created from the svySecurityUX templates
	scopes.svySecurityUX.addAfterUserCreateListener(onAfterUserCreate);
	
	// apply custom style at the onOpen
	overrideSolutionStyle();
	
	// reference FA for load
	plugins.fontawesomeLib.load();

	// update sample data to last year
	scopes.cloudSampleData.updateOrderDates();
	
	// init navigation first-item
	scopes.global.showForm(forms.homeDashboard);
}
/**
 * @properties={typeid:24,uuid:"A1CD383D-BE83-4EE6-9BAE-4558A70077F2"}
 */
function configGrid() {
	// configure grid globally, for common styles

	// set up grid options
	plugins.ngDataGrid.gridOptions = {
		headerHeight: 10,
		rowHeight: 52
	}
	
	// set up default column properties
	plugins.ngDataGrid.columnOptions = {
		menuTabs: ['generalMenuTab']
	}

	// set up tool panel options
	var toolPanelOptions = plugins.ngDataGrid.createToolPanelConfig();
	toolPanelOptions.suppressColumnFilter = true;
	toolPanelOptions.suppressColumnSelectAll = true;
	toolPanelOptions.suppressRowGroups = true;
	plugins.ngDataGrid.toolPanelConfig = toolPanelOptions;

	// set up grid icons
	var icons = plugins.ngDataGrid.createIconConfig();
	icons.iconSortAscending = "fa fa-long-arrow-up";
	icons.iconSortDescending = "fa fa-long-arrow-down";
	icons.iconFilter = "fa fa-filter";

	//	icons.iconCheckboxChecked = "fa fa-check-square-o";
	//	icons.iconCheckboxUnchecked = "fa fa-square-o";
	//	icons.iconCheckboxIndeterminate = "fa fa-minus-square-o";

	plugins.ngDataGrid.iconConfig = icons;
}
/**
 * TODO generated, please specify type and doc for the params
 * @param userName
 * @param tenantName
 *
 * @properties={typeid:24,uuid:"71D02E6A-8CE2-4D34-A3E2-30C1C6ABCF0A"}
 */
function onAfterUserCreate(userName, tenantName) {
	var user = scopes.svySecurity.getUser(userName, tenantName);
	if (scopes.modelUsers.sendRegistrationEmail(user)) {
		plugins.webnotificationsToastr.success("An invitation email has been sent to the new user " + userName, "Invitation sent");
	}
}
/**
 * @properties={typeid:24,uuid:"BE626F9B-6007-4CF7-A13E-59846D4A3B56"}
 */
function overrideSolutionStyle() {
	
	var mainColor = DEFAULT_COLORS['MAIN-COLOR'];
	var secondaryColor = DEFAULT_COLORS['SECONDARY-COLOR'];
	

	var propMainColor = scopes.svyProperties.getUserPropertyValue("MAIN-COLOR", "style")
	if (propMainColor) {
		mainColor = propMainColor;
	}

	var propSecondaryColor = scopes.svyProperties.getUserPropertyValue("SECONDARY-COLOR", "style")
	if (propSecondaryColor) {
		secondaryColor = propSecondaryColor;
	}

	overrideStyleColors(mainColor, secondaryColor);
}
/**
 * TODO generated, please specify type and doc for the params
 * @param mainColor
 * @param secondaryColor
 *
 * @properties={typeid:24,uuid:"59196A05-AF0E-4CF6-8248-F47666038CE6"}
 */
function overrideStyleColors(mainColor, secondaryColor) {
	var newColorStyle = {
		'MAIN-COLOR': mainColor,
		'SECONDARY-COLOR': secondaryColor
	}

	// set the preferred colors
	var mediaOriginal = solutionModel.getMedia('cloudSampleTemplateOriginal.less');
	var cssText = mediaOriginal.getAsString();

	// override css
	cssText = utils.stringReplaceTags(cssText, newColorStyle);
	var media = solutionModel.getMedia('cloudSampleTemplate.less');
	media.setAsString(cssText);

	application.overrideStyle('cloudSampleSolution.less', 'cloudSampleTemplate.less');
}
/**
 * @properties={typeid:24,uuid:"A9E5E6C7-FAC7-4A17-ACAD-937B5527D28B"}
 */
function getDefaultDocumentTemplate() {
	var content = '<figure class="image image-style-align-left"><img src="https://docs.google.com/drawings/u/2/d/sqTY9PPHoJ_grubeHm0JXUQ/image?w=816&amp;h=209&amp;rev=12&amp;ac=1&amp;parent=1chvZaE9c3etg_-hovDYZxouocPvBTfLQuOma-vSK2xA"></figure><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><h2><span class="mention svy-mention" data-mention="#customers.Company" data-real-value="orders_to_customers.companyname" contenteditable="true">#customers.Company</span>&nbsp;</h2><h4><span style="background-color:transparent;color:#31394d;">COMPANY ADDRESS</span></h4><h4><span class="mention svy-mention" data-mention="#Address" data-real-value="displayAddress" contenteditable="true">#Address</span>&nbsp;</h4><p>&nbsp;</p><h3><span style="background-color:transparent;color:#31394d;">Order &nbsp;<span class="mention svy-mention" data-mention="#orders.OrderId" data-real-value="orderid" contenteditable="true">#orders.OrderId</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></h3><p><i>Date</i>: <span class="mention svy-mention" data-mention="#Order Date" data-real-value="orderdate" contenteditable="true">#Order Date</span>&nbsp;</p><p><i>Status</i>: <span class="mention svy-mention" data-mention="#Status" data-real-value="orderStatus" contenteditable="true">#Status</span>&nbsp;</p><p><i>Total</i>: &nbsp;$ <span class="mention svy-mention" data-mention="#Total" data-real-value="order_total" contenteditable="true">#Total</span>&nbsp;</p><p><span style="background-color:transparent;color:#31394d;"><span class="mention svy-mention" data-mention="$startRepeater.OrderDetails" data-real-value="startRepeater-orders_to_order_details" contenteditable="true">$startRepeater.OrderDetails</span>&nbsp;</span></p><figure class="table"><table><thead><tr><th>ITEM</th><th>&nbsp; &nbsp; &nbsp;QTY</th><th>&nbsp; &nbsp; &nbsp;PRICE</th><th>&nbsp; &nbsp; &nbsp;SUBTOTAL</th></tr></thead><tbody><tr><td style="border-bottom:0.75pt solid #f3f3f3;border-left:0.75pt solid #f3f3f3;border-right:0.75pt solid #f3f3f3;border-top:0.75pt solid #f3f3f3;padding:2pt;"><p style="margin-left:6pt;"><span class="mention svy-mention" data-mention="#products.Product" data-real-value="orders_to_order_details.order_details_to_products.productname" contenteditable="true">#products.Product</span>&nbsp;</p></td><td style="border-bottom:0.75pt solid #f3f3f3;border-left:0.75pt solid #f3f3f3;border-right:0.75pt solid #f3f3f3;border-top:0.75pt solid #f3f3f3;padding:2pt;"><p style="text-align:right;"><span class="mention svy-mention" data-mention="#order_details.Quantity" data-real-value="orders_to_order_details.quantity" contenteditable="true">#order_details.Quantity</span>&nbsp;</p></td><td style="border-bottom:0.75pt solid #f3f3f3;border-left:0.75pt solid #f3f3f3;border-right:0.75pt solid #f3f3f3;border-top:0.75pt solid #f3f3f3;padding:2pt;"><p style="text-align:right;"><span class="mention svy-mention" data-mention="#order_details.Price" data-real-value="orders_to_order_details.price" contenteditable="true">#order_details.Price</span>&nbsp;</p></td><td style="border-bottom:0.75pt solid #f3f3f3;border-left:0.75pt solid #f3f3f3;border-right:0.75pt solid #f3f3f3;border-top:0.75pt solid #f3f3f3;padding:2pt;"><p style="text-align:right;">$ <span class="mention svy-mention" data-mention="#order_details.Subtotal" data-real-value="orders_to_order_details.subtotal" contenteditable="true">#order_details.Subtotal</span>&nbsp;</p></td></tr></tbody></table></figure><p><span class="mention svy-mention" data-mention="$endRepeater" data-real-value="" contenteditable="true">$endRepeater</span>&nbsp;</p>'
	return content;
}