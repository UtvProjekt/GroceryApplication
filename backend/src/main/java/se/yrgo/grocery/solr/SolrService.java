package se.yrgo.grocery.solr;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Response;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import se.yrgo.grocery.domain.Grocery;
import se.yrgo.grocery.exceptions.GroceryCouldNotBeAddedException;
import se.yrgo.grocery.exceptions.GroceryNotFoundException;
/**
 * 
 * Class for updating the solr database
 * Solr is a nosql document database
 *
 */
public class SolrService {
	private String baseUrl = "http://localhost:8983/";
	private String updateUrl = baseUrl + "solr/groceryApp/update";
	private String reloadUrl = baseUrl + "solr/admin/cores?action=RELOAD&core=groceryApp";
	private String deleteUrl = baseUrl + "solr/groceryApp/update?commit=true";
	private String baseGetUrl = baseUrl + "solr/groceryApp/select?indent=true&q.op=OR&sort=score%20desc";
	private static final Logger infoLogger = LogManager.getLogger("infoLogger");

	/**
	 * Adds new grocery to the database
	 * @param groceryToAdd Grocery to be added to the database
	 */
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
	/**
	 * reloads the solr database
	 * @return returns the response from solr
	 */
	public int reload() {
		infoLogger.info("Starting reload on solr data.");
		Client client = ClientBuilder.newClient();
		Response response = client.target(reloadUrl).request().buildGet().invoke();
		
		response.close();
		client.close();
		infoLogger.info("Ending reload on solr data.");
		return response.getStatus();
	}

	/**
	 * Deletes an item from the solr database
	 * @param id id of item to be removed
 	 */
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
	
	/**
	 * Gets data from solr database with a custom set of rows
	 * @return the filtered search
	 */
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
