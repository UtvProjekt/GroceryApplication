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

/**
 * Rest class for LoginDataAccess methods
 * 
 *
 */

@Path("/signin")
public class LoginResourceService {
	
	private static final LoginResourceService INSTANCE = new LoginResourceService();

	private LoginManagementService service = new LoginManagementImplementation();

	private LoginResourceService() {}
	
	/**
	 * makes class a singleton
	 * @return singleton
	 */
	public static LoginResourceService getInstance() {
		return INSTANCE;
	}
	
	/**
	 * Gets all users
	 * @return list of all users
	 */
	@GET
	@Path("/getallusers")
	@Produces("application/json")
	public List<Login> allUsers(){
		return service.findAllUsers();
	}
	
	/**
	 * Gets password by email
	 * @param email email to get password from
	 * @return a password
	 */
	@GET
	@Path("/checkpassword/{email}")
	@Produces("application/JSON")
	public String getPasswordByEmail(@PathParam("email")String email){
		return service.getPasswordByEmail(email);
	}
	
	/**
	 * Gets a grocery by email
	 * @param email Email of Login to get
	 * @return a Login
	 */
	@GET
	@Path("{email}")
	@Produces("application/JSON")
	public Login getLoginByEmail(@PathParam("email")String email) {
		return service.findUserByEmail(email);
	}
	
	/**
	 * Adds a Login
	 * @param credentials the Login to add
	 */
	@POST
	@Path("/adduser")
	@Produces("application/JSON")
	@Consumes("application/JSON")
	public void addUser(Login credentials) {
		service.addUser(credentials);
	}
	
	/**
	 * Checks if Login is an admin
	 * @param email Email of Login to check
	 * @return if admin is true or false
	 */
	@GET
	@Path("/checkifadmin/{email}")
	@Produces("application/JSON")
	public boolean checkIfAdmin(@PathParam("email")String email){
		return service.checkIfAdmin(email);
	}

}