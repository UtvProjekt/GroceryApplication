package se.yrgo.grocery.service;

import java.util.List;

import se.yrgo.grocery.domain.Login;

/**
 * Interface for Login Service Class
 *
 *
 */
public interface LoginManagementService {
	public List<Login> findAllUsers();
	public void addUser(Login credentials);
	public Login findUserByEmail(String email);
	public String getPasswordByEmail(String email);
	public boolean checkIfAdmin(String email);
}
