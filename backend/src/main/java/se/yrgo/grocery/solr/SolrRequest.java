package se.yrgo.grocery.solr;

public class SolrRequest{

	private String search;

	private int rows;
	
	public SolrRequest() {}
	
	public SolrRequest(String search, int rows) {
		this.search = search;
		this.rows = rows;
		
	}
		
	public void setSearch(String search) {
		this.search = search;
	}
	
	public String getSearch() {
		return search;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public int getRows() {
		return rows;
	}

	@Override
	public String toString() {
		return "SolrRequest." 
				+ "\nSearch: " + search 
				+ "\nRows: " + rows;
	}
}
