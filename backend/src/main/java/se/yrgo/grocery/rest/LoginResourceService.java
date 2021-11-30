package se.yrgo.grocery.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import se.yrgo.grocery.domain.Login;
import se.yrgo.grocery.service.LoginManagementImplementation;
import se.yrgo.grocery.service.LoginManagementService;



@Path("/signin")
public class LoginResourceService {

	private LoginManagementService service = new LoginManagementImplementation();

	@GET
	@Path("/getallusers")
	@Produces("application/json")
	public List<Login> allUsers(){
		return service.findAllUsers();
	}

	
	@GET
	@Path("{email}")
	@Produces("application/JSON")
	public Login getGroceryByEmail(@PathParam("email")String email) {
		return service.findUserByEmail(email);
	}
	
	@POST
	@Path("/adduser")
	@Produces("application/JSON")
	@Consumes("application/JSON")
	public void addUser(Login credentials) {
		service.addUser(credentials);
	}

}