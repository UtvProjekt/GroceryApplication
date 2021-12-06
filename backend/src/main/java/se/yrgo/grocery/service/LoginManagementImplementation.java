package se.yrgo.grocery.service;

import java.util.List;

import se.yrgo.grocery.dataaccess.DataAccessProductionVersion;
import se.yrgo.grocery.dataaccess.LoginDataAccess;
import se.yrgo.grocery.domain.Login;

public class LoginManagementImplementation implements LoginManagementService{

	private LoginDataAccess ida = new DataAccessProductionVersion();

	@Override
	public List<Login> findAllUsers() {
		return ida.findAllUsers();
	}

	@Override
	public void addUser(Login credentials) {
		ida.addUser(credentials);
	}

	@Override
	public Login findUserByEmail(String email) {
		return ida.findUserByEmail(email);
	}

	@Override
	public String getPasswordByEmail(String email) {
		return ida.getPasswordByEmail(email);
	}

	
}
