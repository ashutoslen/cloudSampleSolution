/**
 * TODO generated, please specify type and doc for the params
 * @param txt
 *
 * @properties={typeid:24,uuid:"09C7B6AD-93B3-4738-BDDC-D03D9B7899EA"}
 * @override
 */
function search(txt) {
	
	// load all records if no input
	if (!txt) {
		return;
	}

	// create search object
	var customerSearch = scopes.svySearch.createSimpleSearch(datasources.db.example_data.customers.getDataSource());
	customerSearch.addSearchProvider("companyname");
	customerSearch.setSearchText(txt);
	
	/** @type {QBSelect<db:/example_data/customers>} */
	var customerQuery = customerSearch.getQuery();
	customerQuery.result.clear();
	customerQuery.result.addValue("customers", "table_name");
	customerQuery.result.add(customerQuery.columns.customerid, "pks");
	customerQuery.result.add(customerQuery.columns.companyname, "text_value");

	// create search object
	var orderSearch = scopes.svySearch.createSimpleSearch(datasources.db.example_data.orders.getDataSource());
	orderSearch.addSearchProvider("orderid");
	orderSearch.addSearchProvider("orders_to_customers.companyname").setAlias("companyname");
	orderSearch.setSearchText(txt);
	
	/** @type {QBSelect<db:/example_data/orders>} */
	var orderQuery = orderSearch.getQuery();
	orderQuery.result.clear();
	orderQuery.result.addValue("orders", "table_name");
	orderQuery.result.add(orderQuery.columns.orderid, "pks");
	orderQuery.result.add(orderQuery.columns.orderid.cast(QUERY_COLUMN_TYPES.TYPE_STRING).concat(" - ").concat(orderQuery.joins.orders_to_customers.columns.companyname), "text_value");
	
	var customerDataset = databaseManager.getDataSetByQuery(customerQuery, 50);
	var orderDataset = databaseManager.getDataSetByQuery(orderQuery, 50);

	var dataset = scopes.svyDataUtils.concatenateJSDataSets(customerDataset, orderDataset);
	dataset.createDataSource("search_results");

	foundset.sort("table_name asc");
}