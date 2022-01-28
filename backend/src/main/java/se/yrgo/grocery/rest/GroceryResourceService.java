package se.yrgo.grocery.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.jboss.resteasy.annotations.jaxrs.QueryParam;

import se.yrgo.grocery.domain.Grocery;
import se.yrgo.grocery.service.GroceryManagementImplementation;
import se.yrgo.grocery.service.GroceryManagementService;
import se.yrgo.grocery.solr.SolrRequest;

/**
 * Rest class for GroceryDataAccess methods
 * 
 *
 */
@Path("/grocery")
public class GroceryResourceService {
	
	private static final GroceryResourceService INSTANCE = new GroceryResourceService();
	private GroceryManagementService service = new GroceryManagementImplementation();

	private GroceryResourceService() {}
	
	/**
	 * makes class a singleton
	 * @return singleton
	 */
	public static GroceryResourceService getInstance() {
		return INSTANCE;
	}
	
	/**
	 * Searches for grocieres
	 * @param rows number of searches to return
	 * @param search search value
	 * @return json object of Grocery 
	 */
	@POST
	@Path("/searchforgroceries")
	@Produces("application/JSON")
	public String searchForSpecificAmountsOfGroceries(@QueryParam("rows") int rows, String search){
		SolrRequest solrRequest = new SolrRequest(search, rows);
		return service.searchForGroceries(solrRequest);
	}
	
	/**
	 * Gets all grocieres
	 * @return list of all groceries
	 */
	@GET
	@Path("/getallgroceries")
	@Produces("application/json")
	public List<Grocery> allGroceries(){
		return service.findAll();
	}
	
	/**
	 * Deletes a grocery
	 * @param id grocery id to delete
	 */
	@DELETE
	@Path("/deletegrocery/{id}")
	public void deleteGrocery(@PathParam("id") int id) {
		service.deleteGrocery(id);
	}
	
	/**
	 * Returns one grocery by id
	 * @param id id of grocery to return
	 * @return a grocery
	 */
	@GET
	@Path("{id}")
	@Produces("application/JSON")
	public Grocery getGroceryById(@PathParam("id")int id) {
		return service.findGroceryById(id);
	}
	
	/**
	 * Updates a grocery
	 * @param gro grocery object to update
	 */
	@POST
	@Path("/updategrocery")
	@Produces("application/JSON")
	@Consumes("application/JSON")
	public void updateGrocery(Grocery gro) {
		service.updateGrocery(gro);
	}
	
	/**
	 * Adds a grocery
	 * @param gro grocery to add
	 */
	@POST
	@Path("/addgrocery")
	@Produces("application/JSON")
	@Consumes("application/JSON")
	public void addGrocery(Grocery gro) {
		service.addGrocery(gro);
	}
	
	/**
	 * Filter groceries
	 * @param filter filter to filter by
	 * @return filtered list of grocieres
	 */
	@GET
	@Path("/filtergroceries/{filter}")
	@Produces("application/JSON")
	public List<Grocery> searchWithFilter(@PathParam("filter") String filter){
		System.out.println("kommer in rätt");
		return service.searchWithFilter(filter);
	}

}
