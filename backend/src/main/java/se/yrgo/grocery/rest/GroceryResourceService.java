package se.yrgo.grocery.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import se.yrgo.grocery.domain.Grocery;
import se.yrgo.grocery.service.GroceryManagementImplementation;
import se.yrgo.grocery.service.GroceryManagementServiceLocal;



public class GroceryResourceService {

	private GroceryManagementServiceLocal service = new GroceryManagementImplementation();

	@GET
	@Path("/getallgroceries")
	@Produces("application/json")
	public List<Grocery> allErrors(){
		return service.findAll();
	}
	
	@DELETE
	@Path("/deletegrocery/{id}")
	public void deleteStaff(@PathParam("id") int id) {
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
	public void updateGrocery(Grocery err) {
		service.updateGrocery(err);
	}
	
	@POST
	@Path("/addgrocery")
	@Produces("application/JSON")
	@Consumes("application/JSON")
	public void addGrocery(Grocery err) {
		service.addGrocery(err);
	}

}
