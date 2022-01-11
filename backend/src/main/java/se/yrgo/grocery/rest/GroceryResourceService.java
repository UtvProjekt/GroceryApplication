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
import se.yrgo.grocery.service.GroceryManagementServiceLocal;
import se.yrgo.grocery.solr.SolrRequest;


@Path("/grocery")
public class GroceryResourceService {
	
	private static final GroceryResourceService INSTANCE = new GroceryResourceService();
	private GroceryManagementServiceLocal service = new GroceryManagementImplementation();

	private GroceryResourceService() {}
	
	public static GroceryResourceService getInstance() {
		return INSTANCE;
	}
	
	@POST
	@Path("/searchforgroceries")
	@Produces("application/JSON")
	public String searchForSpecificAmountsOfErrors(@QueryParam("rows") int rows, String search){
		SolrRequest solrRequest = new SolrRequest(search, rows);
		return service.searchForGroceries(solrRequest);
	}
	
	@GET
	@Path("/getallgroceries")
	@Produces("application/json")
	public List<Grocery> allGroceries(){
		return service.findAll();
	}
	
	@DELETE
	@Path("/deletegrocery/{id}")
	public void deleteGrocery(@PathParam("id") int id) {
		service.deleteGrocery(id);
	}
	
	@GET
	@Path("{id}")
	@Produces("application/JSON")
	public Grocery getGroceryById(@PathParam("id")int id) {
		return service.findGroceryById(id);
	}
	
	
	@POST
	@Path("/updategrocery")
	@Produces("application/JSON")
	@Consumes("application/JSON")
	public void updateGrocery(Grocery gro) {
		service.updateGrocery(gro);
	}
	
	@POST
	@Path("/addgrocery")
	@Produces("application/JSON")
	@Consumes("application/JSON")
	public void addGrocery(Grocery gro) {
		service.addGrocery(gro);
	}

}
