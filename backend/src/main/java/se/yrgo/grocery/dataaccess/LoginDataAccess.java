package se.yrgo.grocery.dataaccess;

import java.util.List;


import se.yrgo.grocery.domain.Login;
/**
 * 
 * @author Anton
 *
 *	An interface for the login methods
 */
public interface LoginDataAccess {
	public void addUser(Login credentials);
	public Login findUserByEmail(String email);
	public List<Login> findAllUsers();
	public String getPasswordByEmail(String email);
	public boolean checkIfAdmin(String email);
}
