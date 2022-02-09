package se.yrgo.grocery.service;

import java.util.List;

import se.yrgo.grocery.dataaccess.DataAccessProductionVersion;
import se.yrgo.grocery.dataaccess.LoginDataAccess;
import se.yrgo.grocery.domain.Login;

/**
 * Calls dataaccess methods
 * 
 *
 */
public class LoginManagementImplementation implements LoginManagementService{

	private LoginDataAccess ida = new DataAccessProductionVersion();

	/**
	 * Gets all Logins
	 * @return List of Login
	 */
	@Override
	public List<Login> findAllUsers() {
		return ida.findAllUsers();
	}
	/**
	 * Adds a Login
	 */
	@Override
	public void addUser(Login credentials) {
		ida.addUser(credentials);
	}
	/**
	 * Finds a Login by Email
	 * @return a Login
	 */
	@Override
	public Login findUserByEmail(String email) {
		return ida.findUserByEmail(email);
	}
	/**
	 * Gets a password by email
	 * @return Password
	 */
	@Override
	public String getPasswordByEmail(String email) {
		return ida.getPasswordByEmail(email);
	}

	/**
	 * Checks if Email belongs to admin account
	 * @return if account is admin or not
	 */
	@Override
	public boolean checkIfAdmin(String email) {
		return ida.checkIfAdmin(email);
	}
	
}
