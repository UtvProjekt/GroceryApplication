package se.yrgo.grocery.service;

import java.util.List;

import se.yrgo.grocery.domain.Grocery;
import se.yrgo.grocery.solr.SolrRequest;

/**
 * Interface for Grocery Service class
 */
public interface GroceryManagementService {
	public String searchForGroceries(SolrRequest solrRequest);
	public List<Grocery> findAll();
	public void addGrocery(Grocery gro); 
	public void deleteGrocery(int id);
	public void updateGrocery(Grocery gro);
	public Grocery findGroceryById(long id);
	public List<Grocery> searchWithFilter(String filter);
}
