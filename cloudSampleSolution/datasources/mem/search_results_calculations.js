/**
 * @properties={type:12,typeid:36,uuid:"24D589C0-9449-4F50-84F9-B19EBB92B716"}
 */
function iconStyleClass()
{
	switch (table_name) {
	case "customers":
		return "icon-contacts";
		break;
	case "orders":
		return "icon-box";
		break;
	default:
		return "fas fa-question"
		break;
	}
}
