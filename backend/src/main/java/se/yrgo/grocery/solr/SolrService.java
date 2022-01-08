package se.yrgo.grocery.solr;

public class SolrService {
	private String baseUrl = "http://localhost:8983/";
	private String updateUrl = baseUrl + "solr/groceryApp/update";
	private String reloadUrl = baseUrl + "solr/admin/cores?action=RELOAD&core=groceryApp";
	private String deleteUrl = baseUrl + "solr/groceryApp/update?commit=true";























}
