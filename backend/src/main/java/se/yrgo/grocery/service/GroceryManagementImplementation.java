package se.yrgo.grocery.service;

import java.util.List;

import se.yrgo.grocery.dataaccess.GroceryDataAccess;
import se.yrgo.grocery.dataaccess.DataAccessProductionVersion;
import se.yrgo.grocery.domain.Grocery;
import se.yrgo.grocery.solr.SolrRequest;

/**
 * Calls dataaccess methods
 * 
 *
 */
public class GroceryManagementImplementation implements GroceryManagementService{

	private GroceryDataAccess ida = new DataAccessProductionVersion();
	
	/**
	 * finds all groceries
	 * @return list of groceries
	 */
	@Override
	public List<Grocery> findAll() {
		return ida.findAll();
	}

	/**
	 * adds a grocery
	 */
	@Override
	public void addGrocery(Grocery gro) {
		ida.addGrocery(gro);
	}

	/**
	 * deletes a grocery
	 */
	@Override
	public void deleteGrocery(int id) {
		ida.deleteGrocery(id);
	}

	/**
	 * updates a grocery
	 */
	@Override
	public void updateGrocery(Grocery gro) {
		ida.updateGrocery(gro);
	}

	/**
	 * finds a grocery by id
	 */
	@Override
	public Grocery findGroceryById(long id) {
		return ida.findGroceryById(id);
	}

	/**
	 * Search for Groceries
	 * @return json object of groceries
	 */
	@Override
	public String searchForGroceries(SolrRequest solrRequest){
		
		int rows = solrRequest.getRows();
		if( rows > 0 && rows < 100)
			return ida.searchForGroceries(solrRequest.getSearch(), rows);
		else
			return ida.searchForGroceries(solrRequest.getSearch(), 100);
	}

	/**
	 * Search for Groceries with filter
	 * @return list of groceries
	 */
	@Override
	public List<Grocery> searchWithFilter(String filter){
		return ida.searchWithFilter(filter);
	}
}
