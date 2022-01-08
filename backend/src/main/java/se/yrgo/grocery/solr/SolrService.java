package se.yrgo.grocery.solr;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Response;

import se.yrgo.grocery.domain.Grocery;

public class SolrService {
	private String baseUrl = "http://localhost:8983/";
	private String updateUrl = baseUrl + "solr/groceryApp/update";
	private String reloadUrl = baseUrl + "solr/admin/cores?action=RELOAD&core=groceryApp";
	private String deleteUrl = baseUrl + "solr/groceryApp/update?commit=true";

	public int addNewGroceryItem(Grocery groceryToAdd) {
		
		Grocery[] errorMessageArray = {groceryToAdd};
		Client client = ClientBuilder.newClient();
		
		Response response = client.target(updateUrl).request().buildPost(Entity.json(errorMessageArray)).invoke();
		
		response.close();
		client.close();
		return response.getStatus();
	}
	
	public int reload() {
		Client client = ClientBuilder.newClient();
		Response response = client.target(reloadUrl).request().buildGet().invoke();
		
		response.close();
		client.close();
		return response.getStatus();
	}

	public int deleteGroceryItem(int id) {
		Client client = ClientBuilder.newClient();
		String delete = "{\"delete\": {\"id\":\"" + id + "\"}}";
		Response response = client.target(deleteUrl).request().buildPost(Entity.json(delete)).invoke();
		System.out.println(response.getStatus() + " " + response.getStatusInfo());
		
		response.close();
		client.close();
		return response.getStatus();
	}

}
