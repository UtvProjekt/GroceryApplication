package se.yrgo.grocery.service;

import java.util.List;

import se.yrgo.grocery.domain.Grocery;

public interface GroceryManagementService {
	public List<Grocery> findAll();
	public void addGrocery(Grocery gro); 
	public void deleteError(int id);
	public void updateError(Grocery gro);
	public Grocery findGroceryById(long id);
}
