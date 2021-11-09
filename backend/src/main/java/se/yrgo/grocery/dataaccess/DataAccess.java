package se.yrgo.grocery.dataaccess;

import java.util.List;

import se.yrgo.grocery.domain.Grocery;

public interface DataAccess {
	public List<Grocery> findAll();
	public void addGrocery(Grocery gro); 
	public void deleteGrocery(int id);
	public void updateGrocery(Grocery gro);
	public Grocery findGroceryById(long id);
}
