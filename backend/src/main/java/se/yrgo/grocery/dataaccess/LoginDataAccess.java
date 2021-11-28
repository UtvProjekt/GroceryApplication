package se.yrgo.grocery.dataaccess;

import java.util.List;


import se.yrgo.grocery.domain.Login;

public interface LoginDataAccess {
	public void addUser(Login credentials);
	public Login findUserByEmail(String email);
	public List<Login> findAllUsers();
	public boolean controlEmail(String input);
}
