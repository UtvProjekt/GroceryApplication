package se.yrgo.grocery.service;

import java.util.List;

import se.yrgo.grocery.dataaccess.DataAccess;
import se.yrgo.grocery.dataaccess.DataAccessProductionVersion;
import se.yrgo.grocery.domain.Grocery;
import se.yrgo.grocery.solr.SolrRequest;

public class GroceryManagementImplementation implements GroceryManagementService, GroceryManagementServiceLocal{

	private DataAccess ida = new DataAccessProductionVersion();
	
	@Override
	public List<Grocery> searchWithFilter(String filter){
		return ida.searchWithFilter(filter);
	}
	
	@Override
	public List<Grocery> findAll() {
		return ida.findAll();
	}

	@Override
	public void addGrocery(Grocery gro) {
		ida.addGrocery(gro);
	}

	@Override
	public void deleteGrocery(int id) {
		ida.deleteGrocery(id);
	}

	@Override
	public void updateGrocery(Grocery gro) {
		ida.updateGrocery(gro);
	}

	@Override
	public Grocery findGroceryById(long id) {
		return ida.findGroceryById(id);
	}

	@Override
	public String searchForGroceries(SolrRequest solrRequest){
		
		int rows = solrRequest.getRows();
		if( rows > 0 && rows < 100)
			return ida.searchForGroceries(solrRequest.getSearch(), rows);
		else
			return ida.searchForGroceries(solrRequest.getSearch(), 100);
	}

}
