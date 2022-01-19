package se.yrgo.grocery.solr;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Response;

import se.yrgo.grocery.domain.Grocery;
import se.yrgo.grocery.exceptions.GroceryCouldNotBeAddedException;
import se.yrgo.grocery.exceptions.GroceryNotFoundException;

public class SolrService {
	private String baseUrl = "http://localhost:8983/";
	private String updateUrl = baseUrl + "solr/groceryApp/update";
	private String reloadUrl = baseUrl + "solr/admin/cores?action=RELOAD&core=groceryApp";
	private String deleteUrl = baseUrl + "solr/groceryApp/update?commit=true";
	private String baseGetUrl = baseUrl + "solr/groceryApp/select?indent=true&q.op=OR&sort=score%20desc";

	public void addNewGroceryItem(Grocery groceryToAdd) {
		
		Grocery[] groceryArray = {groceryToAdd};
		Client client = ClientBuilder.newClient();
		
		Response response = client.target(updateUrl).request().buildPost(Entity.json(groceryArray)).invoke();
		
		response.close();
		client.close();
		
		
		if (response.getStatus() != 200) {
			throw new GroceryCouldNotBeAddedException();
		}	
	}
	
	public int reload() {
		Client client = ClientBuilder.newClient();
		Response response = client.target(reloadUrl).request().buildGet().invoke();
		
		response.close();
		client.close();
		return response.getStatus();
	}

	public void deleteGroceryItem(int id) {
		Client client = ClientBuilder.newClient();
		String delete = "{\"delete\": {\"id\":\"" + id + "\"}}";
		Response response = client.target(deleteUrl).request().buildPost(Entity.json(delete)).invoke();
		System.out.println(response.getStatus() + " " + response.getStatusInfo());
		
		response.close();
		client.close();
		
		if (response.getStatus() != 200) {
			throw new GroceryNotFoundException();
		}

	}
	public String get(String search, int rows){
		Client client = ClientBuilder.newClient();
		String getUrl = baseGetUrl + "&rows=" + rows + "&q=" + search;
		Response response = client.target(getUrl).request().buildGet().invoke();
		String data = response.readEntity(String.class);
		
		response.close();
		client.close();
		return data;
	}

}
