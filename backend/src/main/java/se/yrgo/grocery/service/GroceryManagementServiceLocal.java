package se.yrgo.grocery.service;

import java.util.List;

import javax.ejb.Local;

import se.yrgo.grocery.domain.Grocery;

@Local
public interface GroceryManagementServiceLocal {
	public List<Grocery> findAll();
	public void addGrocery(Grocery gro); 
	public void deleteGrocery(int id);
	public void updateGrocery(Grocery gro);
	public Grocery findGroceryById(long id);
}
